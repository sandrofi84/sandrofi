import React, { useEffect } from "react"
import {useImmerReducer} from "use-immer"

// Styles
import "../styles/layout.scss"

// Components
import Header from "./header"
import BackgroundCanvas from "./backgroundCanvas"
import ErrorMessage from "./errorMessage"

// Context
import StateContext from "../context/stateContext"
import DispatchContext from "../context/dispatchContext"

// Utilities
import Footer from "./footer"


const Layout = ({children, location}) => {
    // If the relative path starts with /projects, we set the state to /projects/, otherwise we
    // set the state to whatever the relative path is, but adding a "/" at the end if it is missing

    const initialState = {
        location: "/",
        errorMsgIsVisible: false,
        baseDelay: 0,
        delayAnimation: function(baseDelay, addDelay) {
            return {animationDelay: `${baseDelay + addDelay * .1}s`}
        },
        picIsComplete: true,
        styleIncomplete: { display: "none"}
      }
    
      function reducer(draft, action) {
        switch (action.type) {
    
          case "setLocation":
            draft.location = action.location;
            return draft;
    
          case "toggleErrorMsgIsVisible":
            draft.errorMsgIsVisible = !draft.errorMsgIsVisible;
            return draft;
    
          case "setBaseDelay":
            draft.baseDelay = action.baseDelay
            return draft;
          
          case "setPicComplete":
            draft.picIsComplete = true
            return draft;

          case "setPicIncomplete":
            draft.picIsComplete = false
            return draft;
          
          default:
            return draft;
        }
      }
    
      const [appState, appDispatch] = useImmerReducer(reducer, initialState);

    useEffect(()=>{
        appDispatch({type: "setLocation", location: /^[/]projects/.test(location.pathname) ? "/projects/" : /[/]$/.test(location.pathname) ? location.pathname : location.pathname + "/" })
    }, [location.pathname])
    return (
            <StateContext.Provider value={appState}>
                <DispatchContext.Provider value={appDispatch}>
                    <Header />
                    <ErrorMessage />
                    <BackgroundCanvas />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </DispatchContext.Provider>
            </StateContext.Provider>
    )

}

export default Layout;