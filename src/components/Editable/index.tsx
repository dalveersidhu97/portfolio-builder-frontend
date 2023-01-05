import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MutationHook } from "../../apolloClient/mutations/types";
import { useUserContext } from "../../store/context/UserProvider";
import { Education, Project, Work } from "../../types/page.types";
import { useOnClickOutside } from "../../utils/hooks/useOnOutsideClick";
import { AboutArticleView, EducationView, Modal, SkillView } from "../common";
import { ProjectView } from "../common/cards/ProjectView";
import { WorkView } from "../common/cards/WorkView";


type InputPropsMinimal<T, V, Inputs = string, AditionalProps = unknown> = {
    useUpdate: MutationHook<T, V>,
    makeVariables: (input: Inputs) => V,
    decideSuccess: (data: T) => { isSuccess: boolean, newValue?: Inputs },
    value?: Inputs,
} & AditionalProps;

type EditableEvents<Inputs> = { onClose: any, onSave: (newValue: Inputs) => any, }

type InputProps<T, V, Inputs = string, AditionalProps = unknown> = EditableEvents<Inputs> & InputPropsMinimal<T, V, Inputs, AditionalProps>;

type InputComponentProps = { position?: 'top-full left-0', type?: 'textarea', inputClass?: string, placeholder: string };
export const InputComponent = <T, V>(props: InputProps<T, V, string, InputComponentProps>) => {
    const { onClose, onSave, value, useUpdate, makeVariables, decideSuccess, placeholder, position, type, inputClass } = props;
    const [update, { error, loading }] = useUpdate({
        onCompleted(data, clientOptions) {
            const { isSuccess, newValue } = decideSuccess(data);
            if (isSuccess) onSave(newValue!);
        },
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState(value || '');
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    const saveHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.preventDefault();
        update({ variables: makeVariables(inputValue) });
    }
    // TODO: report if there is an error

    return <span className="relative w-full h-full" onClick={(e) => { e.preventDefault(); }}>
        <input placeholder={placeholder} value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} ref={inputRef} type={type ? type : 'text'}
            className={'w-full h-full rounded-full bg-inherit text-inherit border-2 border-gray-400 active:border-gray-800 ' + inputClass} style={{ textAlign: 'inherit' }} />
        <span className={`absolute ${position ? position : 'bottom-full left-0 '} shadow-[0_0_.5rem_rgba(0,0,0,.15)] p-2 bg-white rounded-md flex gap-2 text-xs`}>
            <button
                disabled={inputValue === value || loading}
                onClick={saveHandler}
                className="disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70 hover:opacity-70 px-2 py-1 bg-green-500 text-white rounded-md"
            >
                {loading ? 'Saving...' : 'Save'}
            </button>
            <button onClick={onClose} className="hover:opacity-70 px-2 py-1 bg-red-500 text-white rounded-md">Close</button>
        </span>
    </span>
}

