import { FC, PropsWithChildren } from "react";
import { FaBuilding, FaGraduationCap, FaUniversity } from "react-icons/fa";
import { GiDuration } from "react-icons/gi";
import { GrScorecard } from "react-icons/gr";
import { MdAccessTimeFilled } from "react-icons/md";
import { Card } from ".";
import { Icon } from "..";
import { Education } from "../../../types/page.types";

export const Pill: FC<PropsWithChildren<{}>> = ({ children }) => {
    return <div className="flex gap-2 items-center px-3 py-0.5 bg-gray-200 text-sm text-gray-dark rounded-full">
        {children}
    </div>
}

export const EducationView: FC<PropsWithChildren<{ education: Education, className?: string }>> = ({ education, children, className }) => {
    const title = (
        <p>
            <span className="font-semibold">{`${education.course}`}</span>
        </p>
    );
    const icon = Icon({ name: 'FaBook', size: 26 });
    return <Card key={education.id} title={title} Icon={icon} className={className}>
        <div className="flex flex-col gap-4 mt-1">
            <div className="flex flex-wrap gap-3">
                <Pill><FaGraduationCap size={18} /><span>{education.level}</span></Pill>
            </div>
            <div className="flex flex-wrap gap-3">
                <Pill><FaUniversity size={14} />{education.institute}</Pill>
                <Pill><FaBuilding size={14} />{education.campus}</Pill>
            </div>
            <div className="flex flex-wrap gap-3">
                <Pill><GrScorecard size={14} />GPA {education.gpa}</Pill>
                <Pill><GiDuration size={16} /><span>{education.duration}</span></Pill>
            </div>
            <div className="flex flex-wrap gap-3">
                <Pill><MdAccessTimeFilled size={16} />{education.startDate}</Pill>
                <Pill>to</Pill>
                <Pill><MdAccessTimeFilled size={16} />{education.endDate}</Pill>
            </div>
        </div>
        {children}
    </Card>
}