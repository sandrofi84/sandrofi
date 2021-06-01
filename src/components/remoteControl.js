import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"

// Context
import StateContext from "../context/stateContext"

const RemoteControl = () => {
  const { canvasIsCreated } = useContext(StateContext)

  const data = useStaticQuery(graphql`
    query {
      file(name: {eq: "remote-control"}) {
        id
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `)


  const image = data.file.childImageSharp.gatsbyImageData.images

  return <picture>
            <source srcSet={image.sources[0].srcSet} type="image/webp" />
            <source srcSet={image.fallback.srcSet} type="image/png" />
            <img src={image.fallback.src} alt="remote-control" loading="eager" decoding="async" className={`remote-control${canvasIsCreated ? " remote-control--slide-up" : ""}`}/>
          </picture>
}

export default RemoteControl
