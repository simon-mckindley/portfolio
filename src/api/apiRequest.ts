const PROJECTS_API_URL = "https://profile-backend-6f74f72dedfc.herokuapp.com/projects";
const SKILLS_API_URL = "https://profile-backend-6f74f72dedfc.herokuapp.com/skills";

export default async function apiRequest({ skills = false, projects = false }) {
    const url = projects ? 
        PROJECTS_API_URL :  
        skills ? SKILLS_API_URL : null;

    if (!url) {
        throw new Error("Invalid API request: specify either skills or projects");
    }

    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch data");
    }

    return data;
}