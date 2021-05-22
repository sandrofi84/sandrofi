import React, { useContext } from 'react'
import { Link } from 'gatsby'

import DispatchContext from '../context/dispatchContext'
import makeDelay from '../utilities/make-delay'

import ffIcon from '../images/fastforward.svg'
import quotMarks from '../images/quotation-marks.svg'

const AboutSection = () => {
    const setAppState = useContext(DispatchContext)

    return (
        <section className="section section--about">
            <div className="section__content">
                
                <h1 className="section__text-title color--red animation--slide-in" style={makeDelay(0)}>about me.</h1>

                <p className="section__text-medium color--white animation--slide-in" style={makeDelay(1)}><img src={quotMarks} alt="" className="icon-qmarks--opening"/> Hi, I’m Sandro.</p>

                <p className="section__text-medium color--white animation--slide-in" style={makeDelay(2)}>I like to make websites.</p>

                <p className="section__text-medium color--white animation--slide-in" style={makeDelay(3)}>But you probably know that already.</p>

                <p className="section__text-medium color--white animation--slide-in" style={makeDelay(4)}>This whole thing started during the first national lockdown. <span>My brother suggested I start learning Python</span> - he loves Data Science - so I took a course.</p>

                <p className="section__text-medium animation--slide-in" style={makeDelay(5)}><span>I loved it.</span></p>

                <p className="section__text-medium color--white animation--slide-in" style={makeDelay(6)}>But I soon realised <span>I’d better learn Javascript</span> if I wanted to be able to build my own websites.</p>

                <p className="section__text-medium color--white animation--slide-in" style={makeDelay(7)}>Many courses - and todo apps - later, I <span>published my first website</span>, for my girlfriend’s training business, <a href="https://www.hodostraining.com/" target="_blank" className="section__text-link color--orange">Hodos Training</a>.</p>

                <p className="section__text-medium color--white animation--slide-in" style={makeDelay(8)}>In preparation for that project, I discovered the JAMstack and, since I wanted to practice my React skills, <span>I decided to try Gatsby</span>.</p>

                <p className="section__text-medium color--white animation--slide-in" style={makeDelay(9)}>It was such a fun experience that I decided to use it again. And again. <img src={quotMarks} alt="" className="icon-qmarks--closing"/></p>

                <Link to="/projects/" onClick={() => setAppState("/projects/")} className="btn btn--red btn--v-margin animation--slide-in" style={makeDelay(10)}>see my projects <span className="animation--shake" style={{display: "inline-block"}}><img src={ffIcon} alt="" className="icon-ff"/></span></Link>

                <Link to="/contact/" onClick={() => setAppState("/contact/")} className="btn btn--red btn--v-margin animation--slide-in" style={makeDelay(11)}>get in touch <span className="animation--shake" style={{display: "inline-block"}}><img src={ffIcon} alt="" className="icon-ff"/></span></Link>
            </div>
        </section>
    )
}

export default AboutSection
