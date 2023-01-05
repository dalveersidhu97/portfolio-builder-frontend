import { gql, OperationVariables, QueryHookOptions, useQuery } from "@apollo/client";
import { PageInterface } from "../../types/page.types";

const EXP_PAGE_QUERY = gql`
	query AboutPageQuery($userId: ID!) {
		experiencePage: page(userId: $userId, pageName: "experience"){
            name
            summary
            title
            userId
            ... on Experience {
              projects {
                ...projectFields
              }
              works {
                ...workFields
              }
            }
          }
	}
	fragment workFields on Work {
        address
        company
        duration
        duties
        icon
        id
        role
        type
      }
      fragment projectFields on Project {
        deployed
        desc
        github
        id
        images
        label
        skills
      }
`;

type Project = {
    "deployed": string,
    "desc": string,
    "github": string,
    "id": string,
    "images": string[],
    "label": string,
    "skills": string[],
}
type Work = {
    "address": string,
    "company": string,
    "duration": string,
    "duties": string[],
    "icon": string,
    "id": string,
    "role": string,
    "type": string,
}

export type ExperiencePageData = {
    experiencePage?: {
        id: string,
        summary?: string,
        title?: string,
        userId: string,
        projects: Project[],
        works: Work[]
    } & PageInterface;
}

export type PageVariables = { userId: string };

export const useExperiencePageQuery = (variables: PageVariables, options: QueryHookOptions<ExperiencePageData, PageVariables> = {}) => {
    const query = useQuery(EXP_PAGE_QUERY, {
        variables,
        ...options
    });
    return query;
}