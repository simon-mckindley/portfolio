
export default function ProjectCard({ project, show = true }) {
    return (
        <div className={`project-card ${show ? "fade-in" : "fade-out"}`}>
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            <div className="project-tech">
                {project.technologies.map((tech, index) => (
                    <span className="skill-tab" key={index}>{tech}</span>
                ))}
            </div>
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