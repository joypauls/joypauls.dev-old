/** @jsx jsx */
import * as React from "react";
import { jsx, Link as TLink } from "theme-ui";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import 'font-awesome/css/font-awesome.min.css';

const iconMapping = {
    "GitHub": "fa fa-github-alt",
    "LinkedIn": "fa fa-linkedin",
}


const HeaderExternalLinks = () => {
  const { externalLinks } = useMinimalBlogConfig()

  return (
    <React.Fragment>
      {externalLinks && externalLinks.length > 0 && (
        <div sx={{ "a:not(:first-of-type)": { ml: 3 }, fontSize: [3, `24px`], fontFamily: `Lato` }}>
          {externalLinks.map((link) => (
            <TLink key={link.url} href={link.url}>
              <i className={iconMapping[link.name]}></i>
            </TLink>
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

export default HeaderExternalLinks;
