import React from "react"

// Components
import Seo from "../components/seo.js"
import ContactSection from "../components/contactSection.js"


const ContactPage = () => {

  return (
    <>
      <Seo title="contact" />
      <div className="section-container">
        <ContactSection />
      </div>
    </>
  )
}

export default ContactPage
