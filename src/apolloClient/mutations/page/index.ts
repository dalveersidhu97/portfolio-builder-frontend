import { gql, useMutation } from "@apollo/client";
import {  MutationOptions } from "../types";

// GQLs
const UPDATE_PAGE_MUTATION = gql`
mutation PageMutation($pageName: String!, $pageAttributes: PageInput!) {
    pageResult: createOrUpdatePage(pageName: $pageName, pageAttributes: $pageAttributes) {
      ...pageResponse
    }
  }

  fragment pageResponse on PageResponse {
    success,
    page {
      ...pageFields
    }
  }
  
  fragment pageFields on PageInterface {
    id
    name
    summary
    title
    userId
    __typename
  }
`;
const UPDATE_ABOUT_SECTION_MUTATION = gql`
mutation CreateOrUpdateAboutSection($aboutSection: AboutSectionInput!){
    addOrUpdateAboutSection(aboutSection: $aboutSection) {
      ...aboutSectionResponse
    }
}
fragment aboutSectionResponse on AboutSectionResponse {
    success
    section {
        id
        name
    }
}
`;
const UPDATE_ABOUT_ARTICLE_MUTATION = gql`
mutation AddOrUpdateArticle($article: AboutArticleInput!, $sectionId: ID!) {
    addOrUpdateAboutArticle(aboutArticle: $article, sectionId: $sectionId) {
      ...aboutArticleResponse
    }
  }
  fragment aboutArticleResponse on AboutArticleResponse {
    success
    article {
      id
      sectionId
      label
      icon
      content
    }
  }
  
`;

// Update Page

type UpdatePageVariables = {
	pageName: string,
    pageAttributes: { name: string, title?: string, summary?: string }
}
export type PageResult = { success: boolean, page?: { id: string, name: string, summary: string, title: string, userId: string } }
export type UpdatePageData = { pageResult?: PageResult }

export const useUpdatePage = (mutationOptions?: MutationOptions<UpdatePageData, UpdatePageVariables>) => {
	const mutation = useMutation<UpdatePageData, UpdatePageVariables>(UPDATE_PAGE_MUTATION, mutationOptions);
	return mutation;
}

// Update About Section

type UpdateAboutSectionVariables = {
    aboutSection: {
        name: string,
        id?: string
    }
}
export type AboutSectionResult = { success: boolean, section?: { id: string, name: string } }
export type UpdateAboutSectionData = { addOrUpdateAboutSection?: AboutSectionResult }

export const useAddOrUpdateAboutSection = (mutationOptions?: MutationOptions<UpdateAboutSectionData, UpdateAboutSectionVariables>) => {
	const mutation = useMutation<UpdateAboutSectionData, UpdateAboutSectionVariables>(UPDATE_ABOUT_SECTION_MUTATION, mutationOptions);
	return mutation;
}

// Udpate About Article
type UpdateAboutArticleVariables = {
    article: {
        label: string,
        id?: string
        icon?: string,
        content?: string,
        sectionId?: string,
    },
    sectionId: string,
}
export type AboutArticleResult = { success: boolean, article?: { id: string, sectionId: string, label: string, icon?: string, content: string } }
export type UpdateAboutArticleData = { addOrUpdateAboutArticle?: AboutArticleResult }

export const useAddOrUpdateAboutArticle = (mutationOptions?: MutationOptions<UpdateAboutArticleData, UpdateAboutArticleVariables>) => {
	const mutation = useMutation<UpdateAboutArticleData, UpdateAboutArticleVariables>(UPDATE_ABOUT_ARTICLE_MUTATION, mutationOptions);
	return mutation;
}
