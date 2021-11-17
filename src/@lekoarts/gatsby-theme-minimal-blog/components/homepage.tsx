/** @jsx jsx */
import { jsx, Flex, Heading} from "theme-ui";
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
import FlashyCard from "../../../components/flashy-card";


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
    // <Layout>
    //   <SEO title="Blog" />
    //   <SignalAnimation />
    // </Layout>
    <Layout>
      <h1 sx={visuallyHidden}>{siteTitle}</h1>
      {/* <SignalAnimation /> */}
      <Flex sx={{ alignItems: `center`, justifyContent: `center`}}>
        <FlashyCard text="words and other things" />
      </Flex>
      <section sx={{ my: [3, 4, 5], p: { fontSize: [1, 2, 3], mt: 2 } }}>
        <Hero />
      </section>
      <Title text="Latest Writing">
        <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>View All</Link>
      </Title>
      <Listing posts={posts} showTags={true} />
      {/* <List sx={{ variant: `section_bottom` }}>
        <Bottom />
      </List> */}
    </Layout>
  );
}

export default Homepage;
