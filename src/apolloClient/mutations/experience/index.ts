import { gql, useMutation } from "@apollo/client";
import { ProjectData, WorkData } from "../../types/page.types";
import { MutationOptions } from "../types";

const ADD_WORK = gql`
mutation AddWork($workAttributes: WorkInput!) {
  result: addWork(workAttributes: $workAttributes) {
    ...workResponse
  }
}
fragment workResponse on WorkResponse {
  success
  work {
    ...workFields
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
`;

const UPDATE_WORK = gql`
mutation UpdateWork($workId: ID!, $workAttributes: UpdateWorkInput!) {
  result: updateWork(workId: $workId, workAttributes: $workAttributes) {
    ...workResponse
  }
}
fragment workResponse on WorkResponse {
  success
  work {
    ...workFields
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
`;

const ADD_PROJECT = gql`
mutation AddProject($projectAttributes: ProjectInput!){
  result: addProject(projectAttributes: $projectAttributes) {
    ...projectResponse
  }
}
fragment projectResponse on ProjectResponse {
  success
  project {
    ...projectFields 
  }
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

const UPDATE_PROJECT = gql`
mutation UpdateProject($projectId: ID!, $projectAttributes: UpdateProjectInput!) {
  result: updateProject(projectId: $projectId, projectAttributes: $projectAttributes) {
    ...projectResponse
  }
}
fragment projectResponse on ProjectResponse {
  success
  project {
    ...projectFields 
  }
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

// Work
type AddWorkVariables = {
  workAttributes: {
    address: string,
    company: string,
    duration: string,
    duties: string[],
    icon: string,
    role: string,
    type: string,
  },
}
type UpdateWorkVariables = {
  workId: string,
  workAttributes: Partial<AddWorkVariables['workAttributes']>
}

export const useAddWork = (mutationOptions?: MutationOptions<WorkData, AddWorkVariables>) => {
	const mutation = useMutation<WorkData, AddWorkVariables>(ADD_WORK, mutationOptions);
	return mutation;
}

export const useUpdateWork = (mutationOptions?: MutationOptions<WorkData, UpdateWorkVariables>) => {
	const mutation = useMutation<WorkData, UpdateWorkVariables>(UPDATE_WORK, mutationOptions);
	return mutation;
}

// Project 

type AddProjectVariables = {
  projectAttributes: {
    deployed:string,
    desc:string,
    github:string,
    images:string[],
    label:string,
    skills:string[],
  },
}
type UpdateProjectVariables = {
  projectId: string,
  projectAttributes: Partial<AddProjectVariables['projectAttributes']>
}

export const useAddProject = (mutationOptions?: MutationOptions<ProjectData, AddProjectVariables>) => {
	const mutation = useMutation<ProjectData, AddProjectVariables>(ADD_PROJECT, mutationOptions);
	return mutation;
}

export const useUpdateProject = (mutationOptions?: MutationOptions<ProjectData, UpdateProjectVariables>) => {
	const mutation = useMutation<ProjectData, UpdateProjectVariables>(UPDATE_PROJECT, mutationOptions);
	return mutation;
}