import { gql, OperationVariables, QueryHookOptions, useQuery } from "@apollo/client";
import { PageInterface } from "../../types/page.types";

const EDU_PAGE_QUERY = gql`
query EducationPageQuery($userId: ID!) {
  educationPage: page(userId: $userId, pageName: "education") {
    ...educationFields
  }
}
fragment educationFields on EducationPage {
  id
  name
  summary
  title
  userId
  list {
    id
    level
    campus
    course
    duration
    endDate
    gpa
    institute
    startDate
  }
}

`;

type Education = {
  "id": string,
  "level": string,
  "campus": string,
  "course": string,
  "duration": string,
  "endDate": string,
  "gpa": string,
  "institute": string,
  "startDate": string,
}

export type EducationPageData = {
    educationPage?: {
        id: string,
        summary?: string,
        title?: string,
        userId: string,
        list: Education[],
    } & PageInterface;
}

type PageVariables = { userId: string };

export const useEducationPageQuery = (variables: PageVariables, options: QueryHookOptions<EducationPageData, PageVariables> = {}) => {
    const query = useQuery(EDU_PAGE_QUERY, {
        variables,
        ...options
    });
    return query;
}