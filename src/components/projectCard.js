import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import githubIcon from '../images/icon-github.png'
import globeIcon from '../images/icon-website-globe.png'

import makeDelay from '../utilities/make-delay'

const SingleProjectCard = ({project, slug, delay}) => {
    const {title, excerpt, featureImage, techUsed, websiteLink, githubLink} = project
    return (
        <div className="project-card bg--black-tr border-radius animation--slide-in" style={makeDelay(delay + 1)}>
            <div className="project-card__overlay border-radius">
                <div className="project-card__overlay-content">
                    <Link to={`/projects/${slug}`} className="btn btn--transparent btn--centered">
                        see project
                    </Link>

                    { websiteLink && 
                        <div className="project-card__overlay__link-group">
                            <img src={globeIcon} alt="web" className="project-card__overlay__link-icon project-card__overlay__link-icon--inverted"/> 
                            <a href={websiteLink} target="_blank" className="project-card__overlay__link color--white">Visit website</a>
                        </div>
                    }
                    
                    { githubLink && 
                        <div className="project-card__overlay__link-group">
                            <img src={githubIcon} alt="github" className="project-card__overlay__link-icon"/> 
                            <a href={githubLink} target="_blank" className="project-card__overlay__link color--white">See source code</a>
                        </div>
                    }
                </div>
            </div>
            <div className="project-card__picture">
                <GatsbyImage image={featureImage.childImageSharp.gatsbyImageData} alt={title} />
            </div>
            <div className="project-card__text color--white">
                <h2 className="color--red">{title}</h2>
                <p>{excerpt}</p>
                <p>Main technologies used: <span className="color--orange">{techUsed}</span></p>
            </div>
        </div>
    )
}

export default SingleProjectCard
