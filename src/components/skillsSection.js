import React from 'react'

import makeDelay from '../utilities/make-delay'

const SkillsSection = () => {
    return (
        <section className="section">
            <div className="section__content">
                
                <h1 className="section__text-title color--red animation--slide-in" style={makeDelay(0)}>my skills.</h1>
                
                <div className="section__text-group">
                    <p className="section__text-small color--white animation--slide-in" style={makeDelay(1)}>languages and frameworks I love and I am proficient in:</p>
                    <h2 className="color--orange animation--slide-in" style={makeDelay(2)}>Javascript, React, Gatsby, CSS, HTML, Sass</h2>
                </div>
                
                <div className="section__text-group section__text-group--no-bottom">
                    <p className="section__text-small color--white animation--slide-in" style={makeDelay(3)}>technologies I have used in my projects and I am more or less familiar with:</p>
                    <h2 className="color--orange animation--slide-in" style={makeDelay(4)}>GraphQL, NodeJS, Express.js, MongoDB, THREE.js (react-three-fiber), Snipcart, Websockets, AWS AppSync, AWS SES, Lambda Functions, Contentful</h2>
                </div>

            </div>
        </section>
    )
}

export default SkillsSection
