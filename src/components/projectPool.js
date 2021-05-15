import React from 'react'
import ProjectCard from './projectCard'

const ProjectPool = ({projects}) => {
    return (
        <div className="project-pool">
            {
                projects.map(proj => <ProjectCard key={proj.node.id} slug={proj.node.slug} project={proj.node.frontmatter} />)
            }
        </div>
    )
}

export default ProjectPool
