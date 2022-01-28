/** @jsx jsx */
import { jsx, Link, Flex } from "theme-ui";
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata";

const Footer = () => {
  const { author } = useSiteMetadata();

  return (
    <footer
      sx={{
        boxSizing: `border-box`,
        display: `flex`,
        justifyContent: `space-between`,
        mt: [4, 5, 6],
        mb: 2,
        color: `secondary`,
        a: {
          variant: `links.secondary`,
        },
        flexDirection: [`column`, `column`, `row`],
        // variant: `dividers.top`,
        fontSize: [0, 1, 1],
      }}
    >
      <Flex sx={{ alignItems: "center" }}>
        &copy;{new Date().getFullYear()} by {author}
        {/* <Link style={{ marginLeft: `10px` }} rel="license" target="_blank" href="http://creativecommons.org/licenses/by/4.0/">
            <img alt="Creative Commons License" src="https://i.creativecommons.org/l/by/4.0/80x15.png" />
        </Link> */}
      </Flex>
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
