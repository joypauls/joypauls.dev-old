/** @jsx jsx */
import { jsx } from "theme-ui";
import { Fragment } from "react";
import { PageProps, Link, graphql } from "gatsby";
import { Button, Flex, Text, Box, Card } from "rebass";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";

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

const SiteDownContent = () => {
  return (
    <Fragment>

      <Placeholder />

    </Fragment>
  );
};

const BlogIndex = ({ data, location }: PageProps<Data>) => {

  const siteTitle = data.site.siteMetadata.title;
  const siteDescription = data.site.siteMetadata.description;
  const posts = data.allMarkdownRemark.edges;
  const siteIsUp = data.site.siteMetadata.isUp;

  let content;

  if (siteIsUp) {
    content = (
      <Layout location={location} title={siteTitle} description={siteDescription}>
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
            />
          );
        })}
      </Layout>
    );
  } else {
    content = (
      <SiteDownContent />
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
          }
        }
      }
    }
  }
`;
