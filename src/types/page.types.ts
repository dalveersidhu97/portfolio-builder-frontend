export type Page = {
	id: string,
	summary?: string,
	title?: string,
	userId: string,
}

export type Work = {
    address:string,
    company:string,
    duration:string,
    duties:string[],
    icon:string,
    id:string,
    role:string,
    type:string,
}
export type Project = {
    deployed:string,
    desc:string,
    github:string,
    id:string,
    images:string[],
    label:string,
    skills:string[],
}

export type Education = {
    "id": string,
    "level": string,
    "institute": string,
    "course": string,
    "campus": string,
    "gpa": string,
    "startDate": string,
    "endDate": string,
    duration: string,
}

export type SkillType = {
    id: string;
    label: string;
    score: number;
    groups: {
        id: string;
        name: string;
    }[];
}

export type AboutArticleType = { 
    icon?: string, 
    label: string, 
    content: string, 
    id: string, 
    sectionId: string
}