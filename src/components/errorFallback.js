import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import DispatchContext from '../context/dispatchContext'

const ErrorFallback = ({error, resetErrorBoundary}) => {
    const appDispatch = useContext(DispatchContext)
    console.log(error)

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
        appDispatch({type:"setCanvasCreated"})
        appDispatch({type: "setBaseDelay", baseDelay: 0})
        appDispatch({type: "showErrorMsg"})
    }, [appDispatch])

    return (
        <div className="fallback-bg-container">
          <GatsbyImage className="fallback-bg__picture" image={image} alt="me" />
        </div>
    )
}

export default ErrorFallback