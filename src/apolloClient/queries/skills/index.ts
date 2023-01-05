import { gql, OperationVariables, QueryHookOptions, useQuery } from "@apollo/client";
import { PageInterface } from "../../types/page.types";

const USER_SKILLS_QUERY = gql`
query AboutPageQuery($userId: ID!) {
	skillsPage: page(userId: $userId, pageName: "skills") {
	...skillsFields
	}
}
fragment skillsFields on Skills {
	id
	name
	summary
	title
	userId
	__typename
	groups {
		id
		name
		skills {
			id
			label
			score
			userId
			groups {
				id
				name
			}
		}
	}
}
`;

export interface SkillsData {
	skillsPage?: {
		groups: {
			id: string,
			name: string,
			skills: {
				id: string,
				label: string,
				score: number,
				groups: {
					id: string, 
					name: string
				}[]
			}[]
		}[]
	} & PageInterface;
}

export type SkillsVariables = { userId: string };

export const useUserSkillsQuery = (variables: SkillsVariables, options: QueryHookOptions<SkillsData, OperationVariables> = {}) => {
	const query = useQuery(USER_SKILLS_QUERY, {
		variables,
		...options
	});
	return query;
}