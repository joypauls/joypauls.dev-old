/** @jsx jsx */
import React from "react";
import { jsx, Card, Flex, Text, Link as TLink } from "theme-ui";
import { Box } from "@theme-ui/components";
import { Link } from "gatsby";
// import ItemTags from "@lekoarts/gatsby-theme-minimal-blog/src/components/item-tags";
import "font-awesome/css/font-awesome.min.css";

import Hero from "@lekoarts/gatsby-theme-minimal-blog/src/texts/hero";

// type FlashyCardProps = {
//   post: {
//     slug: string
//     title: string
//     date: string
//     excerpt: string
//     description: string
//     timeToRead?: number
//     tags?: {
//       name: string
//       slug: string
//     }[]
//   }
//   showTags?: boolean
// }

const FlashyCard = (text) => (
  <Card mb={4} mx={1} p={3} 
    sx={{ 
      width: ["90%", "70%", "50%"],
      maxWidth: "600px",
      minHeight: [null, null, "200px"], 
      border: `2px solid`, 
      borderRadius: "0", 
      borderColor: "text",
      // boxShadow: '12px 12px rgba(0, 0, 0), 12px 12px 0 3px black',
      boxShadow: theme => `8px 8px ${theme.colors.tagBackground}, 8px 8px 0 2px ${theme.colors.text}`,
      // boxShadow: theme => `8px 8px ${theme.colors.tagBackground}`,
    }}
  >
    <Flex sx={{ flexDirection: `column`, justifyContent: `space-between`, height: "100%",}}>
      <Box>
        <section sx={{ my: [1, 1, 2], ml: [1, 1, 2], p: { fontSize: [1, 2, 3], mt: [1, 1, 2] } }}>
          <Hero />
        </section>
      </Box>
    </Flex>
  </Card>
);

export default FlashyCard;

