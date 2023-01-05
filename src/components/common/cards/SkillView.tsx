import { PropsWithChildren } from "react";
import { SkillType } from "../../../types/page.types";

export const SkillView = ({ skill: {label, score}, children, className }: PropsWithChildren<{ skill: SkillType, className?: string }>) => {
    const level = score >=85 ? 'Expert' : score>=50 ? 'Intermediate ' : 'Beginner';
    return (
        <p className={"relative w-full "+className}>
            <span className=" rounded-md px-4 bg-white py-2 flex gap-2 justify-between items-center text-gray-500 font-medium ">
                {label} 
                <span className={`text-[.7rem] font-normal ml-auto rounded-md py-0 px-1.5 ${level==='Intermediate '?'bg-blue-500': level==='Expert'?'bg-green-500':'bg-gray-500'} text-gray-100`}>
                    {level}
                </span>
            </span>
            {children}
        </p>
    );
}