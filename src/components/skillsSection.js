import React, { useContext } from 'react'
import { Link } from 'gatsby'

import StateContext from '../context/stateContext'
import DispatchContext from '../context/dispatchContext'

import ffIcon from '../images/fastforward.svg'


const SkillsSection = () => {
    const {styleIncomplete, picIsComplete, baseDelay, delayAnimation} = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)

    return (
        <section className="section">
            <div className="section__content">
                
                <h1 className="section__text-title color--red animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 0) : styleIncomplete}>my skills.</h1>
                
                <p className="section__text-small color--white animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 1) : styleIncomplete}>languages and frameworks I love and I am proficient in:</p>
                <p className="section__text-medium color--light-orange animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 2) : styleIncomplete}>Javascript, React, Gatsby, CSS, HTML, Sass</p>
            
                <p className="section__text-small color--white animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 3) : styleIncomplete}>technologies I have used in my projects and I am more or less familiar with:</p>
                <p className="section__text-medium color--light-orange animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 4) : styleIncomplete}>GraphQL, NodeJS, Express.js, MongoDB, THREE.js (react-three-fiber), Snipcart, Websockets, AWS AppSync, AWS SES, Lambda Functions, Contentful</p>

                <Link to="/projects/" onClick={() => appDispatch({type: "setLocation", location: "/projects/"})} className="btn btn--red btn--v-margin animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 5) : styleIncomplete}>see my projects <span className="animation--shake" style={{display: "inline-block"}}><img src={ffIcon} alt="" className="icon-ff"/></span></Link>

            </div>
        </section>
    )
}

export default SkillsSection
