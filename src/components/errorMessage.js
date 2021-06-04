import React, { useContext, useRef, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'

import DispatchContext from '../context/dispatchContext'
import StateContext from '../context/stateContext'

const ErrorMessage = () => {
    const appDispatch = useContext(DispatchContext)
    const appState = useContext(StateContext)
    const ref = useRef();

    useEffect(() => {
      const closeOverlay = e => {
        if (e.key === "Escape" || e.key === "Enter") {
          appDispatch({type: "hideErrorMsg"})
        }
      }

      window.addEventListener("keyup", closeOverlay)

      return () => {
        window.removeEventListener("keyup", closeOverlay)
      }
    }, [appDispatch])

    return (
      <CSSTransition nodeRef={ref} in={appState.errorMsgIsVisible} timeout={500} classNames="error-message-transition">
        <div ref={ref} className="error-message-container bg--black-tr">
          <div className="error-message__text bg--orange-tr border-radius">
            <p>uh oh...</p>
            <p>it seems like either your browser does not support WebGL or it is disabled!</p>
            <p>please update your browser or enable WebGL if you want to see the webiste in all its glory! :)</p>
            <button 
              onClick={() => appDispatch({type: "toggleErrorMsgIsVisible"})} 
              className="btn btn--transparent btn--v-margin btn--centered">
                close
            </button>
          </div>
        </div>
      </CSSTransition>
    )
}

export default ErrorMessage