import { useState, useEffect } from "react";
import SkillsItem from "./SkillsItem";
import Loading from './Loading.jsx';
import apiRequest from "../api/apiRequest";

const includeList = [
    "Programming Languages",
    "Frameworks & Libraries",
    "Front-End"
];

export default function Skills({ onSkillClick, filters, projectSkills }) {
    const [skillsList, setSkillsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!projectSkills || projectSkills.length === 0) return;

        apiRequest({ skills: true })
            .then((data) => {
                setSkillsList(data.filter(skill => includeList.includes(skill.title)));
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching skills:", error.message);
                setError(true);
            });
    }, [projectSkills]);

    return (
        <div className="bento-card skills-card">
            <h3 className="card-heading">Skills</h3>
            {loading ? (
                <Loading
                    loadingText='Loading skills'
                    errorText='Skills failed to load'
                    error={error}
                />
            ) : (
                <ul className="skills-list">
                    {skillsList.map((skillItem, i) => (
                        <SkillsItem
                            key={i}
                            skillItem={skillItem}
                            onSkillClick={onSkillClick}
                            filters={filters}
                            projectSkills={projectSkills}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
