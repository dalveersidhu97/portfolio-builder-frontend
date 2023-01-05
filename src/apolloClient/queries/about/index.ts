import { gql, OperationVariables, QueryHookOptions, useQuery } from "@apollo/client";
import { Page } from "../../../types/page.types";

const ABOUT_PAGE_QUERY = gql`
	query AboutPageQuery($userId: ID!) {
		aboutPage: page(userId: $userId, pageName: "about") {
		...aboutFields
		}
	}
	fragment aboutFields on AboutPage {
		id
		name
		summary
		title
		userId
		__typename
		sections {
			id
			name
			articles {
				id
				sectionId
				icon
				label
				content
			}
		}
	}
`;

export type AboutPageData = {
	aboutPage?: Page & {
		sections: {
			id: string,
			name: string,
			articles: {
				content: string,
				id: string,
				label: string,
				sectionId: string,
				icon?: string,
			}[]
		}[]
	} 
}
// About Page
export type PageQueryVariables = { userId: string };

export const useAboutPageQuery = (variables: PageQueryVariables, options: QueryHookOptions<AboutPageData, PageQueryVariables> = {}) => {
	const query = useQuery(ABOUT_PAGE_QUERY, {
		variables,
		...options
	});
	return query;
}
