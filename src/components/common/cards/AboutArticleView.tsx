import { PropsWithChildren } from "react";
import { Card, Icon } from "..";
import { AboutArticleType } from "../../../types/page.types";

export const AboutArticleView = ({ children, article, className,withIconError }: PropsWithChildren<{ article: AboutArticleType, className?: string, withIconError?: boolean }>) => {
    const title = (
        <p>
            {article.label && <><span className={"font-semibold "}>{`${article.label} -  `}</span></>}
            {article.content}
        </p>
    );
    const icon = !!article.icon ? Icon({ name: article.icon as any, size: 26, withError: withIconError }) : undefined;
    return <Card key={article.id} title={title} Icon={icon} className={'relative '+className}>
        {children}
    </Card>
}