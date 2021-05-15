import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.com/docs/use-static-query/
 */

const ImageHero = () => {
  const data = useStaticQuery(graphql`
    query {
      imageSharp(id: {eq: "6dae1cb3-80c5-5812-8935-f4b1333cf3ab"}) {
        fluid {
          srcWebp
        }
      }
    }
  `)

  const image = data.imageSharp.fluid.srcWebp

  return <img src={image} style={{zIndex: "0", position: "absolute", top: "0", left: "0", height: "100vh", width: "100vw"}} alt="me" />
}

export default ImageHero
