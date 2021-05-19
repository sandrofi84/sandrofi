import React from 'react'
import ProjectCard from './projectCard'

const ProjectPool = ({projects}) => {
    return (
        <div className="project-pool">
            {
                projects.map((proj, i) => <ProjectCard key={proj.node.id} slug={proj.node.slug} project={proj.node.frontmatter} delay={i} />)
            }
        </div>
    )
}

export default ProjectPool
