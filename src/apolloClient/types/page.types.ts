export interface PageInterface {
    "id": string,
    "name": string,
    "summary": string,
    "title": string,
    "userId": string,
}

export type Response = { success: boolean };

export type SkillsPageData = {
	skillsPage?: {
		groups?: {
			id: string,
			name: string,
			skills: {
				id: string,
				label: string,
				score: string,
				userId: string,
			}[]
		}[]
	} 
}

export type SkillsGroupData = {
	result?: Response & {
		group?: {
			id: string,
			name: string,
			skills: {
				id: string,
				label: string,
				score: string,
				userId: string,
			}[]
		}
	} 
}

export type SkillData = {
    result?: Response & {
		skill?: {
			id: string,
			label: string,
            score: number,
            userId: string,
			groups: {
				id: string,
				name: string,
			}[]
		}
	} 
}

export type WorkData = {
    result?: Response & {
        work?: {
            address:string,
            company:string,
            duration:string,
            duties:string[],
            icon:string,
            id:string,
            role:string,
            type:string,
        }
    }
}

export type ProjectData = {
    result?: Response & {
        project?: {
            deployed:string,
            desc:string,
            github:string,
            id:string,
            images:string[],
            label:string,
            skills:string[],
        }
    }
}

export type EducationData = {
    result?: Response & {
        education?: {
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
    }
}