import React, { useState, useEffect } from "react";
import FilterItem from "./FilterItem";


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


export default function ProjectList({ filters, onFilterClick }) {
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

    if (loading) return (
        <section className="projects-container">
            <h3>Projects</h3>
            <div className="loading">Loading projects...</div>
        </section>
    );

    return (
        <section className="projects-container">
            <div className="projects-header">
                <h3>Projects</h3>
                {filters.length > 0 && (
                    <div className="filter-cont">
                        Filters
                        {filters.map((filter, index) => (
                            <FilterItem key={index} itemName={filter} onFilterClick={onFilterClick} />
                        ))}
                    </div>
                )}
            </div>
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </section>
    );

}
