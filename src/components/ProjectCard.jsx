import LinkIcon from '../assets/arrow-up-right-from-square-solid-full.svg';

export default function ProjectCard({ heading = "Project", isFeature = false, project, show }) {
    if (!project) {
        return (
            <div className={`bento-card project-card ${isFeature ? "feature" : ""} ${show ? "fade-in" : ""}`}>
                <h3 className="card-heading">{heading}</h3>
                <div className="loading">
                    Loading project
                    <div>.</div><div>.</div><div>.</div>
                </div>
            </div>
        );
    }

    return (
        <div className={`bento-card project-card ${project.type === 'featured' ? "highlight" : ""} ${isFeature ? "feature" : ""} ${show ? "fade-in" : ""}`}>
            <h3 className="card-heading">{heading}</h3>

            {isFeature && (
                <img className="project-image" src={project.image} alt="Project Image" width="400" />
            )}

            <h4>{project.title}</h4>

            <p>{project.description}</p>

            <div className="project-skills">
                {project.technologies.map((tech, index) => (
                    <span className="skill-tab" key={index}>{tech}</span>
                ))}
            </div>

            <div className="project-links">
                <div>
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <img src={LinkIcon} alt="View Project" width="20" />
                            <span>View Project</span>
                        </a>
                    )}
                </div>
                {project.code && (
                    <a href={project.code} target="_blank" rel="noopener noreferrer">
                        <img src={LinkIcon} alt="View Code" width="20" />
                        <span>Code</span>
                    </a>
                )}
            </div>

        </div>
    );
}