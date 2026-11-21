import { useState, useEffect } from "react";
import SkillsList from "./SkillsList";
import Loading from './Loading';
import apiRequest from "../api/apiRequest";
import { SkillsGroup } from '../types/dataTypes'

interface SkillsProps {
    onSkillClick: (skill: string) => void;
    filters: string[];
    projectSkills: string[];
}

const INCLUDE_LIST = [
    "Programming Languages",
    "Frameworks & Libraries",
    "Front-End"
];

export default function Skills({ onSkillClick, filters, projectSkills }: SkillsProps) {
    const [skillsList, setSkillsList] = useState<SkillsGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (!projectSkills || projectSkills.length === 0) return;

        apiRequest({ skills: true })
            .then((data) => {
                setSkillsList((data as SkillsGroup[]).filter(skill => INCLUDE_LIST.includes(skill.title)));
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
                    {skillsList.map((skillsGroup, i) => (
                        <SkillsList
                            key={i}
                            skillsGroup={skillsGroup}
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
