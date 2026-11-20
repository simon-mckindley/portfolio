
export type Project = {
    _id: string;
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    code?: string;
    image?: string;
    type?: string;
    isFeatured?: boolean;
    hide?: boolean;
};

export type SkillsGroup = {
    _id: string;
    title: string;
    skills: string[];
};