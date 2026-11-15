import { useState, useEffect } from "react";
import SkillsItem from "./SkillsItem";
import Loading from './Loading.jsx';
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
        apiRequest({ skills: true })
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
                <Loading
                    loadingText='Loading skills'
                    errorText='Skills failed to load'
                    error={error}
                />
            ) : (
                <ul className="skills-list">
                    {skillsList
                        .filter(skill => includeList.includes(skill.title))
                        .map((skillItem, i) => (
                            <SkillsItem
                                key={i}
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
