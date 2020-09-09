import { toTheme } from "@theme-ui/typography"
import noriega from "typography-theme-noriega"
import merge from "deepmerge"



export default merge(toTheme(noriega), {
    useLocalStorage: false, // this disables persisting color scheme for user
    colors: {
      text: "#333",
      background: "#f5f0f4",
      primary: "#8b32eb",
      primaryDark: "#59377A",
      // secondary: "#e86d84",
      secondary: "#e57780",
      primaryLight: "#d9cae8",
    //   accent: "#ff7891",
      modes: {
        dark: {
          text: '#fff',
          background: '#241a23',
          primary: "#8b32eb",
          secondary: "#ff7891",
        }
      }
    },
    // fonts: {
    //   body: "Inter, sans-serif",
    //   heading: "inherit",
    //   monospace: "Menlo, monospace",
    // },
    // fontWeights: {
    //   body: 400,
    //   heading: 700,
    //   bold: 700,
    // },
    shadows: {
        textShadow: "none",
    },
    lineHeights: {
      body: 1.5,
      heading: 1.25,
      buttons: 1,
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    buttons: {
        primary: {
            color: "primary",
            bg: "transparent",
            borderColor: "primary",
            "&:hover": {
                color: "white",
                bg: "primary",
            },
            lineHeight: "buttons",
        },
        secondary: {
            color: "text",
            bg: "secondary",
            "&:hover": {
                color: "secondary",
                bg: "text",
            },
            lineHeight: "buttons",
        },
  },
  cards: {
    primary: {
        color: "primary",
        bg: "transparent",
        borderColor: "primary",
        "&:hover": {
            color: "white",
            bg: "primary",
        },
        lineHeight: "buttons",
    },
    secondary: {
        color: "text",
        bg: "secondary",
        "&:hover": {
            color: "secondary",
            bg: "text",
        },
        lineHeight: "buttons",
    },
},
});