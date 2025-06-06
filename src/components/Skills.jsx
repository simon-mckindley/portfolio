import React, { useState, useEffect } from "react";


const SkillsItem = ({ skillItem, onSkillClick }) => {
    return (
        <li>
            <span className="label">{skillItem.title}</span>
            {skillItem.skills.map((skill, index) => (
                <button
                    type="button"
                    className="skill-tab"
                    title="Add filter"
                    onClick={() => onSkillClick(skill)}
                    id={skill}
                    key={index}>
                    {skill}
                </button>
            ))}
        </li>
    );
};

export default function Skills({ onSkillClick }) {
    const [skillsList, setSkills] = useState([]); // State to store skillsList
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        fetch("https://profile-backend-6f74f72dedfc.herokuapp.com/skills") // Fetch skills from the server
            .then((response) => response.json()) // Convert response to JSON
            .then((data) => {
                setSkills(data); // Store data in state
                setLoading(false); // Stop loading
            })
            .catch((error) => console.error("Error fetching skills:", error.message));
    }, []);

    if (loading) return (
        <section className="skills defined-section">
            <h3>Skills</h3>
            <div className="loading">
                Loading skills
                <div>.</div><div>.</div><div>.</div>
            </div>
        </section>
    );

    return (
        <section className="skills defined-section">
            <div className="skills-header">
                <h3>Skills</h3>
                <p>Click on a skill to filter projects</p>
            </div>
            <ul>
                {skillsList.map((skillItem, index) => (
                    <SkillsItem
                        key={index}
                        skillItem={skillItem}
                        onSkillClick={onSkillClick}
                    />
                ))}
            </ul>
        </section>
    );
}
