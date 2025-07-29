import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import FilterItem from "./FilterItem";


export default function ProjectList({ filters, onFilterClick }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [showProjects, setShowProjects] = useState(true); // Animation control

    useEffect(() => {
        fetch("https://profile-backend-6f74f72dedfc.herokuapp.com/projects") // Fetch projects from the server
            .then((response) => response.json())
            .then((data) => {
                setProjects(data);
                setFilteredProjects(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching projects:", error.message));
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

            // Sort projects:
            // 1. Featured projects first
            // 2. Then sort alphabetically by title within each group
            const sortedProjects = [...newFilteredProjects].sort((a, b) => {
                const aFeatured = a.type === 'featured' ? 0 : 1;
                const bFeatured = b.type === 'featured' ? 0 : 1;

                if (aFeatured !== bFeatured) {
                    return aFeatured - bFeatured; // Featured projects come first
                }

                return a.title.localeCompare(b.title); // Alphabetical within group
            });

            setFilteredProjects(sortedProjects);
            setShowProjects(true); // Fade projects back in
        }, 300); // This should match the CSS fade-out duration
    }, [filters, projects]);

    if (loading) return (
        <section className="projects-container defined-section">
            <h3>Projects</h3>
            <div className="loading">
                Loading projects
                <div>.</div><div>.</div><div>.</div>
            </div>
        </section>
    );

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