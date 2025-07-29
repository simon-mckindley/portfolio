
export default function ProjectCard({ project }) {
    return (
        <div className={`project-card ${project.type || ''}`}>
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            <p className="project-tech">
                <strong>Tech:</strong>
                {project.technologies.map((tech, index) => (
                    <span className="skill-tab" key={index}>{tech}</span>
                ))}
            </p>
            <div className="project-links">
                <div>
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            View Project
                        </a>
                    )}
                </div>
                {project.code && (
                    <a href={project.code} target="_blank" rel="noopener noreferrer">
                        Code
                    </a>
                )}
            </div>

        </div>
    );
}