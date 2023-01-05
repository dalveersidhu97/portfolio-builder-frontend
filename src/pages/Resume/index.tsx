import { FC } from "react";
import { useAddEducation, useEducationPageQuery, useUpdateEducation } from "../../apolloClient";
import { CardGroup, CreatePage, Editable, EducationView, InputEducation, PageHeader, TitleH2 } from "../../components";
import { useUserContext } from "../../store/context/UserProvider";
import { Education } from "../../types/page.types";

const mapEducationInput = (education: Education) => {
    return {
        level: education.level,
        institute: education.institute,
        course: education.course,
        campus: education.campus,
        gpa: education.gpa,
        startDate: education.startDate,
        endDate: education.endDate,
        duration: education.duration,
    }
}

export const ResumePage: FC = () => {
    const { user, isMe } = useUserContext();
    const { data, loading, error, updateQuery, refetch } = useEducationPageQuery({ userId: user!.id })
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    const educationPage = data?.educationPage;
    
    if (!educationPage) return <CreatePage pageName="Education" onPageCreated={(page)=>refetch()}></CreatePage>;

    const { list: educations } = educationPage;
    return (
        <div data-testid="ResumePage" className="flex flex-col gap-8">
            <PageHeader
                page={educationPage}
                pageName="Education"
                onUpdateQuery={(newPage) => {
                    updateQuery(({ educationPage }) => ({ educationPage: { ...educationPage!, ...newPage } }));
                    refetch();
                }}
            />
            <div className="flex flex-col gap-6">
                <TitleH2>Education</TitleH2>
                <CardGroup>
                    {!!educations && educations.length > 0 && <>
                        {educations.map(education => <EducationView key={education.id} education={education} className="relative">
                            {isMe && <Editable
                                InputComponent={InputEducation}
                                inputComponentProps={{
                                    value: education,
                                    useUpdate: useUpdateEducation,
                                    makeVariables: (educationInput) => ({ educationAttributes: mapEducationInput(educationInput), educationId: education.id }),
                                    decideSuccess(data) {
                                        const isSuccess = !!data.result?.success;
                                        const newEducation = data.result?.education;
                                        if (isSuccess && newEducation) {
                                            updateQuery(({ educationPage }) => ({
                                                educationPage: {
                                                    ...educationPage!,
                                                    list: educationPage!.list.map(edu => edu.id === education.id ? newEducation : edu)
                                                }
                                            }))
                                        }
                                        refetch();
                                        return { isSuccess, newValue: newEducation }
                                    },
                                }}
                                label="Update Education"
                                rounded="rounded-md"
                                size={20}
                            />}
                        </EducationView>)}
                    </>}
                    {isMe && <button className="relative p-4 border rounded-md font-medium">
                        Add Education
                        <Editable
                            InputComponent={InputEducation}
                            inputComponentProps={{
                                value: {} as any,
                                useUpdate: useAddEducation,
                                makeVariables: (educationInput) => ({ educationAttributes: mapEducationInput(educationInput) }),
                                decideSuccess(data) {
                                    const isSuccess = !!data.result?.success;
                                    const newEducation = data.result?.education;
                                    if (isSuccess && newEducation) {
                                        updateQuery(({ educationPage }) => ({
                                            educationPage: {
                                                ...educationPage!,
                                                list: [...(educationPage!.list||[]), newEducation]
                                            }
                                        }))
                                    }
                                    refetch();
                                    return { isSuccess, newValue: newEducation }
                                },
                            }}
                            label="Update Education"
                            rounded="rounded-md"
                            size={20}
                        />
                    </button>}
                </CardGroup>
            </div>
        </div>
    );
}