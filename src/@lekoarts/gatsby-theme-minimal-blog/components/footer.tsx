/** @jsx jsx */
import { jsx, Link } from "theme-ui";
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata";

const Footer = () => {
  const { siteTitle } = useSiteMetadata();

  return (
    <footer
      sx={{
        boxSizing: `border-box`,
        display: `flex`,
        justifyContent: `space-between`,
        mt: [6],
        color: `secondary`,
        a: {
          variant: `links.secondary`,
        },
        flexDirection: [`column`, `column`, `row`],
        variant: `dividers.top`,
        fontSize: [0, 1, 1],
      }}
    >
      <div>
        &copy;{new Date().getFullYear()} by {siteTitle}
        <Link style={{ marginLeft: `10px` }} rel="license" target="_blank" href="http://creativecommons.org/licenses/by/4.0/">
            <img alt="Creative Commons License" src="https://i.creativecommons.org/l/by/4.0/80x15.png" />
        </Link>
      </div>
      {/* <div>
        Theme by
        {` `}
        <Link aria-label="Link to the site author's github profile" href="https://github.com/joypauls">
          joypauls
        </Link>
      </div> */}
    </footer>
  );
}

export default Footer;
