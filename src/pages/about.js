import React from "react"

// Components
import Seo from "../components/seo.js"
import AboutSection from "../components/aboutSection.js"


const SkillsPage = () => {

  return (
    <>
      <Seo title="about" />
      <div className="section-container">
        <AboutSection />
      </div>
    </>
  )
}

export default SkillsPage
