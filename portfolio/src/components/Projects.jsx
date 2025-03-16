import React, { useState, useEffect } from "react";


const ProjectCard = ({ project }) => {
    return (
        <div className="project-card">
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            <p className="project-tech">
                <strong>Tech:</strong>
                {project.technologies.map((tech, index) => (
                    <span className="skill-tab" key={index}>{tech}</span>
                ))}
            </p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
            </a>
        </div>
    );
};

export default function ProjectList() {
    const [projects, setProjects] = useState([]); // State to store projects
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        fetch("./data/projects.json") // Fetch from local JSON file
            .then((response) => response.json()) // Convert response to JSON
            .then((data) => {
                setProjects(data); // Store data in state
                setLoading(false); // Stop loading
            })
            .catch((error) => console.error("Error fetching projects:", error));
    }, []);

    if (loading) return <p><br></br>Loading projects...</p>;

    return (
        <div className="projects-container">
            <h3>Projects</h3>
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </div>
    );
}
