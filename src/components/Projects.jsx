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
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [showProjects, setShowProjects] = useState(true); // Animation control

    useEffect(() => {
        fetch("./data/projects.json")
            .then((response) => response.json())
            .then((data) => {
                setProjects(data);
                setFilteredProjects(data); // Initially show all projects
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching projects:", error));
    }, []);

    useEffect(() => {
        // When filters change, trigger fade-out animation
        setShowProjects(false);

        // Wait for animation duration, then filter projects
        setTimeout(() => {
            const newFilteredProjects =
                filters.length === 0
                    ? projects
                    : projects.filter((project) =>
                        filters.every((filter) => project.technologies.includes(filter))
                    );

            setFilteredProjects(newFilteredProjects);
            setShowProjects(true); // Fade projects back in
        }, 300); // This should match the CSS fade-out duration
    }, [filters, projects]);

    if (loading) return <div>Loading projects...</div>;

    return (
        <section className="projects-container defined-section">
            <div className="projects-header">
                <h3>Projects</h3>
                {filters.length > 0 && (
                    <div className="filter-cont">
                        Filters:
                        {filters.map((filter, index) => (
                            <FilterItem
                                key={index}
                                itemName={filter}
                                onFilterClick={() =>
                                    onFilterClick(filter)
                                }
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className={`projects-grid ${showProjects ? "fade-in" : "fade-out"}`}>
                {filteredProjects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </section>
    );
}