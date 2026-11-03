import { useState, useEffect } from "react";
import SkillsItem from "./SkillsItem";
import apiRequest from "../api/apiRequest";

export default function Skills({ onSkillClick, filters }) {
    const includeList = [
        "Programming Languages",
        "Frameworks & Libraries",
        "Front-End"
    ];
    const [skillsList, setSkillsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        apiRequest({ skills: true }) // Fetch skills using the API function
            .then((data) => {
                setSkillsList(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching skills:", error.message);
                setError(true);
            });
    }, []);

    return (
        <div className="bento-card skills-card">
            <h3 className="card-heading">Skills</h3>
            {loading ? (
                <div className="loading">
                    {error ? 'Error loading, try again' : 'Loading skills'}
                    {!error && (<><div>.</div><div>.</div><div>.</div></>)}
                </div>
            ) : (
                <ul className="skills-list">
                    {skillsList
                        .filter(skill => includeList.includes(skill.title))
                        .map((skillItem, index) => (
                            <SkillsItem
                                key={index}
                                skillItem={skillItem}
                                onSkillClick={onSkillClick}
                                filters={filters}
                            />
                        ))}
                </ul>
            )}
        </div>
    );
}
