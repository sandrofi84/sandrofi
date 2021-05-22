import React, { useContext } from 'react'
import { Link } from 'gatsby'

import DispatchContext from '../context/dispatchContext'
import makeDelay from '../utilities/make-delay'

import ffIcon from '../images/fastforward.svg'

const SkillsSection = () => {
    const setAppState = useContext(DispatchContext)

    return (
        <section className="section">
            <div className="section__content">
                
                <h1 className="section__text-title color--red animation--slide-in" style={makeDelay(0)}>my skills.</h1>
                
                <p className="section__text-small color--white animation--slide-in" style={makeDelay(1)}>languages and frameworks I love and I am proficient in:</p>
                <p className="section__text-medium color--light-orange animation--slide-in" style={makeDelay(2)}>Javascript, React, Gatsby, CSS, HTML, Sass</p>
            
                <p className="section__text-small color--white animation--slide-in" style={makeDelay(3)}>technologies I have used in my projects and I am more or less familiar with:</p>
                <p className="section__text-medium color--light-orange animation--slide-in" style={makeDelay(4)}>GraphQL, NodeJS, Express.js, MongoDB, THREE.js (react-three-fiber), Snipcart, Websockets, AWS AppSync, AWS SES, Lambda Functions, Contentful</p>

                <Link to="/projects/" onClick={() => setAppState("/projects/")} className="btn btn--red btn--v-margin animation--slide-in" style={makeDelay(5)}>see my projects <span className="animation--shake" style={{display: "inline-block"}}><img src={ffIcon} alt="" className="icon-ff"/></span></Link>

            </div>
        </section>
    )
}

export default SkillsSection
