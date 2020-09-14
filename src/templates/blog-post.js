/** @jsx jsx */
import { jsx } from "theme-ui";

import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import { rhythm, scale } from "../utils/typography"

// for katex
require("katex/dist/katex.min.css")

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            sx={{
              marginTop: "1rem",
              marginBottom: 0,
              color: "text",
            }}
          >
            {post.frontmatter.title}
          </h1>
          <h3
            sx={{
              marginTop: "1rem",
              marginBottom: 0,
              color: "text",
            }}
          >
            {post.frontmatter.subtitle}
          </h3>
          <p
            sx={{
              // ...scale(-1 / 5),
              display: `block`,
              marginBottom: "1rem",
              // color: "text",
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        {/* <section sx={{ color: "text" }} dangerouslySetInnerHTML={{ __html: post.html }} /> */}
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          sx={{
            marginBottom: "1rem",
            color: "text",
          }}
        />
        {/* <footer>
          <Bio />
        </footer> */}
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
