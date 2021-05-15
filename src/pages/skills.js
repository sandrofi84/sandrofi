import React from "react"

// Components
import Seo from "../components/seo.js"
import SkillsSection from "../components/skillsSection.js"


const SkillsPage = () => {

  return (
    <>
      <Seo title="skills" />
      <div className="section-container">
        <SkillsSection />
      </div>
    </>
  )
}

export default SkillsPage
