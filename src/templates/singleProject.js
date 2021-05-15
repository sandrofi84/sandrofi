import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'

// Components
import Seo from "../components/seo.js"

const SingleProject = ({ data }) => {

  const { slug, id, body, frontmatter } = data.mdx;
  const { title, excerpt, featureImage, websiteLink, githubLink, techUsed, embeddedImages, embeddedVideos } = frontmatter;

  return (
    <>
    <Seo title={title} />
      <div className="section-container">
        <section className="section">
            <div className="section__content section__content--medium section__content--centered bg--black-tr border-radius">
                
                <div className="project__main-picture">
                    <GatsbyImage image={featureImage.childImageSharp.gatsbyImageData} alt={title} />
                </div>

                <h1 className="section__text-title color--red">{title}</h1>

                <div className="project__body color--white">
                  <MDXRenderer localImages={embeddedImages} localVideos={embeddedVideos}>{body}</MDXRenderer>
                </div>

                <Link to="/projects/" className="btn btn--red btn--centered">back to projects</Link>
            </div>
        </section>
      </div>
    </>
  )
}

export default SingleProject

export const pageQuery = graphql`
    query SingleProjectQuery($id: String!) {
      mdx(id: {eq: $id}) {
        slug
        body
        id
        frontmatter {
          title
          excerpt
          featureImage {
            childImageSharp {
              gatsbyImageData(width: 800)
            }
          }
          embeddedImages {
            childImageSharp {
              gatsbyImageData(width: 600)
            }
          }
          embeddedVideos {
            publicURL
          }
          websiteLink
          githubLink
          techUsed
        }
      }
    }
`
