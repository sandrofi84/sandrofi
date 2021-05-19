import React, { useContext } from 'react'
import { Link } from 'gatsby'

import DispatchContext from '../context/dispatchContext'
import makeDelay from '../utilities/make-delay'

const HomeSection = () => {
    const setAppState = useContext(DispatchContext)

    return (
        <section className="section">
            <div className="section__content">
                <h1 className="section__text-title color--red bg--black-tr animation--slide-in" style={makeDelay(0)}>Hi, I'm Sandro.</h1>
                <h2 className="section__text-subtitle color--white bg--black-tr animation--slide-in" style={makeDelay(1)}>
                    I like to make websites.
                </h2>
                <Link to="/projects/" onClick={() => setAppState("/projects/")} className="btn btn--red animation--slide-in" style={makeDelay(2)}>see my projects</Link>
            </div>
        </section>
    )
}

export default HomeSection