export const InputDialog = <T, V>(props: InputProps<T, V, string, { label?: string, dialogClass?: string, placeholder: string, type?: 'textarea', inputClass?: string }>) => {
    const { onClose, onSave, value, useUpdate, makeVariables, decideSuccess, placeholder, label, type, inputClass, dialogClass } = props;
    const [update, { error, loading }] = useUpdate({
        onCompleted(data, clientOptions) {
            const { isSuccess, newValue } = decideSuccess(data);
            if (isSuccess) onSave(newValue!);
        },
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState(value || '');
    useEffect(() => {
        inputRef.current?.focus();
        textAreaRef.current?.focus();
    }, []);
    const saveHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.preventDefault();
        update({ variables: makeVariables(inputValue) });
    }
    // TODO: report if there is an error
    const modalRef = useRef(null);
    // useOnClickOutside(modalRef, () => onClose())
    return <Modal className='flex items-center justify-center'>
        <div ref={modalRef} className={' bg-white p-6 shadow-2xl rounded-xl flex flex-col gap-4 w-full md:w-auto md:min-w-[30rem] ' + dialogClass}>
            <h2 className='text-gray-dark font-semibold'>{label || 'Update'}</h2>
            <div className='flex flex-col gap-6'>
                {!type && <input placeholder={placeholder} value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} ref={inputRef} type={'text'}
                    className={'w-full h-full p-2 rounded-md bg-inherit text-inherit border-2 border-gray-400 active:border-gray-800 ' + inputClass}
                    style={{ textAlign: 'inherit' }}
                />}
                {type === 'textarea' && <textarea
                    placeholder={placeholder} value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} ref={textAreaRef}
                    className={'w-full h-full p-2 rounded-md bg-inherit text-inherit border-2 border-gray-400 active:border-gray-800 ' + inputClass}
                    style={{ textAlign: 'inherit' }}
                ></textarea>}
                <span className="rounded-md flex gap-2 text-sm">
                    <button
                        disabled={inputValue === value || loading}
                        onClick={saveHandler}
                        className="disabled:bg-gray-400 w-full disabled:cursor-not-allowed disabled:opacity-70 hover:opacity-70 px-2 py-1 bg-green-500 text-white rounded-md"
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button onClick={onClose} className="hover:opacity-70 w-full px-4 py-2 bg-red-500 text-white rounded-md">Close</button>
                </span>
            </div>
        </div>
    </Modal>
}
type ArticleInput = { icon?: string, label: string, content: string, id: string, sectionId: string };
type AditionalInputAboutArticleProps = { label?: string, dialogClass?: string, inputClass?: string }
export const InputAboutArticle = <T, V>(props: InputProps<T, V, ArticleInput, AditionalInputAboutArticleProps>) => {
    const { onClose, onSave, value, useUpdate, makeVariables, decideSuccess, label, inputClass, dialogClass } = props;
    const [update, { error, loading }] = useUpdate({
        onCompleted(data, clientOptions) {
            const { isSuccess, newValue } = decideSuccess(data);
            if (isSuccess) onSave(newValue!);
        },
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState<ArticleInput>(value || {} as ArticleInput);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    const saveHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.preventDefault();
        update({ variables: makeVariables({ ...inputValue }) });
    }
    // TODO: report if there is an error
    return <UpdatableModal
        disabled={inputValue === value || loading}
        label={label || 'Update Project'}
        loading={loading}
        onClose={onClose}
        onSave={saveHandler}
        dialogClass={dialogClass}
    >
        {/* Inputs */}
        <>
            <input placeholder={'React Icon Name'} value={inputValue.icon || ''} onChange={(e) => { setInputValue(prev => ({ ...prev, icon: e.target.value })) }} ref={inputRef} type={'text'}
                className={'w-full h-full p-2 rounded-md bg-inherit text-inherit border-2 border-gray-400 active:border-gray-800 ' + inputClass}
                style={{ textAlign: 'inherit' }}
            />
            <input placeholder={'Title'} value={inputValue.label || ''} onChange={(e) => { setInputValue(prev => ({ ...prev, label: e.target.value })) }} type={'text'}
                className={'w-full h-full p-2 rounded-md bg-inherit text-inherit border-2 border-gray-400 active:border-gray-800 ' + inputClass}
                style={{ textAlign: 'inherit' }}
            />
            <textarea
                placeholder={'Description'} value={inputValue.content || ''} onChange={(e) => { setInputValue(prev => ({ ...prev, content: e.target.value })) }}
                className={'w-full min-h-[10rem] p-2 rounded-md bg-inherit text-inherit border-2 border-gray-400 active:border-gray-800 ' + inputClass}
                style={{ textAlign: 'inherit' }}
            ></textarea>
        </>
        {/* Preview */}
        <AboutArticleView withIconError className="md:max-w-[25rem] md:min-w-[25rem] min-w-full border rounded-md" article={inputValue}></AboutArticleView>
    </UpdatableModal>
}

type SkillInput = { score: number, label: string, id: string, groups: string[] };
type AditionalSkillProps = { allGroups?: { id: string, name: string }[], label?: string, dialogClass?: string, inputClass?: string };
export const InputSkill = <T, V>(props: InputProps<T, V, SkillInput, AditionalSkillProps>) => {
    const { onClose, onSave, value, useUpdate, makeVariables, decideSuccess, label, inputClass, dialogClass, allGroups } = props;
    const [update, { error, loading }] = useUpdate({
        onCompleted(data, clientOptions) {
            const { isSuccess, newValue } = decideSuccess(data);
            if (isSuccess) onSave(newValue!);
        },
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState<SkillInput>(value || { label: '', score: 50 } as SkillInput);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    const saveHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        update({ variables: makeVariables({ ...inputValue }) });
    }
    // TODO: report if there is an error
    return <UpdatableModal
        disabled={inputValue === value || loading}
        label={label || 'Update Project'}
        loading={loading}
        onClose={onClose}
        onSave={saveHandler}
        dialogClass={dialogClass}
    >
        {/* Inputs */}
        <>
            <input placeholder={'Skill name'} value={inputValue.label || ''} onChange={(e) => { setInputValue(prev => ({ ...prev, label: e.target.value })) }} ref={inputRef} type={'text'}
                className={'w-full h-full p-2 rounded-md bg-inherit text-inherit border-2 border-gray-400 active:border-gray-800 ' + inputClass}
                style={{ textAlign: 'inherit' }}
            />
            <input placeholder={'Score'} value={inputValue.score || 51} onChange={(e) => { setInputValue(prev => ({ ...prev, score: +e.target.value })) }} type={'number'} max={100} min={0}
                className={'w-full h-full p-2 rounded-md bg-inherit text-inherit border-2 border-gray-400 active:border-gray-800 ' + inputClass}
                style={{ textAlign: 'inherit' }}
            />
            <div className="text-sm font-semibold">Skill Groups</div>
            <div className="flex gap-2 flex-wrap max-w-[30rem]">
                {allGroups?.map(group =>
                    <span key={group.id} className="flex gap-2 p-2 px-4 border rounded-md">
                        <label className="" htmlFor={group.id}>{group.name}</label>
                        <input defaultChecked={!!inputValue.groups.find(grp => grp === group.id)} className="w-4" type="checkbox" id={group.id} name="groupName" value={group.id}
                            onChange={(e) => {
                                setInputValue(prev => ({
                                    ...prev,
                                    groups: e.target.checked && !prev.groups.find(grp => grp === group.id)
                                        ? [...prev.groups, group.id]
                                        : prev.groups.filter(grp => grp !== group.id)
                                }))
                            }} />
                    </span>
                )}
            </div>
        </>
        {/* Preview */}
        <SkillView className="md:min-w-[25rem] min-w-full border rounded-md" skill={{ ...inputValue, groups: [] }}></SkillView>
    </UpdatableModal>
}

type WorkInput = Work;
type AditionalWorkProps = { label?: string, dialogClass?: string, inputClass?: string };
export const InputWork = <T, V>(props: InputProps<T, V, WorkInput, AditionalWorkProps>) => {
    const { onClose, onSave, value, useUpdate, makeVariables, decideSuccess, label, dialogClass, inputClass, ...aditionalProps } = props;
    const [update, { error, loading }] = useUpdate({
        onCompleted(data, clientOptions) {
            const { isSuccess, newValue } = decideSuccess(data);
            if (isSuccess) onSave(newValue!);
        },
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState<WorkInput>(value || {} as WorkInput);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    const saveHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.preventDefault();
        update({ variables: makeVariables({ ...inputValue, duties: inputValue.duties.filter(duty => !!duty.trim()) }) });
    }

    // TODO: report if there is an error
    return <UpdatableModal
        disabled={inputValue === value || loading}
        label={label || 'Update Work'}
        loading={loading}
        onClose={onClose}
        onSave={saveHandler}
        dialogClass={dialogClass}
    >
        {/* Inputs */}
        <>
            <input placeholder={'Role'} value={inputValue.role} onChange={(e) => { setInputValue(prev => ({ ...prev, role: e.target.value })) }} ref={inputRef} type={'text'}
                className={'w-full h-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass}
                style={{ textAlign: 'inherit' }}
            />
            <input placeholder={'Type, Eg: Full Time'} value={inputValue.type} onChange={(e) => { setInputValue(prev => ({ ...prev, type: e.target.value })) }} type={'text'}
                className={'w-full h-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass}
                style={{ textAlign: 'inherit' }}
            />
            <input placeholder={'Duration, Eg: 7 Months'} value={inputValue.duration} onChange={(e) => { setInputValue(prev => ({ ...prev, duration: e.target.value })) }} type={'text'}
                className={'w-full h-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass}
                style={{ textAlign: 'inherit' }}
            />
            <input placeholder={'Company'} value={inputValue.company} onChange={(e) => { setInputValue(prev => ({ ...prev, company: e.target.value })) }} type={'text'}
                className={'w-full h-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass}
                style={{ textAlign: 'inherit' }}
            />
            <input placeholder={'Work address'} value={inputValue.address} onChange={(e) => { setInputValue(prev => ({ ...prev, address: e.target.value })) }} type={'text'}
                className={'w-full h-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass}
                style={{ textAlign: 'inherit' }}
            />
            <div className="font-semibold text-sm text-gray-dark">Duties</div>
            <div className="flex flex-col gap-3">
                {inputValue.duties.map((duty, index) => {
                    return <div className="flex gap-3" key={index + 'duty'}>
                        <input
                            onChange={({ target: { value } }) => {
                                setInputValue(prev => {
                                    return { ...prev, duties: prev.duties.map((dty, i) => i === index ? value : dty) }
                                })
                            }}
                            type={'text'} placeholder={'Enter duty'}
                            value={inputValue.duties.at(index)}
                            className={'w-full px-2 py-1 border border-gray-300 rounded-md focus:border-gray-dark'} />
                        <div
                            onClick={() => { setInputValue(prev => ({ ...prev, duties: prev.duties.filter((dty, i) => i !== index) })) }}
                            className="min-w-max bg-red-500 hover:opacity-70 cursor-pointer text-gray-50 p-1 flex items-center rounded-md"
                        >
                            <RiDeleteBinLine size={18}></RiDeleteBinLine>
                        </div>
                    </div>
                })}
                <button
                    className="border w-full px-4 py-2 hover:bg-[#00000025] rounded-md text-gray-dark text-sm font-medium flex justify-center items-center gap-2"
                    onClick={() => { setInputValue(prev => ({ ...prev, duties: [...prev.duties, ''] })) }}
                >
                    <IoAdd size={18}></IoAdd> Add Duty
                </button>
            </div>
        </>
        {/* Preview */}
        {<WorkView work={inputValue} className="max-w-[25rem] min-w-full md:min-w-[25rem] self-center justify-self-center"></WorkView>}
    </UpdatableModal>
}

type UpdatableModalProps = PropsWithChildren<{ label: string, onClose: () => any, onSave: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any, loading: boolean, disabled: boolean, hideOnOutsideClick?: boolean, dialogClass?: string }>;
const UpdatableModal = ({ label, onClose, disabled, loading, onSave, hideOnOutsideClick, dialogClass, children }: UpdatableModalProps) => {
    const modalRef = useRef(null);
    useOnClickOutside(modalRef, () => hideOnOutsideClick && onClose());
    return <Modal className="flex justify-start">
        <div ref={modalRef} className={' bg-white p-6 md:p-8 shadow-2xl rounded-xl flex flex-col md:flex-row md:flex-wrap gap-8 md:gap-10 w-full md:w-fit m-auto ' + dialogClass}>
            <div className="flex flex-col flex-grow gap-6 md:min-w-[25rem]">
                <h2 className='text-gray-dark font-semibold text-center'>{label || 'Update skill'}</h2>
                <div className='flex flex-col gap-3'>
                    {/* INPUTS */}
                    {children && Array.isArray(children) && children[0]}
                    {children && !Array.isArray(children) && children}
                    {/* SUBMIT BUTTONS */}
                    <span className="rounded-md flex gap-2 text-sm">
                        <button
                            disabled={disabled}
                            onClick={onSave}
                            className="disabled:bg-gray-400 w-full disabled:cursor-not-allowed disabled:opacity-70 hover:opacity-70 px-2 py-1 bg-green-500 text-white rounded-md"
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                        <button onClick={onClose} className="hover:opacity-70 w-full px-4 py-2 bg-red-500 text-white rounded-md">Close</button>
                    </span>
                </div>
            </div>
            {/* PREVIEW */}
            {children && Array.isArray(children) && children.length > 1 && !!children[1] && <div className="flex gap-4 flex-col md:self-center text-gray-dark flex-grow">
                <div className="font-medium text-center">Preview</div>
                {children.slice(1)}
            </div>}
        </div>
    </Modal>
}

type ProjectInput = Project;
type AditionalProjectProps = { label?: string, dialogClass?: string, inputClass?: string };
export const InputProject = <T, V>(props: InputProps<T, V, ProjectInput, AditionalProjectProps>) => {
    const { onClose, onSave, value, useUpdate, makeVariables, decideSuccess, label, dialogClass, inputClass, ...aditionalProps } = props;
    const [update, { error, loading }] = useUpdate({
        onCompleted(data, clientOptions) {
            const { isSuccess, newValue } = decideSuccess(data);
            if (isSuccess) onSave(newValue!);
        },
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState<ProjectInput>(value || {} as ProjectInput);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    const saveHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.preventDefault();
        update({
            variables: makeVariables({
                ...inputValue,
                skills: inputValue.skills.filter(skill => !!skill.trim()),
                images: inputValue.images.filter(image => !!image.trim())
            })
        });
    }
    // TODO: report if there is an error
    return <UpdatableModal
        disabled={inputValue === value || loading}
        label={label || 'Update Project'}
        loading={loading}
        onClose={onClose}
        onSave={saveHandler}
        dialogClass={dialogClass}
    >
        {/* Inputs */}
        <>
            <input placeholder={'Project Name'} value={inputValue.label} onChange={(e) => { setInputValue(prev => ({ ...prev, label: e.target.value })) }} ref={inputRef} type={'text'}
                className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass}
                style={{ textAlign: 'inherit' }}
            />
            <textarea
                placeholder={'Description'} value={inputValue.desc} onChange={(e) => { setInputValue(prev => ({ ...prev, desc: e.target.value })) }}
                className={'w-full min-h-[6rem] p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass}
                style={{ textAlign: 'inherit' }}
            ></textarea>
            <input placeholder={'Github Link'} value={inputValue.github} onChange={(e) => { setInputValue(prev => ({ ...prev, github: e.target.value })) }} type={'text'}
                className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass}
                style={{ textAlign: 'inherit' }}
            />
            <input placeholder={'Deployment Link (Optional)'} value={inputValue.deployed} onChange={(e) => { setInputValue(prev => ({ ...prev, deployed: e.target.value })) }} type={'text'}
                className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass}
                style={{ textAlign: 'inherit' }}
            />

            <div className="font-semibold text-gray-dark mt-2">Skills Used</div>
            <div className="flex flex-col gap-3">
                {inputValue.skills.map((duty, index) => {
                    return <div className="flex gap-3" key={index + 'duty-input'}>
                        <input
                            onChange={({ target: { value } }) => { setInputValue(prev => ({ ...prev, skills: prev.skills.map((dty, i) => i == index ? value : dty) })) }}
                            type={'text'}
                            value={inputValue.skills.at(index)}
                            className={'w-full px-2 py-1 border border-gray-300 rounded-md focus:border-gray-dark'} />
                        <div
                            onClick={() => { setInputValue(prev => ({ ...prev, skills: prev.skills.filter((dty, i) => { console.log(i); return i !== index }) })) }}
                            className="min-w-max bg-red-500 hover:opacity-70 cursor-pointer text-gray-50 p-1 flex items-center rounded-md"
                        >
                            <RiDeleteBinLine size={18}></RiDeleteBinLine>
                        </div>
                    </div>
                })}
                <button
                    className="border w-full px-4 py-2 hover:bg-[#00000025] rounded-md text-gray-dark text-sm font-medium flex justify-center items-center gap-2"
                    onClick={() => { setInputValue(prev => ({ ...prev, skills: [...prev.skills, ''] })) }}
                >
                    <IoAdd size={18}></IoAdd> Add Skill
                </button>
            </div>
            <div className="font-semibold text-gray-dark mt-2">Images</div>
            <div className="flex flex-col gap-3">
                {inputValue.images.map((duty, index) => {
                    return <div className="flex gap-3">
                        <input
                            onChange={({ target: { value } }) => { setInputValue(prev => ({ ...prev, images: prev.images.map((dty, i) => i == index ? value : dty) })) }}
                            type={'text'}
                            defaultValue={duty}
                            className={'w-full px-2 py-1 border border-gray-300 rounded-md focus:border-gray-dark'} />
                        <div
                            onClick={() => { setInputValue(prev => ({ ...prev, images: prev.images.filter((dty, i) => i !== index) })) }}
                            className="min-w-max bg-red-500 hover:opacity-70 cursor-pointer text-gray-50 p-1 flex items-center rounded-md"
                        >
                            <RiDeleteBinLine size={18}></RiDeleteBinLine>
                        </div>
                    </div>
                })}
                <button
                    className="border w-full px-4 py-2 hover:bg-[#00000025] rounded-md text-gray-dark text-sm font-medium flex justify-center items-center gap-2"
                    onClick={() => { setInputValue(prev => ({ ...prev, images: [...prev.images, ''] })) }}
                >
                    <IoAdd size={18}></IoAdd> Add Image Link
                </button>
            </div>
        </>
        {/* Preview */}
        <ProjectView detailed className="max-w-[25rem] min-w-full md:min-w-[25rem] self-center justify-self-center" project={{ ...inputValue, label: inputValue.label || '' }}></ProjectView>
    </UpdatableModal>
}


type EducationInput = Education;
type AditionalEducationProps = { label?: string, dialogClass?: string, inputClass?: string };
export const InputEducation = <T, V>(props: InputProps<T, V, EducationInput, AditionalEducationProps>) => {
    const { onClose, onSave, value, useUpdate, makeVariables, decideSuccess, label, dialogClass, inputClass, ...aditionalProps } = props;
    const [update, { error, loading }] = useUpdate({
        onCompleted(data, clientOptions) {
            const { isSuccess, newValue } = decideSuccess(data);
            if (isSuccess) onSave(newValue!);
        },
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState<EducationInput>(value || {} as EducationInput);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    const saveHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        update({
            variables: makeVariables(inputValue)
        });
    }
    // TODO: report if there is an error
    // const modalRef = useRef(null);
    // useOnClickOutside(modalRef, () => onClose())
    // return <Modal className="justify-start">
    //     <div ref={modalRef} className={' bg-white p-6 shadow-2xl rounded-xl flex flex-col gap-4 w-full md:w-fit m-auto md:min-w-[30rem] ' + dialogClass}>
    //         <h2 className='text-gray-dark font-semibold'>{label || 'Update skill'}</h2>
    //         <div className='flex flex-col gap-3'>
    //             <input placeholder="Course name"
    //                 value={inputValue.course} onChange={(e) => { setInputValue(prev => ({ ...prev, course: e.target.value })) }}
    //                 type={'text'} className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass} style={{ textAlign: 'inherit' }}
    //             />
    //             <input placeholder="Level"
    //                 value={inputValue.level} onChange={(e) => { setInputValue(prev => ({ ...prev, level: e.target.value })) }}
    //                 type={'text'} className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass} style={{ textAlign: 'inherit' }}
    //             />
    //             <input placeholder="Institute"
    //                 value={inputValue.institute} onChange={(e) => { setInputValue(prev => ({ ...prev, institute: e.target.value })) }}
    //                 type={'text'} className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass} style={{ textAlign: 'inherit' }}
    //             />
    //             <input placeholder="Campus"
    //                 value={inputValue.campus} onChange={(e) => { setInputValue(prev => ({ ...prev, campus: e.target.value })) }}
    //                 type={'text'} className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass} style={{ textAlign: 'inherit' }}
    //             />
    //             <input placeholder="GPA"
    //                 value={inputValue.gpa} onChange={(e) => { setInputValue(prev => ({ ...prev, gpa: e.target.value })) }}
    //                 type={'text'} className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass} style={{ textAlign: 'inherit' }}
    //             />
    //             <input placeholder="Duration"
    //                 value={inputValue.duration} onChange={(e) => { setInputValue(prev => ({ ...prev, duration: e.target.value })) }}
    //                 type={'text'} className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass} style={{ textAlign: 'inherit' }}
    //             />
    //             <input placeholder="Start Date"
    //                 value={inputValue.startDate} onChange={(e) => { setInputValue(prev => ({ ...prev, startDate: e.target.value })) }}
    //                 type={'text'} className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass} style={{ textAlign: 'inherit' }}
    //             />
    //             <input placeholder="End Date"
    //                 value={inputValue.endDate} onChange={(e) => { setInputValue(prev => ({ ...prev, endDate: e.target.value })) }}
    //                 type={'text'} className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass} style={{ textAlign: 'inherit' }}
    //             />
    //             <span className="rounded-md flex gap-2 text-sm">
    //                 <button
    //                     disabled={inputValue === value || loading}
    //                     onClick={saveHandler}
    //                     className="disabled:bg-gray-400 w-full disabled:cursor-not-allowed disabled:opacity-70 hover:opacity-70 px-2 py-1 bg-green-500 text-white rounded-md"
    //                 >
    //                     {loading ? 'Saving...' : 'Save'}
    //                 </button>
    //                 <button onClick={onClose} className="hover:opacity-70 w-full px-4 py-2 bg-red-500 text-white rounded-md">Close</button>
    //             </span>
    //         </div>
    //     </div>
    // </Modal>
    return <UpdatableModal
        disabled={inputValue === value || loading}
        label={label || 'Update Project'}
        loading={loading}
        onClose={onClose}
        onSave={saveHandler}
        dialogClass={dialogClass}
    >
        {/* Inputs */}
        <>
            <input placeholder="Course name"
                value={inputValue.course} onChange={(e) => { setInputValue(prev => ({ ...prev, course: e.target.value })) }}
                type={'text'} className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass} style={{ textAlign: 'inherit' }}
            />
            <input placeholder="Level"
                value={inputValue.level} onChange={(e) => { setInputValue(prev => ({ ...prev, level: e.target.value })) }}
                type={'text'} className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass} style={{ textAlign: 'inherit' }}
            />
            <input placeholder="Institute"
                value={inputValue.institute} onChange={(e) => { setInputValue(prev => ({ ...prev, institute: e.target.value })) }}
                type={'text'} className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass} style={{ textAlign: 'inherit' }}
            />
            <input placeholder="Campus"
                value={inputValue.campus} onChange={(e) => { setInputValue(prev => ({ ...prev, campus: e.target.value })) }}
                type={'text'} className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass} style={{ textAlign: 'inherit' }}
            />
            <input placeholder="GPA"
                value={inputValue.gpa} onChange={(e) => { setInputValue(prev => ({ ...prev, gpa: e.target.value })) }}
                type={'text'} className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass} style={{ textAlign: 'inherit' }}
            />
            <input placeholder="Duration"
                value={inputValue.duration} onChange={(e) => { setInputValue(prev => ({ ...prev, duration: e.target.value })) }}
                type={'text'} className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass} style={{ textAlign: 'inherit' }}
            />
            <input placeholder="Start Date"
                value={inputValue.startDate} onChange={(e) => { setInputValue(prev => ({ ...prev, startDate: e.target.value })) }}
                type={'text'} className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass} style={{ textAlign: 'inherit' }}
            />
            <input placeholder="End Date"
                value={inputValue.endDate} onChange={(e) => { setInputValue(prev => ({ ...prev, endDate: e.target.value })) }}
                type={'text'} className={'w-full p-2 rounded-md bg-inherit text-inherit border border-gray-400 active:border-gray-800 ' + inputClass} style={{ textAlign: 'inherit' }}
            />
        </>
        {/* Preview */}
        <EducationView education={inputValue} className="max-w-[25rem] min-w-full md:min-w-[25rem] self-center justify-self-center"></EducationView>
    </UpdatableModal>
}

type EditableProps<T, V, Inputs = string, AditionalProps = unknown> = {
    size?: 12 | 14 | 16 | 18 | 20,
    rounded?: 'rounded-md',
    InputComponent: FC<InputProps<T, V, Inputs, AditionalProps>>,
    inputComponentProps: InputPropsMinimal<T, V, Inputs, AditionalProps>,
    label?: string
};
export const Editable = <T, V, Inputs = string, AditionalProps = unknown>(props: EditableProps<T, V, Inputs, AditionalProps>) => {
    const { size, InputComponent, inputComponentProps, rounded, label } = props;
    const { isMe } = useUserContext();
    const [visible, setVisible] = useState<'edit' | 'input'>();
    if (!isMe) return <></>;
    const saveHandler = (newValue: Inputs) => {
        setVisible(undefined);
    }
    const closeHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        !!e && e.preventDefault();
        setVisible(undefined);
    }
    return (
        <span
            title={label ? label : "Edit"}
            onClick={visible !== 'input' ? (e) => { e.preventDefault(); setVisible('input'); } : undefined}
            onMouseOver={() => visible !== 'input' && setVisible('edit')}
            onMouseLeave={() => visible !== 'input' && setVisible(undefined)}
            className={`${rounded ? rounded : 'rounded-full'} transition-all duration-200 cursor-pointer absolute top-0 left-0 w-full h-full flex items-center justify-center ${visible === 'input' ? 'bg-inherit text-inherit' : ''} ${visible == 'edit' ? 'backdrop-blur-sm border bg-[#00000033]' : ''}`}
        >
            {visible === 'edit' && <FiEdit title="edit" className="text-inherit text-base" size={size || 14}></FiEdit>}
            {visible === 'input' && <InputComponent {...inputComponentProps} label={label} onClose={closeHandler} onSave={saveHandler}></InputComponent>}
        </span>
    )
}