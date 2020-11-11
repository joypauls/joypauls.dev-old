/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { Fragment } from "react";
import { PageProps, Link, graphql } from "gatsby";
import { Button, Flex, Text, Box, Card } from "rebass";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";

import Placeholder from "../components/placeholder";
import PostCard from "../components/PostCard/PostCard"

// post data from graphql
type Data = {
  site: {
    siteMetadata: {
      title: string
      description: string
      isUp: boolean
    }
  }
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          description: string
          tags: string
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
};

// const postCardStyle = {
//   p: rhythm(1/2),
//   borderRadius: 3,
//   // boxShadow: '0 0 8px rgba(0, 0, 0, .25)',
//   // border: "solid 2px",
//   // borderColor: "primary",
//   marginBottom: rhythm(2),
//   width: "100%",
//   maxWidth: rhythm(24),
//   alignSelf: "center", // should put this in css in layout as a selector of child elements
//   variant: "cards.default"
// };

// const PostCard = ({...props}) => {
//   return (
//     <Card sx={postCardStyle}>
//       <article key={props.slug}>
//         <header>
//           <h2
//             style={{
//               marginTop: rhythm(1 / 4),
//               marginBottom: rhythm(1 / 2),
//               fontWeight: "bold",
//             }}
//           >
//             <Link style={{ boxShadow: "none", backgroundImage: "none" }} to={props.slug}>
//               {props.title}
//             </Link>
//           </h2>
//           <small>{props.date}</small>
//         </header>
//         <section>
//           <p
//             style={{
//               marginBottom: rhythm(1 / 2),
//               fontSize: "14px",
//               fontWeight: 300,
//             }}
//           >
//             { props.description || props.excerpt }
//           </p>
//         </section>
//       </article>
//     </Card>
//   );
// };

// const BlogContent = () =>

// const SiteDownContent = () => {
//   return (
//     <Fragment>

//       <Placeholder />

//     </Fragment>
//   );
// };

const BlogIndex = ({ data, location }: PageProps<Data>) => {

  const siteTitle = data.site.siteMetadata.title;
  const siteDescription = data.site.siteMetadata.description;
  const posts = data.allMarkdownRemark.edges;
  const siteIsUp = data.site.siteMetadata.isUp;

  let content;

  if (siteIsUp) {
    content = (
      <Layout location={location} title={siteTitle} description={siteDescription} siteIsUp={siteIsUp}>
        <SEO title="All posts" />
        {/* <Bio /> */}
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <PostCard
              title={node.frontmatter.title}
              slug={node.fields.slug}
              description={node.frontmatter.description}
              excerpt={node.excerpt}
              date={node.frontmatter.date}
              tags={node.frontmatter.tags}
            />
          );
        })}
      </Layout>
    );
  } else {
    content = (
      <Layout location={location} title={siteTitle} description={siteDescription} siteIsUp={siteIsUp}>
        <Flex sx={{justifyContent: "center"}}>
          <Box sx={{fontSize: "16px"}} p={2} marginTop={4}>
            Sorry... napping <span role="img" aria-label="snooze">&#128564;</span>
          </Box>
        </Flex>
        <Flex sx={{justifyContent: "center"}}>
          <Box sx={{fontSize: "14px"}} px={2}>
             Migrating this site over to <a href="https://www.gatsbyjs.com/">Gatsby</a>... slowly
          </Box>
        </Flex>
      </Layout>
    );
  }

  return ( content );
};

export default BlogIndex;

// query to get posts
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        isUp
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`;
