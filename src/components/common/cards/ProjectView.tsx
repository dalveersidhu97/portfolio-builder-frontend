import { FC, PropsWithChildren, useRef, useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { IoImage } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { Card, ImageSlider, Modal } from "..";
import { Project } from "../../../types/page.types";

export const ProjectView: FC<PropsWithChildren<{ project: Project, className?: string, disableModal?: boolean, detailed?: boolean }>> = ({ project, children, className, disableModal, detailed }) => {
    const [visible, setVisible] = useState<'modal'>();
    const cardRef = useRef(null);
    const divRef = useRef(null);
    const openModal = () => setVisible('modal');
    const imagePlaceholder = (
        <div onClick={openModal} className="w-full aspect-video flex items-center justify-center rounded-md overflow-hidden">
            <IoImage className="h-1/2 w-1/2 text-gray-400"></IoImage>
        </div>
    );
    const title2 = project.images && project.images.length > 0 ? <ImageSlider onClickItem={openModal} images={project.images}></ImageSlider> : imagePlaceholder;
    return <>
        <Card ref={cardRef} onClick={(e) => { if (e.target === cardRef.current) openModal() }} key={project.id} title={title2} className={'shadow-sm border hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden ' + className}>
            <div ref={divRef} className="flex flex-col gap-4 mt-4" onClick={(e) => { if (e.target === divRef.current) openModal() }}>
                <span onClick={openModal} className="font-semibold text-center">{`${project.label}`}</span>
                {(!!project.github || project.deployed) && 
                <div className="flex flex-wrap gap-4 self-center">
                    {!!project.github && <a onClick={e => { e.preventDefault(); window.open(project.github, '_blank') }} href={project.github} target='_blank' className="border-2 hover:border-gray-dark hover:text-gray-dark border-gray-400 text-gray-light font-medium px-4 py-1 text-sm rounded-full flex gap-2 items-center">
                        Github<BiLinkExternal size={14} />
                    </a>}
                    {!!project.deployed && <a onClick={e => { e.preventDefault(); window.open(project.deployed, '_blank') }} href={project.deployed} target='_blank' className="bg-gray-400 hover:bg-gray-dark text-white font-medium px-4 py-1 text-sm rounded-full flex gap-2 items-center">
                        Deployed<BiLinkExternal size={14} />
                    </a>}
                </div>}
                {detailed && <div className="flex flex-wrap gap-3 justify-center">
                    {project.skills.map(skill => skill ? <span className="bg-gray-200 text-xs text-gray-light font-medium px-3 py-1 rounded-full">{skill}</span>:<></>)}
                </div>}
                <p onClick={openModal} className="text-gray-light overflow-hidden truncate text-sm">{project.desc}</p>
                {children}
            </div>
        </Card>
        
        {visible === 'modal' && !disableModal &&
            <button
                onClick={() => setVisible(undefined)}
                className="animate-opacity-slide-down bg-black border-2 border-black absolute top-3 right-1/2 translate-x-1/2 rounded-full px-2 py-1 shadow-light shadow-gray-dark text-white z-[11] text-sm font-semibold hover:bg-white hover:text-black"
            >
                <MdClose size={20}></MdClose>
            </button>
        }
        {visible === 'modal' && !disableModal && 
            <div className="animate-opacity absolute z-[10] top-0 left-0 w-full h-full overflow-auto bg-[#383838c4] py-14 md:px-6 px-2 flex justify-center items-start">
                <div className="w-full">
                    <Card key={project.id} title={title2} className={'m-auto animate-opacity-slide-up bg-white shadow-light border-none hover:shadow-gray-dark transition-all duration-200 cursor-pointer ' + className}>
                        <div className="flex flex-col gap-4 mt-6">
                            {children}
                            <span className="font-bold text-lg text-center">{`${project.label}`}</span>
                            {(!!project.github || project.deployed) && 
                            <div className="flex flex-wrap gap-4 self-center">
                                {!!project.github && <a onClick={e => { e.preventDefault(); window.open(project.github, '_blank') }} href={project.github} target='_blank' className="border-2 hover:border-gray-dark hover:text-gray-dark border-gray-400 text-gray-light font-medium px-4 py-1 text-sm rounded-full flex gap-2 items-center">
                                    Github<BiLinkExternal size={14} />
                                </a>}
                                {!!project.deployed && <a onClick={e => { e.preventDefault(); window.open(project.deployed, '_blank') }} href={project.deployed} target='_blank' className="bg-gray-400 hover:bg-gray-dark text-white font-medium px-4 py-1 text-sm rounded-full flex gap-2 items-center">
                                    Deployed<BiLinkExternal size={14} />
                                </a>}
                            </div>}
                            <div className="flex flex-wrap gap-3">
                                {project.skills.map(skill => skill ? <span className="bg-gray-200 text-xs text-gray-light font-medium px-3 py-1 rounded-full">{skill}</span>:<></>)}
                            </div>
                            <p className="text-gray-light text-sm">{project.desc}</p>
                            <div></div><div></div>
                        </div>
                    </Card>
                </div>
            </div>
        }
        
    </>
}