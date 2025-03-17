import React, { useState, useEffect } from "react";


const SkillsItem = ({ skillItem }) => {
    return (
        <li>
            <span className="label">{skillItem.title}</span>
            {skillItem.skills.map((skill, index) => (
                <span className="skill-tab" key={index}>{skill}</span>
            ))}
        </li>
    );
};

export default function Skills() {
    const [skillsList, setSkills] = useState([]); // State to store skillsList
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        fetch("./data/skillsList.json") // Fetch from local JSON file
            .then((response) => response.json()) // Convert response to JSON
            .then((data) => {
                setSkills(data); // Store data in state
                setLoading(false); // Stop loading
            })
            .catch((error) => console.error("Error fetching skills:", error));
    }, []);

    if (loading) return <p><br></br>Loading skills...</p>;

    return (
        <section className="skills">
            <h3>Skills</h3>
            <ul>
                {skillsList.map((skillItem, index) => (
                    <SkillsItem key={index} skillItem={skillItem} />
                ))}
            </ul>
        </section>
    );
}
