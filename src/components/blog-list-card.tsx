/** @jsx jsx */
import React from "react";
import { jsx, Card, Flex, Link as TLink } from "theme-ui";
import { Box } from "@theme-ui/components";
import { Link } from "gatsby";
import ItemTags from "@lekoarts/gatsby-theme-minimal-blog/src/components/item-tags";
import "font-awesome/css/font-awesome.min.css";

type BlogListCardProps = {
  post: {
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
  }
  showTags?: boolean
}

const BlogListCard = ({ post, showTags = true }: BlogListCardProps) => (
  <Card mb={4} mx={1} p={3} sx={{ minHeight: [null, "200px", "250px"], border: `3px solid`, borderRadius: "0.8rem", borderColor: "heading" }}>
    <Flex sx={{ flexDirection: `column`, justifyContent: `space-between`, height: "100%",}}>
      <Box>
        <TLink as={Link} to={post.slug} sx={{ fontSize: [2, 3, 3], color: `heading` }}>
          {post.title}
        </TLink>
        <p sx={{ color: `secondary`, mt: 1, fontSize: [1, 1, 2] }}>
          <time style={{ marginRight: "1rem" }}>{post.date}</time>
        </p>
      </Box>
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between` }}>
        <TLink key={post.slug} href={post.slug} sx={{ fontSize: [1, 2, 2], transform: `scale(1.7)` }}>
          <i className="fa fa-angle-double-right"></i>
        </TLink>
        <Box sx={{ justifyContent: `right` }}>
          {post.tags && showTags && (
            <React.Fragment>
              <ItemTags tags={post.tags} />
            </React.Fragment>
          )}
        </Box>
      </Flex>
    </Flex>
  </Card>
);

export default BlogListCard;
