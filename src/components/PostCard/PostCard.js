/** @jsx jsx */
import { jsx } from "theme-ui";
import { Fragment } from "react";
import { PageProps, Link, graphql } from "gatsby";
import { Button, Flex, Text, Box, Card } from "rebass";

// import Bio from "../components/bio";
// import Layout from "../components/layout";
// import SEO from "../components/seo";
import { rhythm } from "../../utils/typography";

// import Placeholder from "../components/placeholder";


const ReadMoreButton = ({ variant = "primary", ...props }) => {
  return (
    <Button 
      {...props} 
      sx={{
        appearance: "none",
        display: "inline-block",
        textAlign: "center",
        fontSize: "14px",
        border: "2px solid",
        borderRadius: 0,
        // margin: "5px",
        variant: `buttons.${variant}`,
      }}
    >
      { props.text }
    </Button>
  )
};


const postCardStyle = {
  p: rhythm(1/2),
  borderRadius: 3,
  // boxShadow: '0 0 8px rgba(0, 0, 0, .25)',
  // border: "solid 2px",
  // borderColor: "primary",
  marginBottom: rhythm(2),
  width: "100%",
  maxWidth: rhythm(24),
  alignSelf: "center", // should put this in css in layout as a selector of child elements
  variant: "cards.default"
};

const PostCard = ({...props}) => {
  return (
    <Card sx={postCardStyle}>
      <Flex>
      <Box width={3/4} px={2}>
      <article key={props.slug}>
        <header>
          <h2
            style={{
              marginTop: rhythm(1 / 4),
              marginBottom: rhythm(1 / 2),
              fontWeight: "bold",
            }}
          >
            <Link style={{ boxShadow: "none", backgroundImage: "none" }} to={props.slug}>
              {props.title}
            </Link>
          </h2>
          <small>{props.date}</small>
        </header>
        <section>
          <p
            style={{
              marginBottom: rhythm(1 / 2),
              fontSize: "14px",
              fontWeight: 300,
            }}
          >
            { props.description || props.excerpt }
          </p>
        </section>
      </article>
      </Box>
      <Box width={1/4} px={2} style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end"}}>
          <Box sx={{borderRadius: "20px", backgroundColor: "secondary", color: "background", fontSize: "0", fontWeight: "300"}} p={1}>Statistics</Box>
          <ReadMoreButton text="Read More" />
      </Box>
      </Flex>
    </Card>
  );
};

export default PostCard;
