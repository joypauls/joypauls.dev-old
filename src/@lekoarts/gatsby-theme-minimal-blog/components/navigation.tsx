/** @jsx jsx */
import React from "react";
import { jsx, Link as TLink } from "theme-ui";
import { Link } from "gatsby";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";

type NavigationProps = {
  nav: {
    title: string
    slug: string
  }[]
}

const Navigation = ({ nav }: NavigationProps) => {
  const { basePath } = useMinimalBlogConfig();

  return (
    <React.Fragment>
      {nav && nav.length > 0 && (
        <nav sx={{ 
            "a:not(:last-of-type)": { mr: 3 }, 
            fontSize: [1, `18px`], 
            fontFamily: `Lato`,
            ".active": { 
                color: `heading`,
            },
        }}>
          {nav.map((item) => (
            <TLink key={item.slug} as={Link} activeClassName="active" to={replaceSlashes(`/${basePath}/${item.slug}`)} sx={{
                ":hover": {
                    color: `#FFF`,
                    // fontWeight: `bold`
                    // textDecoration: `underline`,
                    // backgroundColor: `heading`,
                },
            }}>
              {item.title}
            </TLink>
          ))}
        </nav>
      )}
    </React.Fragment>
  );
}

export default Navigation;
