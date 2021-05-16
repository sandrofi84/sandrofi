import React from 'react'
import { graphql, Link } from 'gatsby'

// Components
import Seo from "../components/seo.js"
import ProjectPool from '../components/projectPool.js'

const Projects = ({ data }) => {

    const projects = data.allMdx.edges;


    return (
      <>
      <Seo title="projects" />
      <div className="section-container">
        <section className="section">
            <div className="section__content section__content--large bg--black-tr border-radius border-shadow">
                <h1 className="section__text-title color--red">my projects.</h1>
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
