import { toTheme } from "@theme-ui/typography"
import noriega from "typography-theme-noriega"
import merge from "deepmerge"



export default merge(toTheme(noriega), {
    useLocalStorage: false, // this disables persisting color scheme for user
    colors: {
      text: "#333333",
      background: "#F5F0F4",
      primary: "#8B32EB",
      primaryDark: "#59377A",
      // secondary: "#e86d84",
      secondary: "#E57780",
      primaryLight: "#D9CAE8",
    //   accent: "#ff7891",
      modes: {
        dark: {
          text: "#FFFFFF",
          background: "#3D2C3B",
          primary: "#8B32EB",
          secondary: "#FF7891",
        }
      }
    },
    fonts: {
      body: "Noto Sans KR",
      heading: "inherit",
      monospace: "Menlo, monospace",
    },
    fontWeights: {
      body: 400,
      heading: 700,
      bold: 700,
    },
    shadows: {
        textShadow: "none",
        cardLight: "0 1px 4px rgba(0, 0, 0, .15)",
        cardDark: "0 2px 5px rgba(0, 0, 0, .6)",
    },
    lineHeights: {
      body: 1.5,
      heading: 1.25,
      buttons: 1,
    },
    fontSizes: [10, 12, 14, 16, 20, 24, 32, 48, 64, 72],
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
    default: {
      boxShadow: "cardLight",
    },
    dark: {
      boxShadow: "cardDark",
    },
},
});