/** @jsx jsx */
import { jsx, Heading, Link as TLink } from "theme-ui";
import { Link } from "gatsby";
import { Flex } from "@theme-ui/components";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import Listing from "@lekoarts/gatsby-theme-minimal-blog/src/components/listing";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo";

import SignalAnimation from "../../../components/signal-animation";


type PostsProps = {
  posts: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead?: number
    tags?: {
      name: string
      slug: string
    }[]
  }[]
  [key: string]: any
}

const Blog = ({ posts }: PostsProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig();

  return (
    <Layout>
      <SEO title="Blog" />
      <SignalAnimation />
      {/* <Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
        <Heading as="h1" variant="styles.h1" sx={{ marginY: 2 }}>
          All Posts
        </Heading>
        <TLink
          as={Link}
          sx={{ variant: `links.secondary`, marginY: 2 }}
          to={replaceSlashes(`/${basePath}/${tagsPath}`)}
        >
          All Tags
        </TLink>
      </Flex>
      <Listing posts={posts} sx={{ mt: [4, 5], ml: [0, 0, 4]}} /> */}
    </Layout>
  );
}

export default Blog;
