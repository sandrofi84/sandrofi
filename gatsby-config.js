let URL;

if (process.env.NODE_ENV === 'production') {

  URL = 'http://localhost:8000/';

  } else {

  URL = 'http://localhost:8000/';

  }


module.exports = {
  siteMetadata: {
    title: "sandrofi",
    description: `My first portfolio!`,
    author: `Sandro Fillinich`,
    siteUrl: URL,
  },
  plugins: [
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
