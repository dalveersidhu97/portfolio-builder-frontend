import { FC } from "react";
import { useAddProject, useAddWork, useExperiencePageQuery, useUpdateProject, useUpdateWork } from "../../apolloClient";
import { CardGroup, CreatePage, Editable, InputProject, InputWork, PageHeader, TitleH2 } from "../../components";
import { useUserContext } from "../../store/context/UserProvider";
import { Project, Work } from "../../types/page.types";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ProjectView } from "../../components/common/cards/ProjectView";
import { WorkView } from "../../components/common/cards/WorkView";

const mapWorkInput = (work: Work) => {
    return {
        address: work.address,
        company: work.company,
        duration: work.duration,
        duties: work.duties,
        icon: work.icon,
        role: work.role,
        type: work.type,
    }
}
const mapProjectInput = (project: Project) => {
    return {
        deployed: project.deployed,
        desc: project.desc,
        github: project.github,
        images: project.images,
        label: project.label,
        skills: project.skills,
    }
}

export const ExperiencePage: FC = () => {

    const { user, isMe } = useUserContext();
    const { data, loading, error, updateQuery, refetch } = useExperiencePageQuery({ userId: user!.id })
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    const experiencePage = data?.experiencePage;
    
    if (!experiencePage) return <CreatePage pageName="Experience" onPageCreated={(page)=>refetch()}></CreatePage>;

    const { works, projects } = experiencePage;

    return (
        <div data-testid="ExperiencePage" className="flex flex-col gap-8">
            <PageHeader
                page={experiencePage}
                pageName="Experience"
                onUpdateQuery={(newPage) => {
                    updateQuery(({ experiencePage }) => ({ experiencePage: { ...experiencePage!, ...newPage } }));
                    refetch();
                }}
            />
            <div className="flex flex-col gap-6">
                {!!works && works.length > 0 && <div className="flex flex-col gap-6">
                    <TitleH2>Work History</TitleH2>
                    <CardGroup>
                        {works.map((work, index) => {
                            return <WorkView key={work.id+index+'view'} work={work} className="relative">
                                <Editable
                                    InputComponent={InputWork}
                                    inputComponentProps={{
                                        value: work,
                                        useUpdate: useUpdateWork,
                                        makeVariables: (workInput) => ({ workAttributes: mapWorkInput(workInput), workId: work.id }),
                                        decideSuccess: (data) => {
                                            refetch();
                                            return { isSuccess: !!data.result?.success, newValue: data.result?.work }
                                        }
                                    }}
                                    key={work.id + 'Editable'}
                                    label="Add Work"
                                    rounded="rounded-md"
                                ></Editable>
                            </WorkView>
                        })}
                        {isMe && <button className="border p-2 rounded-md relative">
                            Add Work
                            <Editable
                                InputComponent={InputWork}
                                inputComponentProps={{
                                    value: { duties: [] } as any,
                                    useUpdate: useAddWork,
                                    makeVariables: (workInput) => ({ workAttributes: mapWorkInput(workInput) }),
                                    decideSuccess: (data) => {
                                        refetch();
                                        return { isSuccess: !!data.result?.success, newValue: data.result?.work }
                                    }
                                }}
                                label="Add Work"
                                rounded="rounded-md"
                            ></Editable>
                        </button>}
                    </CardGroup>
                </div>}
                {isMe && (!works || works.length === 0) && <button className="p-2 relative md:max-w-[50%] text-gray-dark font-medium px-4 py-2 rounded-md border-gray-dark border ">
                    Add Work
                    <Editable
                        InputComponent={InputWork}
                        inputComponentProps={{
                            value: { duties: [] } as any,
                            useUpdate: useAddWork,
                            makeVariables: (workInput) => ({ workAttributes: mapWorkInput(workInput) }),
                            decideSuccess: (data) => {
                                refetch();
                                return { isSuccess: !!data.result?.success, newValue: data.result?.work }
                            }
                        }}
                        label="Update Work"
                        rounded="rounded-md"
                        size={20}
                    ></Editable>
                </button>}

                {!!projects && projects.length > 0 && <div className="flex flex-col gap-6">
                    <TitleH2>Personal Project</TitleH2>
                    <CardGroup>
                        {projects.map(project => {
                            return <ProjectView key={project.id} project={project} className='relative'>
                                {isMe && <button className="text-sm text-gray-light font-medium px-2 py-1 rounded-md self-center border-gray-light border relative ml-auto">
                                    Edit
                                    <Editable
                                        InputComponent={InputProject}
                                        inputComponentProps={{
                                            useUpdate: useUpdateProject,
                                            value: project,
                                            label: 'Update Project',
                                            makeVariables: (projectInput) => ({ projectId: project.id, projectAttributes: mapProjectInput(projectInput) }),
                                            decideSuccess(data) {
                                                refetch();
                                                return { isSuccess: true, newValue: data.result?.project }
                                            },
                                        }}
                                        label="Update Project"
                                        rounded="rounded-md"
                                    ></Editable>
                                </button>}
                            </ProjectView>
                        })}
                        {isMe && <button className="text-gray-dark font-medium px-4 py-2 rounded-md border-gray-dark border relative">
                            Add Project
                            <Editable
                                InputComponent={InputProject}
                                inputComponentProps={{
                                    useUpdate: useAddProject,
                                    value: { skills: [], images: []} as any,
                                    label: 'Update Project',
                                    makeVariables: (projectInput) => ({ projectAttributes: mapProjectInput(projectInput) }),
                                    decideSuccess(data) {
                                        refetch();
                                        return { isSuccess: true, newValue: data.result?.project }
                                    },
                                }}
                                label="Update Project"
                                rounded="rounded-md"
                            ></Editable>
                        </button>}
                    </CardGroup>
                </div>}
                {(!projects || !projects.length) && isMe && <div>
                    <button className="text-gray-dark font-medium px-4 py-2 rounded-md border-gray-dark border relative">
                        Add Project
                        <Editable
                            InputComponent={InputProject}
                            inputComponentProps={{
                                useUpdate: useAddProject,
                                value: { skills: [], images: []} as any,
                                label: 'Update Project',
                                makeVariables: (projectInput) => ({ projectAttributes: mapProjectInput(projectInput) }),
                                decideSuccess(data) {
                                    refetch();
                                    return { isSuccess: true, newValue: data.result?.project }
                                },
                            }}
                            label="Update Project"
                            rounded="rounded-md"
                        ></Editable>
                    </button>
                </div>}
            </div>
        </div>
    );
}