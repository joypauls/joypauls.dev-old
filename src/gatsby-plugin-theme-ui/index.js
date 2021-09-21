import { merge } from "theme-ui";
import { transparentize } from "@theme-ui/color";
import { tailwind } from "@theme-ui/presets";

const theme = merge(tailwind, {
  initialColorModeName: `dark`,
  useCustomProperties: true,
  colors: {
    text: tailwind.colors.black,
    primary: tailwind.colors.purple[7],
    secondary: tailwind.colors.black,
    toggleIcon: tailwind.colors.black,
    // background: `#f6f5f7`,
    background: `#ffffff`,
    backgroundLight: `#503254`,
    heading: `#5a35b8`,
    divide: tailwind.colors.gray[4],
    tagText: tailwind.colors.gray[1],
    // tagBackground: `#a9d1bb`,
    tagBackground: `#65b897`,
    graphicPrimary: `#5a35b8`,
    graphicSecondary: `#65b897`,
    primarySoft: `#ded7f7`,
    modes: {
      dark: {
        text: tailwind.colors.white,
        primary: tailwind.colors.purple[5],
        secondary: tailwind.colors.white,
        toggleIcon: tailwind.colors.white,
        background: `#221524`,
        backgroundLight: `#503254`,
        // heading: `#ffc6c4`,
        heading: `#fcbbbb`,
        divide: tailwind.colors.gray[6],
        muted: tailwind.colors.gray[6],
        tagText: tailwind.colors.gray[1],
        tagBackground: `#876ccc`, // MAIN
        graphicPrimary: `#fcbbbb`,
        graphicSecondary: `#876ccc`,
        primarySoft: `#58425c`,
      },
    },
  },
  fonts: {
    body: `Nunito,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
    // body: `"IBM Plex Sans", -apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 56, 64, 72],
  styles: {
    root: {
      color: `text`,
      backgroundColor: `background`,
      margin: 0,
      padding: 0,
      boxSizing: `border-box`,
      textRendering: `optimizeLegibility`,
      WebkitFontSmoothing: `antialiased`,
      MozOsxFontSmoothing: `grayscale`,
      minHeight: `100vh`,
    },
    p: {
      fontSize: [1, 2, 3],
      letterSpacing: `-0.003em`,
      lineHeight: `body`,
      "--baseline-multiplier": 0.179,
      "--x-height-multiplier": 0.35,
      wordBreak: `break-word`,
    },
    ul: {
      li: {
        fontSize: [1, 2, 3],
        // letterSpacing: `-0.003em`,
        lineHeight: `body`,
        // "--baseline-multiplier": 0.179,
        // "--x-height-multiplier": 0.35,
      },
    },
    ol: {
      li: {
        fontSize: [1, 2, 3],
        // letterSpacing: `-0.003em`,
        lineHeight: `body`,
        // "--baseline-multiplier": 0.179,
        // "--x-height-multiplier": 0.35,
      },
    },
    h1: {
      variant: `text.heading`,
      fontSize: [5, 6, 6, 7],
      mt: 2,
      mb: 3,
    },
    h2: {
      variant: `text.heading`,
      fontSize: [4, 5, 5, 6],
      mt: 3,
    },
    h3: {
      variant: `text.heading`,
      fontSize: [3, 4, 4, 5],
      mt: 3,
    },
    h4: {
      variant: `text.heading`,
      fontSize: [2, 3, 3, 4],
      mt: 3,
    },
    h5: {
      variant: `text.heading`,
      fontSize: [1, 2, 2, 3],
      mt: 3,
    },
    h5Alt: {
      variant: `text.headingAlt`,
      fontSize: [1, 2, 2, 3],
      mt: 3,
    },
    h6: {
      variant: `text.heading`,
      fontSize: 1,
      mb: 2,
    },
    blockquote: {
      borderLeftColor: `heading`,
      borderLeftStyle: `solid`,
      borderLeftWidth: `0.5rem`,
      backgroundColor: `primarySoft`,
      mx: [0, 4, 5],
      my: [1, 3, 4],
      pl: [2, 2, 4],
      pr: [2, 2, 4],
      pt: 1,
      pb: 1,
      fontWeight: `light`,
      color: `text`,
    },
    footnotes: {
      fontSize: 3,
    },
    table: {
      width: `100%`,
      my: 4,
      borderCollapse: `separate`,
      borderSpacing: 0,
      [[`th`, `td`]]: {
        textAlign: `left`,
        py: `4px`,
        pr: `4px`,
        pl: 0,
        borderColor: `muted`,
        borderBottomStyle: `solid`,
      },
    },
    th: {
      verticalAlign: `bottom`,
      borderBottomWidth: `2px`,
      color: `heading`,
    },
    td: {
      verticalAlign: `top`,
      borderBottomWidth: `1px`,
    },
    hr: {
      borderTopStyle: `solid`,
      borderTopWidth: `3px`,
      borderTopColor: `tagBackground`,
      mx: 0,
    },
  },
  layout: {
    container: {
      padding: [2, 3],
      maxWidth: `1024px`,
      minHeight: `100vh`,
      display: `flex`,
      flexDirection: `column`,
    },
  },
  text: {
    heading: {
      fontFamily: `Playfair Display`,
      fontWeight: `bold`,
      lineHeight: `heading`,
      color: `heading`,
    },
    // wtf is this used for
    headingAlt: {
      fontFamily: `heading`,
      fontWeight: `light`,
      lineHeight: `heading`,
      color: `heading`,
    },
  },
  copyButton: {
    backgroundColor: transparentize(`primary`, 0.8),
    border: `none`,
    color: `gray.2`,
    cursor: `pointer`,
    fontSize: [`14px`, `14px`, `16px`],
    fontFamily: `body`,
    letterSpacing: `0.025rem`,
    transition: `default`,
    "&[disabled]": {
      cursor: `not-allowed`,
    },
    ":not([disabled]):hover": {
      bg: `primary`,
      color: `white`,
    },
    position: `absolute`,
    top: 0,
    right: 0,
    zIndex: 1,
    borderRadius: `0 0 0 0.25rem`,
    padding: `0.25rem 0.6rem`,
  },
  dividers: {
    bottom: {
      borderBottomStyle: `solid`,
      borderBottomWidth: `3px`,
      borderBottomColor: `tagBackground`,
      pb: 3,
    },
    top: {
      borderTopStyle: `solid`,
      borderTopWidth: `3px`,
      borderTopColor: `tagBackground`,
      pt: 3,
    },
  },
  links: {
    secondary: {
      color: `secondary`,
      textDecoration: `none`,
      ":hover": {
        color: `heading`,
        textDecoration: `underline`,
      },
      ":focus": {
        color: `heading`,
      },
    },
    listItem: {
      fontSize: [1, 2, 3],
      color: `text`,
    },
  },
  buttons: {
    primary: {
      color: 'background',
      bg: 'heading',
    },
  },
});

export default theme;
