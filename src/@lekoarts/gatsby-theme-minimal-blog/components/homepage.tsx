/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import Title from "@lekoarts/gatsby-theme-minimal-blog/src/components/title";
import Listing from "@lekoarts/gatsby-theme-minimal-blog/src/components/listing";
import List from "@lekoarts/gatsby-theme-minimal-blog/src/components/list";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";
import { visuallyHidden } from "@lekoarts/gatsby-theme-minimal-blog/src/styles/utils";
// @ts-ignore
import Hero from "@lekoarts/gatsby-theme-minimal-blog/src/texts/hero";
// @ts-ignore
import Bottom from "@lekoarts/gatsby-theme-minimal-blog/src/texts/bottom";

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

const Homepage = ({ posts }: PostsProps) => {
  const { basePath, blogPath } = useMinimalBlogConfig();
  const { siteTitle } = useSiteMetadata();

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
    // <Layout>
    //   <h1 sx={visuallyHidden}>{siteTitle}</h1>
    //   <section sx={{ mb: [5, 6, 7], p: { fontSize: [1, 2, 3], mt: 2 }, variant: `section_hero` }}>
    //     <Hero />
    //   </section>
    //   <Title text="Latest Posts">
    //     <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>Read all posts</Link>
    //   </Title>
    //   <Listing posts={posts} showTags={false} />
    //   <List sx={{ variant: `section_bottom` }}>
    //     <Bottom />
    //   </List>
    // </Layout>
  );
}

export default Homepage;
