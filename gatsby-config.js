let URL;

if (process.env.NODE_ENV === 'production') {

  URL = 'https://sandrofi.com';

  } else {

  URL = 'http://localhost:8000';

  }


module.exports = {
  siteMetadata: {
    title: "sandrofi",
    description: `Web Development Portfolio`,
    author: `Sandro Fillinich`,
    siteUrl: URL,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: "src/images/sandrofi-logo.svg",
        icons: [
          {
            src: `/images/sandrofi-logo.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `./src/projects/`,
      },
      __key: "projects",
    },
  ],
};
