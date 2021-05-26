import React, { useContext } from 'react'
import { graphql } from 'gatsby'

// Components
import Seo from "../components/seo.js"
import ProjectPool from '../components/projectPool.js'

import StateContext from '../context/stateContext'

const Projects = ({ data }) => {
    const {baseDelay, delayAnimation} = useContext(StateContext)
    const projects = data.allMdx.edges;


    return (
      <>
      <Seo title="projects" />
      <div className="section-container">
        <section className="section">
            <div className="section__content section__content--large">
                <h1 className="section__text-title section__text--centered color--red animation--slide-in" style={delayAnimation(baseDelay, 0)}>my projects.</h1>
                <ProjectPool projects={projects} />
            </div>
        </section>
      </div>
    </>
    )
}

export default Projects

export const pageQuery = graphql`
    query AllProjectsQuery {
      allMdx(sort: {fields: frontmatter___order, order: ASC}) {
        edges {
          node {
            slug
            id
            frontmatter {
              title
              excerpt
              featureImage {
                childImageSharp {
                  gatsbyImageData(width: 300)
                }
              }
              websiteLink
              githubLink
              techUsed
            }
          }
        }
      }
    }
`
