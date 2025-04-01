import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import FilterItem from "./FilterItem";


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
                setFilteredProjects(data);
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

            // Sort projects alphabetically by "title"
            const sortedProjects = newFilteredProjects.sort((a, b) =>
                a.title.localeCompare(b.title)
            );

            setFilteredProjects(sortedProjects);
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
                        <div className="projects-count">({filteredProjects.length})</div>
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