import React, { useContext } from 'react'


// Components
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Seo from "../components/seo.js"

// Context
import DispatchContext from '../context/dispatchContext'

// Icons
import ffIcon from '../images/fastforward.svg'

const SingleProject = ({ data }) => {

  const appDispatch = useContext(DispatchContext)

  const { body, frontmatter } = data.mdx;
  const { title, featureImage, websiteLink, websiteLinkPretty, githubLink, githubLinkPretty, techUsed, embeddedImages, embeddedVideos } = frontmatter;

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
                {
                  websiteLink &&
                  <p>website: <a href={websiteLink} target="_blank" rel="noreferrer" className="color--orange">{websiteLinkPretty}</a></p>
                }
                {
                  githubLink &&
                  <p>website: <a href={githubLink} target="_blank" rel="noreferrer" className="color--orange">{githubLinkPretty}</a></p>
                }
                
                <p>technologies: <span className="color--light-orange">{techUsed}</span></p>

                <div className="project__body color--white">
                  <MDXRenderer localImages={embeddedImages} localVideos={embeddedVideos}>{body}</MDXRenderer>
                </div>

                <div className="project__btn-container">
                  <Link to="/projects/" className="btn btn--red btn--v-margin"><span className="animation--shake" style={{display: "inline-block"}}><img src={ffIcon} alt="" className="icon-rw"/></span> back to projects</Link>
                  <Link to="/contact/" onClick={() => appDispatch({type: "setLocation", location: "/contact/"})} className="btn btn--red btn--v-margin">get in touch <span className="animation--shake" style={{display: "inline-block"}}><img src={ffIcon} alt="" className="icon-ff"/></span></Link>
                </div>
                
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
        body
        frontmatter {
          title
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
          websiteLinkPretty
          githubLink
          githubLinkPretty
          techUsed
        }
      }
    }
`
