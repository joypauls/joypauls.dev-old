require(`dotenv`).config({
  path: `.env`,
});

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

//
// const siteUp = false;

module.exports = {
  siteMetadata: {
    // Used for the title template on pages other than the index site
    siteTitle: `joypauls.dev`,
    // Default title of the page
    siteTitleAlt: `Blog`,
    // Can be used for e.g. JSONLD
    siteHeadline: `Blog`,
    // Will be used to generate absolute URLs for og:image etc.
    siteUrl: `https://joypauls.dev`,
    // Used for SEO
    siteDescription: `A blog about various topics in statistics and mathematics`,
    // Will be set on the <html /> tag
    siteLanguage: `en`,
    // Used for og:image and must be placed inside the `static` folder
    siteImage: `/banner.jpg`,
    // Twitter Handle
    author: `Joy Paulsen`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        navigation: [
          {
            title: `Writing`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
          // {
          //   title: `Support`,
          //   slug: `/support`,
          // },
          {
            title: `Contact`,
            slug: `/contact`,
          },
        ],
        externalLinks: [
          {
            name: `GitHub`,
            url: `https://github.com/joypauls`,
          },
          {
            name: `LinkedIn`,
            url: `https://www.linkedin.com/in/joy-paulsen-0bb55419b`,
          },
        ],
        mdx: false,
        formatString: `MMMM DD, YYYY`,
        // postsPath: `src/posts`,
        // pagesPath: `src/pages`,
        // basePath: `/`
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: process.env.GOOGLE_ANALYTICS_ID,
    //   },
    // },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `blog`,
        short_name: `blog`,
        description: `A blog about topics in statistics and mathematics`,
        // start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
    // disabling in parent them to override here
    // {
    //   resolve: `gatsby-plugin-mdx`,
    //   options: {
    //     remarkPlugins: [require(`remark-math`)],
    //     rehypePlugins: [require(`rehype-katex`)]
    //   }
    // },
    // {
    //   resolve: `gatsby-remark-katex`,
    //   options: {
    //     // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
    //     strict: `ignore`
    //   }
    // },
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        // defaultLayouts: {
        //   default: require.resolve("./src/components/default-layout.js"),
        // },
        remarkPlugins: [
          require('remark-math'),
          require('remark-html-katex'),
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
  ].filter(Boolean),
}
