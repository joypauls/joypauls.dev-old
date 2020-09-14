/** @jsx jsx */
import { jsx } from "theme-ui";
import { Fragment } from "react";
import { PageProps, Link, graphql } from "gatsby";
import { Button, Flex, Text, Box, Card } from "rebass";

// import Bio from "../components/bio";
// import Layout from "../components/layout";
// import SEO from "../components/seo";
// import { rhythm } from "../../utils/typography";

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
  p: "0.5rem",
  borderRadius: 3,
  // boxShadow: '0 0 8px rgba(0, 0, 0, .25)',
  // border: "solid 2px",
  // borderColor: "primary",
  marginBottom: "2rem",
  width: "100%",
  maxWidth: "60vw",
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
              marginTop: "0.25rem",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            {props.title}
          </h2>
          <small>{props.date}</small>
        </header>
        <section>
          <p
            style={{
              marginBottom: "0.5rem",
              fontSize: "14px",
              fontWeight: 300,
            }}
          >
            { props.description || props.excerpt }
          </p>
        </section>
      </article>
      </Box>
      <Box width={1/4} px={1} m={1} style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end"}}>
          <Box sx={{borderRadius: "20px", backgroundColor: "secondary", color: "background", fontSize: "14px", fontWeight: "300"}} p={1}>{props.tags[0]}</Box>
          <ReadMoreButton text="Read More" as="a" href={props.slug} />
      </Box>
      </Flex>
    </Card>
  );
};

export default PostCard;
