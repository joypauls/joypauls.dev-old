/* based on https://github.com/LekoArts/gatsby-themes/blob/master/themes/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config.tsx **/
import { graphql, useStaticQuery } from "gatsby";

type UseBlogConfigProps = {
  standardBlogConfig: {
    basePath: string
    blogPath: string
    postsPath: string
    pagesPath: string
    tagsPath: string
    externalLinks: {
      name: string
      url: string
    }[]
    navigation: {
      title: string
      slug: string
    }[]
    showLineNumbers: boolean
    showCopyButton: boolean
    siteIsUp: boolean
  }
}

const useBlogConfig = () => {
  const data = useStaticQuery<UseBlogConfigProps>(graphql`
    query {
      standardBlogConfig {
        basePath
        blogPath
        postsPath
        pagesPath
        tagsPath
        externalLinks {
          name
          url
        }
        navigation {
          title
          slug
        }
        showLineNumbers
        showCopyButton
        siteIsUp
      }
    }
  `);

  return data.standardBlogConfig;
}

export default useBlogConfig;
