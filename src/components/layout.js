import React, { useEffect, useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import {useImmerReducer} from "use-immer"

// Styles
import "../styles/layout.scss"

// Components
import Header from "./header"
import Footer from "./footer"
import BackgroundCanvas from "./backgroundCanvas"
import ErrorMessage from "./errorMessage"
import RemoteControl from './remoteControl'

// Context
import StateContext from "../context/stateContext"
import DispatchContext from "../context/dispatchContext"
import LoadingScreen from "./loadingScreen"



const Layout = ({children, location}) => {
    // If the relative path starts with /projects, we set the state to /projects/, otherwise we
    // set the state to whatever the relative path is, but adding a "/" at the end if it is missing

    const data = useStaticQuery(graphql`
      query {
        allSitePage {
          nodes {
            path
          }
        }
      }
    `)

    const allPaths = useMemo(() => {
      const tempPaths = ['/']
      const pathNodes = data.allSitePage.nodes.filter(node => /^\/[\w-\/]+\/$/.test(node.path))
      pathNodes.forEach(node => {
        tempPaths.push(node.path)
        tempPaths.push(node.path.slice(0, -1))
      })

      return tempPaths
    }, [data.allSitePage.nodes])

    const initialState = {
        location: "/",
        canvasIsCreated: false,
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

          case "setCanvasCreated":
            draft.canvasIsCreated = true;
            return draft;
    
          case "showErrorMsg":
            draft.errorMsgIsVisible = true;
            return draft;

          case "hideErrorMsg":
            draft.errorMsgIsVisible = false;
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
        appDispatch({type: "setLocation", location: !allPaths.includes(location.pathname) ? "/404/" : /^[/]projects/.test(location.pathname) ? "/projects/" : /[/]$/.test(location.pathname) ? location.pathname : location.pathname + "/" })
    }, [location.pathname, appDispatch, allPaths, location])

    return (
            <StateContext.Provider value={appState}>
                <DispatchContext.Provider value={appDispatch}>
                    <RemoteControl />
                    <Header />
                    <LoadingScreen />
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