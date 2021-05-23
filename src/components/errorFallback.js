import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ErrorFallback = ({error, resetErrorBoundary}) => {
    const data = useStaticQuery(graphql`
        query {
            file(name: {eq: "sandro-fallback"}) {
                childImageSharp {
                  gatsbyImageData(width: 1920, breakpoints: 10, placeholder: BLURRED, quality: 75, layout: CONSTRAINED)
                }
            }
        }
    `)

    const image = getImage(data.file)

    return (
      <div className="fallback-container">
        {/* <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button> */}
        <GatsbyImage className="fallback__picture" image={image} imgStyle={{}} alt="me" />
      </div>
    )
}

export default ErrorFallback