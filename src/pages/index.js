import React from "react"

// Components
import Seo from "../components/seo.js"
import HomeSection from "../components/homeSection.js"


const IndexPage = () => {

  return (
    <>
      <Seo title="sandrofi" home />
      <div className="section-container">
        <HomeSection />
      </div>
    </>
  )
}

export default IndexPage
