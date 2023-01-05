import { FC, PropsWithChildren } from "react";
import { Card, Icon } from "..";
import { Work } from "../../../types/page.types";

export const WorkView: FC<PropsWithChildren<{ work: Work, className?: string }>> = ({ work, children, className }) => {
    const title = (
        <p className="flex flex-wrap gap-2">
            {work.role && <span className="font-medium">{`${work.role}`}</span>}
            <span className="text-gray-500 text-sm">
                {work.type?` - ${work.type} `:''} {work.duration ? `(${work.duration})`:''}
            </span>
        </p>
    );
    const icon = !!work.icon ? Icon({ name: work.icon as any, size: 26 }) : undefined;
    return (
        <Card title={title} Icon={icon} className={className}>
            <div className="flex gap-2 flex-wrap items-center text-gray-light text-sm">
                <span className="font-medium">
                    {work.company? `${work.company}`: ''}
                </span> 
                {work.address && <address> {work.address}</address>}
            </div>
            {work.duties.length > 0 && <ul className="list-inside list-disc text-sm text-gray-dark leading-relaxed">
                {work.duties.map((duty, index) => <li key={duty+index}>{duty}</li>)}
            </ul>}
            {children}
        </Card>
    );
}