import React, { useContext } from 'react'
import { Link } from 'gatsby'

import DispatchContext from '../context/dispatchContext'
import StateContext from '../context/stateContext'

import ffIcon from '../images/fastforward.svg'
import Qm from './qm'



const HomeSection = () => {
    const {styleIncomplete, picIsComplete, baseDelay, delayAnimation} = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)

    return (
        <section className="section">
            <div className="section__content">
                <h1 className="section__text-title color--red bg--black-tr animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 0) : styleIncomplete}><Qm opening high />Hi, I'm Sandro.</h1>
                <h2 className="section__text-subtitle color--white bg--black-tr animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 1) : styleIncomplete}>
                    I like to make websites.<Qm closing />
                </h2>
                <Link to="/projects/" onClick={() => appDispatch({type: "setLocation", location: "/projects/"})} className="btn btn--red animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 2) : styleIncomplete}>see my projects <span className="animation--shake" style={{display: "inline-block"}}><img src={ffIcon} alt="" className="icon-ff"/></span></Link>
            </div>
        </section>
    )
}

export default HomeSection
