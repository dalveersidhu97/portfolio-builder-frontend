import { FC, PropsWithChildren } from "react";
import { useCreateSkill, useCreateSkillGroup, useUpdateSkill, useUpdateSkillGroup } from "../../apolloClient";
import { useUserSkillsQuery } from "../../apolloClient/queries/skills";
import { Card, CardGroup, CreatePage, Editable, InputDialog, InputSkill, PageHeader, SkillView } from "../../components";
import { useUserContext } from "../../store/context/UserProvider";

export const SkillsPage: FC = () => {
    const { user, isMe } = useUserContext();

    const { data: skillsData, loading: loadingSkills, updateQuery, refetch } = useUserSkillsQuery({ userId: user?.id! });
    const skillsPage = skillsData?.skillsPage || undefined;
    
    if (loadingSkills) return <p>Loading...</p>
    if (!skillsPage) return <CreatePage pageName="Skills" onPageCreated={(page)=>refetch()}></CreatePage>;
    const groups = skillsPage?.groups;

    return (
        <div data-testid='SkillsPage' className="flex flex-col gap-8">
            <PageHeader
                page={skillsPage}
                pageName="Skills"
                onUpdateQuery={(newPage) => {
                    updateQuery(({ skillsPage }) => ({ skillsPage: { ...skillsPage!, ...newPage } }));
                    refetch();
                }}
            />

            <div className="flex flex-col gap-6">
                <CardGroup>
                    {groups && groups.length > 0 && <>
                        {groups.map(group => {
                            const GrpTitle = <span className="relative w-full text-gray-500 text-lg font-bold">
                                <div className="text-center w-full">{group.name || (isMe ? 'Set group name' : '')}</div>
                                <Editable
                                    rounded="rounded-md"
                                    InputComponent={InputDialog}
                                    label={'Update group name'}
                                    inputComponentProps={{
                                        placeholder: "Group name",
                                        value: group.name,
                                        useUpdate: useUpdateSkillGroup,
                                        makeVariables: (name) => ({ group: { name }, groupId: group.id }),
                                        decideSuccess: (data) => {
                                            const isSuccess = !!data.result?.success
                                            const newGroup = data.result?.group;
                                            if (isSuccess && newGroup) {
                                                const newGroups = skillsPage?.groups.map(grp => (grp.id === newGroup.id ? { ...grp, name: newGroup.name } : grp)) || [];
                                                if (!!newGroups?.find(grp => grp.id === newGroup?.id)) newGroups.push({ ...newGroup!, skills: [] });
                                                updateQuery(({ skillsPage }) => ({
                                                    skillsPage: {
                                                        ...skillsPage!,
                                                        groups: newGroups
                                                    }
                                                }))
                                            }
                                            refetch()
                                            return { isSuccess, newValue: newGroup?.name }
                                        }
                                    }}
                                />
                            </span>
                            return <Card
                                title={GrpTitle}
                                key={group.id}
                                className='relative bg-white shadow-md shadow-gray-100'
                            >
                                {group.skills && group.skills.length > 0 && 
                                <div className="flex flex-col gap-2">
                                    {group.skills.map(skill => 
                                    <SkillView key={skill.id} skill={skill} >
                                        <Editable
                                            rounded="rounded-md"
                                            InputComponent={InputSkill}
                                            label={'Update Skill'}
                                            inputComponentProps={{
                                                allGroups: skillsPage.groups,
                                                value: {...skill, groups: skill.groups.map(grp=>grp.id)},
                                                useUpdate: useUpdateSkill,
                                                makeVariables: (s) => ({ skill: { label: s.label, score: s.score, groups: s.groups }, skillId: skill.id }),
                                                decideSuccess: (data) => {
                                                    const isSuccess = !!data.result?.success
                                                    const newSkill = data.result?.skill;
                                                    refetch()
                                                    return { isSuccess, newValue: newSkill ? { ...newSkill!, groups: newSkill.groups.map(grp=>grp.id) } : undefined }
                                                }
                                            }}
                                        />
                                    </SkillView>)}
                                    
                                </div>}
                                {isMe && <div className="relative w-fit m-auto flex items-center justify-center px-8 py-2 rounded-md text-sm text-gray-500 bg-white font-medium border border-gray-200">
                                    <div>Add a Skill</div>
                                    <Editable
                                        rounded="rounded-md"
                                        InputComponent={InputSkill}
                                        label={'Add a skill'}
                                        inputComponentProps={{
                                            value: { groups: [group.id], score: 50 } as any,
                                            useUpdate: useCreateSkill,
                                            allGroups: skillsPage.groups.map(grp => ({ id: grp.id, name: grp.name })),
                                            makeVariables: (s) => ({ skill: { label: s.label, score: s.score, groups: s.groups } }),
                                            decideSuccess: (data) => {
                                                const isSuccess = !!data.result?.success
                                                const newSkill = data.result?.skill;
                                                refetch()
                                                return { isSuccess, newValue: newSkill ? { ...newSkill!, groups: newSkill.groups.map(grp=>grp.id) } : undefined }
                                            }
                                        }}
                                    />
                                </div>}
                            </Card>
                        })}
                    </>}
                    <div className="w-full flex flex-col md:flex-row gap-6 col-span-2">
                        {isMe && <div className="px-2 py-2 relative flex items-center justify-center border rounded-md w-full">
                            <div>Add Skill Group</div>
                            <Editable
                                rounded="rounded-md"
                                InputComponent={InputDialog}
                                label={'Add skill group'}
                                inputComponentProps={{
                                    placeholder: "Group name",
                                    value: '',
                                    useUpdate: useCreateSkillGroup,
                                    makeVariables: (name) => ({ group: { name } }),
                                    decideSuccess: (data) => {
                                        const isSuccess = !!data.result?.success
                                        const newGroup = data.result?.group;
                                        if (isSuccess && newGroup) {
                                            const newGroups = skillsPage?.groups.map(grp => (grp.id === newGroup.id ? { ...grp, name: newGroup.name } : grp)) || [];
                                            if (!!newGroups?.find(grp => grp.id === newGroup?.id)) newGroups.push({ ...newGroup!, skills: [] });
                                            updateQuery(({ skillsPage }) => ({
                                                skillsPage: {
                                                    ...skillsPage!,
                                                    groups: newGroups
                                                }
                                            }))
                                        }
                                        refetch()
                                        return { isSuccess, newValue: newGroup?.name }
                                    }
                                }}
                            />
                        </div>}
                        {isMe && !skillsPage?.groups.length && <div className="w-full"></div>}
                        {isMe && !!skillsPage?.groups.length && skillsPage?.groups.length > 0 && <div className="px-2 py-2 relative flex items-center justify-center border rounded-md w-full">
                            <div>Add a Skill</div>
                            <Editable
                                rounded="rounded-md"
                                InputComponent={InputSkill}
                                label={'Add a skill'}
                                inputComponentProps={{
                                    value: { groups: [], } as any,
                                    useUpdate: useCreateSkill,
                                    allGroups: skillsPage.groups.map(grp => ({ id: grp.id, name: grp.name })),
                                    makeVariables: (s) => ({ skill: { label: s.label, score: s.score, groups: s.groups } }),
                                    decideSuccess: (data) => {
                                        const isSuccess = !!data.result?.success
                                        const newSkill = data.result?.skill;
                                        refetch()
                                        return { isSuccess, newValue: newSkill ? { ...newSkill!, groups: newSkill.groups.map(grp=>grp.id) } : undefined }
                                    }
                                }}
                            />
                        </div>}
                    </div>
                </CardGroup>
            </div>
        </div>
    );
}