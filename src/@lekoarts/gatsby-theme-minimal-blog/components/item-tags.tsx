import React from "react";
import { Link as TLink } from "theme-ui";
import { Link } from "gatsby";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";

type TagsProps = {
  tags: {
    name: string
    slug: string
  }[]
}

const tagStyle = {
  backgroundColor: "tagBackground",
  // border: "2px solid",
  borderColor: "tagBackground",
  borderRadius: "15px",
  color: "tagText",
  paddingLeft: "0.5rem",
  paddingRight: "0.5rem",
  textDecoration: "none",
  marginLeft: "0.2rem",
  ":hover": { 
    textDecoration: "none", 
    // border: "1px solid",
    borderColor: "tagBackground",
    backgroundColor: "transparent",
    // color: "tagText",
    color: "tagBackground",
  },
  fontSize: 1,
  // fontWeight: "lighter",
}

const ItemTags = ({ tags }: TagsProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig();

  return (
    <React.Fragment>
      {tags.map((tag, i) => (
        <React.Fragment key={tag.slug}>
          {!!i && `  `}
          <TLink as={Link} to={replaceSlashes(`/${basePath}/${tagsPath}/${tag.slug}`)} sx={tagStyle}>
            {tag.name}
          </TLink>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

export default ItemTags;
