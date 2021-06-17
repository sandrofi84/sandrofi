import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage, withArtDirection } from "gatsby-plugin-image"

import DispatchContext from '../context/dispatchContext'

const ErrorFallback = ({error, resetErrorBoundary}) => {
    const appDispatch = useContext(DispatchContext)
    console.log(error)

    const data = useStaticQuery(graphql`
        query {
            largeImage: file(name: {eq: "sandro-fallback-desk"}) {
                childImageSharp {
                  gatsbyImageData(width: 1920, breakpoints: 10, placeholder: BLURRED, quality: 75, layout: CONSTRAINED)
                }
            }
            smallImage: file(name: {eq: "sandro-fallback-mob"}) {
                childImageSharp {
                  gatsbyImageData(width: 840, placeholder: BLURRED, quality: 75, layout: CONSTRAINED)
                }
            }
        }
    `)

    const images = withArtDirection(getImage(data.largeImage), [
        {
          media: "(max-width: 840px)",
          image: getImage(data.smallImage),
        },
      ])

    useEffect(() => {
        appDispatch({type:"setCanvasCreated"})
        appDispatch({type: "setBaseDelay", baseDelay: 0})
        appDispatch({type: "showErrorMsg"})
    }, [appDispatch])

    return (
        <div className="fallback-bg-container">
          <GatsbyImage className="fallback-bg__picture" image={images} alt="me" />
        </div>
    )
}

export default ErrorFallback