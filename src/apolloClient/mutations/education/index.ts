import { gql, useMutation } from "@apollo/client";
import { Education } from "../../../types/page.types";
import { EducationData } from "../../types/page.types";
import { MutationOptions } from "../types";

const ADD_EDUCATION = gql`
mutation CreateEducation($educationAttributes: EducationInput!) {
  result: addEducation(educationAttributes: $educationAttributes) { 
    ...educationResFields
  }
}
fragment educationResFields on EducationResponse {
  success
  ... on EducationResponse {
    education {
      ...educationFields
    }
  }
}

fragment educationFields on Education {
id
level
institute
course
campus
gpa
startDate
endDate
}
`;

const UPDATE_EDUCATION = gql`
mutation UpdateEducation($educationId: ID!, $educationAttributes: UpdateEducationInput!) {
  result: updateEducation(educationId: $educationId, educationAttributes: $educationAttributes) {
    ...educationResFields
  }
}

fragment educationResFields on EducationResponse {
  success
  ... on EducationResponse {
    education {
      ...educationFields
    }
  }
}

fragment educationFields on Education {
id
level
institute
course
campus
gpa
startDate
endDate
}
`;

type AddEducationVariables = {
  educationAttributes: Omit<Education, 'id'>,
}
type UpdateEducationVariables = {
  educationId: string,
  educationAttributes: Partial<AddEducationVariables['educationAttributes']>
}

export const useAddEducation = (mutationOptions?: MutationOptions<EducationData, AddEducationVariables>) => {
	const mutation = useMutation<EducationData, AddEducationVariables>(ADD_EDUCATION, mutationOptions);
	return mutation;
}

export const useUpdateEducation = (mutationOptions?: MutationOptions<EducationData, UpdateEducationVariables>) => {
	const mutation = useMutation<EducationData, UpdateEducationVariables>(UPDATE_EDUCATION, mutationOptions);
	return mutation;
}