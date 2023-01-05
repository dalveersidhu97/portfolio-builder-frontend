import { gql, useMutation } from "@apollo/client";
import { SkillsGroupData, SkillData } from "../../types/page.types";
import { MutationOptions } from "../types";

const CREATE_SKILL_GROUP = gql`
mutation CreateSkillGroup($group: SkillGroupInput!) {
    result: createSkillGroup(group: $group) {
      success
      group {
        id
        name
        skills {
          id
        }
      }
    }
  }
`;

const UPDATE_SKILL_GROUP = gql`
mutation UpdateGroup($group: SkillGroupInput!, $groupId: ID!) {
    result: updateSkillGroup(group: $group, groupId: $groupId) {
      success
      group {
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
} 
`;


const CREATE_SKILL = gql`
mutation CreateGroupSkill($skill: AddGroupSkillInput!) {
    result: createGroupSkill(skill: $skill) {
      success,
      skill {
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

const UPDATE_SKILL = gql`
mutation UpdateSkill($skill: UpdateGroupSkillInput!, $skillId: ID!) {
    result: updateSkill(skill: $skill, skillId: $skillId) {
      success
      skill {
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
// Group
type CreateSkillGroupVariables = {
    group: { name: string }
}

export const useCreateSkillGroup = (mutationOptions?: MutationOptions<SkillsGroupData, CreateSkillGroupVariables>) => {
	const mutation = useMutation<SkillsGroupData, CreateSkillGroupVariables>(CREATE_SKILL_GROUP, mutationOptions);
	return mutation;
}

type UpdateSkillGroupVariables = {
    group: { name: string },
    groupId: string
}

export const useUpdateSkillGroup = (mutationOptions?: MutationOptions<SkillsGroupData, UpdateSkillGroupVariables>) => {
	const mutation = useMutation<SkillsGroupData, UpdateSkillGroupVariables>(UPDATE_SKILL_GROUP, mutationOptions);
	return mutation;
}

// Skill
type CreateSkillVariables = {
    skill: { label: string, score: number, groups: string[] }
}

export const useCreateSkill = (mutationOptions?: MutationOptions<SkillData, CreateSkillVariables>) => {
	const mutation = useMutation<SkillData, CreateSkillVariables>(CREATE_SKILL, mutationOptions);
	return mutation;
}

type UpdateSkillVariables = CreateSkillVariables & {
    skillId: string
}

export const useUpdateSkill = (mutationOptions?: MutationOptions<SkillData, UpdateSkillVariables>) => {
	const mutation = useMutation<SkillData, UpdateSkillVariables>(UPDATE_SKILL, mutationOptions);
	return mutation;
}
