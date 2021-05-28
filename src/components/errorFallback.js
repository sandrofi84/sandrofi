import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import DispatchContext from '../context/dispatchContext'

const ErrorFallback = ({error, resetErrorBoundary}) => {
    const appDispatch = useContext(DispatchContext)

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

    useEffect(() => {

        const loadingScreen = document.getElementById("loading-screen")

        if (loadingScreen) {
            loadingScreen.parentElement.removeChild(loadingScreen)
        }

        appDispatch({type: "setBaseDelay", baseDelay: 0})
        appDispatch({type: "toggleErrorMsgIsVisible"})
    }, [appDispatch])

    return (
        <div className="fallback-bg-container">
          <GatsbyImage className="fallback-bg__picture" image={image} alt="me" />
        </div>
    )
}

export default ErrorFallback