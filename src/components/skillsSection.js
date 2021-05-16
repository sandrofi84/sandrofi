import React from 'react'

const SkillsSection = () => {
    return (
        <section className="section">
            <div className="section__content bg--black-tr border-radius border-shadow">
                
                <h1 className="section__text-title color--red">my skills.</h1>
                
                <div className="section__text-group">
                    <p className="section__text-small color--white">languages and frameworks I love and I am proficient in:</p>
                    <h2 className="color--orange">Javascript, React, Gatsby, CSS, HTML, Sass</h2>
                </div>
                
                <div className="section__text-group section__text-group--no-bottom">
                    <p className="section__text-small color--white">technologies I have used in my projects and I am more or less familiar with:</p>
                    <h2 className="color--orange">GraphQL, NodeJS, Express.js, MongoDB, THREE.js (react-three-fiber), Snipcart, Websockets, AWS AppSync, AWS SES, Lambda Functions, Contentful</h2>
                </div>

            </div>
        </section>
    )
}

export default SkillsSection
