import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

// Context
import StateContext from "../context/stateContext"

const RemoteControl = () => {
  const { canvasIsCreated } = useContext(StateContext)

  const data = useStaticQuery(graphql`
    query {
      file(name: {eq: "remote-control"}) {
        id
        childImageSharp {
          gatsbyImageData(width: 200)
        }
      }
    }
  `)

  const image = getImage(data.file)

  return <GatsbyImage image={image} loading="eager" className={`remote-control${canvasIsCreated ? " remote-control--slide-up" : ""}`} />
}

export default RemoteControl
