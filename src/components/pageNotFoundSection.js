import React, { useContext } from 'react'
import { Link } from 'gatsby'

import DispatchContext from '../context/dispatchContext'
import StateContext from '../context/stateContext'

import ffIcon from '../images/fastforward.svg'
import Qm from './qm'



const PageNotFoundSection = () => {
    const {styleIncomplete, picIsComplete, baseDelay, delayAnimation} = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)

    return (
        <section className="section">
            <div className="section__content">
                <h1 className="section__text-title color--white bg--black-tr animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 0) : styleIncomplete}><Qm opening high />Uh oh...</h1>
                <h2 className="section__text-subtitle color--white bg--black-tr animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 1) : styleIncomplete}>
                    page not found<Qm closing />
                </h2>
                <Link to="/" onClick={() => appDispatch({type: "setLocation", location: "/"})} className="btn btn--red animation--slide-in" style={picIsComplete ? delayAnimation(baseDelay, 2) : styleIncomplete}>it's time to go home! <span className="animation--shake" style={{display: "inline-block"}}><img src={ffIcon} alt="" className="icon-ff"/></span></Link>
            </div>
        </section>
    )
}

export default PageNotFoundSection
