import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from "gatsby"

import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import DispatchContext from '../context/dispatchContext'
import StateContext from '../context/stateContext'

import Qm from './qm'

import ffIcon from '../images/fastforward.svg'

const AboutSection = () => {
    const {styleIncomplete, picIsComplete, baseDelay, delayAnimation} = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)

    const data = useStaticQuery(graphql`
        query {
            file(name: {eq: "sandrofi-about"}) {
                childImageSharp {
                  gatsbyImageData(width: 800, placeholder: BLURRED, quality: 75, layout: CONSTRAINED)
                }
            }
        }
    `)

    const image = getImage(data.file)

    return (
        <section className="section section--about">
            <div className="section__content">
                
                <h1 className="section__text-title color--red animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 0) : styleIncomplete}>about me.</h1>

                <p className="section__text-medium animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 1) : styleIncomplete}><Qm opening />Hi, I’m Sandro.</p>

                <p className="section__text-medium animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 2) : styleIncomplete}>I like to make websites.</p>

                <p className="section__text-medium animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 3) : styleIncomplete}>But you probably know that already.</p>

                <p className="section__text-medium animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 4) : styleIncomplete}>It all started during the first national lockdown. <span>My brother suggested I start learning Python</span> - he loves Data Science - so I took a course.</p>

                <p className="section__text-medium animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 5) : styleIncomplete}><span>I loved it.</span></p>

                <p className="section__text-medium animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 6) : styleIncomplete}>Many <span>Javascript</span> courses - and to-do list apps :) - later, <span>I published my first website</span>, <a href="https://www.hodostraining.com/" target="_blank" rel="noreferrer" className="section__text-link color--orange">Hodos Training</a>.</p>

                <p className="section__text-medium animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 7) : styleIncomplete}>It was such a fun experience that <span>I decided to do it again. And again.</span><Qm closing /></p>

                <div className="section__main-picture border-radius animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 8) : styleIncomplete}>
                    <GatsbyImage image={image} alt="me" />
                </div>

                <Link to="/projects/" onClick={() => appDispatch({type: "setLocation", location: "/projects/"})} className="btn btn--red btn--v-margin animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 9) : styleIncomplete}>see my projects <span className="animation--shake" style={{display: "inline-block"}}><img src={ffIcon} alt="" className="icon-ff"/></span></Link>

                <Link to="/contact/" onClick={() => appDispatch({type: "setLocation", location: "/contact/"})} className="btn btn--red btn--v-margin animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 10) : styleIncomplete}>get in touch <span className="animation--shake" style={{display: "inline-block"}}><img src={ffIcon} alt="" className="icon-ff"/></span></Link>
            </div>
        </section>
    )
}

export default AboutSection
