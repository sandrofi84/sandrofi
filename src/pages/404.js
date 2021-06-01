import * as React from "react"

// Components
import Seo from "../components/seo.js"
import PageNotFoundSection from "../components/pageNotFoundSection.js"


const NotFoundPage = () => {
  return (
    
    <>
      <Seo title="page not found" />
      <div className="section-container">
        <PageNotFoundSection />
      </div>
    </>
  )
}

export default NotFoundPage
