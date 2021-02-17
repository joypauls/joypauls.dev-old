/* based on https://github.com/LekoArts/gatsby-themes/blob/master/themes/gatsby-theme-minimal-blog-core/gatsby-node.js **/
const kebabCase = require(`lodash.kebabcase`);
const withDefaults = require(`./utils/default-options`);

const mdxResolverPassthrough = (fieldName) => async (source, args, context, info) => {
  const type = info.schema.getType(`JMdx`)
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  })
  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  })
  return result
}

// Create general interfaces that you could can use to leverage other data sources
// The core theme sets up MDX as a type for the general interface
exports.createSchemaCustomization = ({ actions, schema }, themeOptions) => {
  const { createTypes, createFieldExtension } = actions

  const { basePath } = withDefaults(themeOptions)

  const slugify = (source) => {
    const slug = source.slug ? source.slug : kebabCase(source.title)

    return `/${basePath}/${slug}`.replace(/\/\/+/g, `/`)
  }

  createFieldExtension({
    name: `jslugify`,
    extend() {
      return {
        resolve: slugify,
      }
    },
  })

  createFieldExtension({
    name: `jmdxpassthrough`,
    args: {
      fieldName: `String!`,
    },
    extend({ fieldName }) {
      return {
        resolve: mdxResolverPassthrough(fieldName),
      }
    },
  })

  createTypes(`
  interface JPost @nodeInterface {
    id: ID!
    slug: String! @jslugify
    title: String!
    date: Date! @dateformat
    excerpt(pruneLength: Int = 160): String!
    body: String!
    html: String
    timeToRead: Int
    tags: [PostTag]
    banner: File @fileByRelativePath
    description: String
    canonicalUrl: String
  }
  type JPostTag {
    name: String
    slug: String
  }
  interface JPage @nodeInterface {
    id: ID!
    slug: String!
    title: String!
    excerpt(pruneLength: Int = 160): String!
    body: String!
  }
  type JMdxPost implements Node & JPost {
    slug: String! @jslugify
    title: String!
    date: Date! @dateformat
    excerpt(pruneLength: Int = 140): String! @jmdxpassthrough(fieldName: "excerpt")
    body: String! @jmdxpassthrough(fieldName: "body")
    html: String! @jmdxpassthrough(fieldName: "html")
    timeToRead: Int @jmdxpassthrough(fieldName: "timeToRead")
    tags: [PostTag]
    banner: File @fileByRelativePath
    description: String
    canonicalUrl: String
  }
  type JMdxPage implements Node & JPage {
    slug: String!
    title: String!
    excerpt(pruneLength: Int = 140): String! @jmdxpassthrough(fieldName: "excerpt")
    body: String! @jmdxpassthrough(fieldName: "body")
  }
  type StandardBlogConfig implements Node {
    basePath: String
    blogPath: String
    postsPath: String
    pagesPath: String
    tagsPath: String
    externalLinks: [ExternalLink]
    navigation: [NavigationEntry]
    showLineNumbers: Boolean
    showCopyButton: Boolean
  }
  type ExternalLink {
    name: String!
    url: String!
  }
  type NavigationEntry {
    title: String!
    slug: String!
  }
  `)
}

