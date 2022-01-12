/** @jsx jsx */
import * as React from "react";
import { jsx, Link as TLink } from "theme-ui";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import 'font-awesome/css/font-awesome.min.css';
import {replaceLinkName, stringIsFaIcon} from "./utils/mapping";


const HeaderExternalLinks = () => {
  const { externalLinks } = useMinimalBlogConfig()

  return (
    <React.Fragment>
      {externalLinks && externalLinks.length > 0 && (
        <div sx={{ "a:not(:first-of-type)": { ml: 3 }, fontSize: [3, 3, 3] }}>
          {externalLinks.map((link) => {
            let l = replaceLinkName(link.name);
            return (
              <TLink key={link.url} href={link.url}>
                <i className={stringIsFaIcon(l) ? l : ""}></i>
              </TLink>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
}

export default HeaderExternalLinks;
