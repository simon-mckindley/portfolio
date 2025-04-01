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
        setTimeout(() => {
            fetch("./data/skillsList.json") // Fetch from local JSON file
                .then((response) => response.json()) // Convert response to JSON
                .then((data) => {
                    setSkills(data); // Store data in state
                    setLoading(false); // Stop loading
                })
                .catch((error) => console.error("Error fetching skills:", error));
        }, 1200); // Simulate loading delay
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
            <h3>Skills</h3>
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