exports.sourceNodes = ({ actions, createContentDigest }, themeOptions) => {
  const { createNode } = actions
  const {
    basePath,
    blogPath,
    postsPath,
    pagesPath,
    tagsPath,
    externalLinks,
    navigation,
    showLineNumbers,
    showCopyButton,
    siteIsUp,
  } = withDefaults(themeOptions)

  const standardBlogConfig = {
    basePath,
    blogPath,
    postsPath,
    pagesPath,
    tagsPath,
    externalLinks,
    navigation,
    showLineNumbers,
    showCopyButton,
    siteIsUp,
  }

  createNode({
    ...standardBlogConfig,
    id: `joypauls-standard-config`,
    parent: null,
    children: [],
    internal: {
      type: `StandardBlogConfig`,
      contentDigest: createContentDigest(standardBlogConfig),
      content: JSON.stringify(standardBlogConfig),
      description: `Options for joypauls.dev`,
    },
  })
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }, themeOptions) => {
  const { createNode, createParentChildLink } = actions

  const { postsPath, pagesPath } = withDefaults(themeOptions)

  // Make sure that it's an MDX node
  if (node.internal.type !== `JMdx`) {
    return
  }

  // Create a source field
  // And grab the sourceInstanceName to differentiate the different sources
  // In this case "postsPath" and "pagesPath"
  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  // Check for "posts" and create the "Post" type
  if (node.internal.type === `JMdx` && source === postsPath) {
    let modifiedTags

    if (node.frontmatter.tags) {
      modifiedTags = node.frontmatter.tags.map((tag) => ({
        name: tag,
        slug: kebabCase(tag),
      }))
    } else {
      modifiedTags = null
    }

    const fieldData = {
      slug: node.frontmatter.slug ? node.frontmatter.slug : undefined,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      tags: modifiedTags,
      banner: node.frontmatter.banner,
      description: node.frontmatter.description,
      canonicalUrl: node.frontmatter.canonicalUrl,
    }

    const mdxPostId = createNodeId(`${node.id} >>> JMdxPost`)

    createNode({
      ...fieldData,
      // Required fields
      id: mdxPostId,
      parent: node.id,
      children: [],
      internal: {
        type: `JMdxPost`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Post interface`,
      },
    })

    createParentChildLink({ parent: node, child: getNode(mdxPostId) })
  }

  // Check for "pages" and create the "Page" type
  if (node.internal.type === `JMdx` && source === pagesPath) {
    const fieldData = {
      title: node.frontmatter.title,
      slug: node.frontmatter.slug,
    }

    const mdxPageId = createNodeId(`${node.id} >>> JMdxPage`)

    createNode({
      ...fieldData,
      // Required fields
      id: mdxPageId,
      parent: node.id,
      children: [],
      internal: {
        type: `JMdxPage`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Page interface`,
      },
    })

    createParentChildLink({ parent: node, child: getNode(mdxPageId) })
  }
}

// These template are only data-fetching wrappers that import components
const homepageTemplate = require.resolve(`./src/templates/homepage-query.tsx`)
const blogTemplate = require.resolve(`./src/templates/blog-query.tsx`)
const postTemplate = require.resolve(`./src/templates/post-query.tsx`)
const pageTemplate = require.resolve(`./src/templates/page-query.tsx`)
const tagTemplate = require.resolve(`./src/templates/tag-query.tsx`)
const tagsTemplate = require.resolve(`./src/templates/tags-query.tsx`)

exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
  const { createPage } = actions

  const { basePath, blogPath, tagsPath, formatString, postsPrefix } = withDefaults(themeOptions)

  createPage({
    path: basePath,
    component: homepageTemplate,
    context: {
      formatString,
    },
  })

  createPage({
    path: `/${basePath}/${blogPath}`.replace(/\/\/+/g, `/`),
    component: blogTemplate,
    context: {
      formatString,
    },
  })

  createPage({
    path: `/${basePath}/${tagsPath}`.replace(/\/\/+/g, `/`),
    component: tagsTemplate,
  })

  const result = await graphql(`
    query {
      allPost(sort: { fields: date, order: DESC }) {
        nodes {
          slug
        }
      }
      allPage {
        nodes {
          slug
        }
      }
      tags: allPost(sort: { fields: tags___name, order: DESC }) {
        group(field: tags___name) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your posts or pages`, result.errors)
    return
  }

  const posts = result.data.allPost.nodes

  posts.forEach((post) => {
    createPage({
      path: `/${postsPrefix}${post.slug}`.replace(/\/\/+/g, `/`),
      component: postTemplate,
      context: {
        slug: post.slug,
        formatString,
      },
    })
  })

  const pages = result.data.allPage.nodes

  if (pages.length > 0) {
    pages.forEach((page) => {
      createPage({
        path: `/${basePath}/${page.slug}`.replace(/\/\/+/g, `/`),
        component: pageTemplate,
        context: {
          slug: page.slug,
        },
      })
    })
  }

  const tags = result.data.tags.group

  if (tags.length > 0) {
    tags.forEach((tag) => {
      createPage({
        path: `/${basePath}/${tagsPath}/${kebabCase(tag.fieldValue)}`.replace(/\/\/+/g, `/`),
        component: tagTemplate,
        context: {
          slug: kebabCase(tag.fieldValue),
          name: tag.fieldValue,
          formatString,
        },
      })
    })
  }
}
