import { PropsWithChildren } from "react";
import { BiEdit } from "react-icons/bi";
import { useUpdatePage } from "../../apolloClient";
import { useUserContext } from "../../store/context/UserProvider";
import { Page } from "../../types/page.types";
import { TitleH2 } from "../common";
import { Editable, InputDialog } from "../Editable";

type PageName = 'Skills' | 'About' | 'Education' | 'Experience';
type PageHeaderProps<T> = PropsWithChildren<{ page?: Page, pageName: PageName, onUpdateQuery: (page: Page) => any }>;

export const CreatePage = ({ pageName, onPageCreated }: {pageName: PageName, onPageCreated: (page:Page)=>any|void}) => {
    const { isMe } = useUserContext();
    const [createPage, { loading, error }] = useUpdatePage({
        onCompleted(data, clientOptions) {
            if(data.pageResult?.success && data.pageResult.page) 
                onPageCreated(data.pageResult.page);
        },
    });
    return <>
        {isMe && <div className="w-full h-full flex justify-center items-center">
            <button 
                onClick={() => { createPage({ variables: { pageName: pageName.toLocaleLowerCase(), pageAttributes: { name: pageName.toLocaleLowerCase(), summary: '', title: '' } } }) }} 
                className="border px-8 py-4 rounded-md m-auto flex items-center gap-4 text-gray-dark font-medium hover:bg-gray-100"
            >
                <BiEdit size={20}></BiEdit> {loading ? 'Creating': 'Create'} {pageName} Page
            </button>
        </div>}
    </>;
}

export const PageHeader = function <T>({ page, pageName, onUpdateQuery }: PageHeaderProps<T>) {
    const { isMe } = useUserContext();
    return (
        <>
            {(!!page?.title || !!page?.summary || isMe) && <div className="flex flex-col gap-4">
                {(!!page?.title || isMe) && <TitleH2 className="relative w-fit">
                    {page?.title || (isMe ? 'Add a Title' : '')}
                    <Editable
                        rounded="rounded-md"
                        InputComponent={InputDialog}
                        label={`Update ${pageName} Title`}
                        inputComponentProps={{
                            placeholder: "Title",
                            value: page?.title,
                            useUpdate: useUpdatePage,
                            makeVariables: (title) => ({ pageName: pageName.toLocaleLowerCase(), pageAttributes: { name: pageName.toLocaleLowerCase(), title } }),
                            decideSuccess: (data) => {
                                const isSuccess = !!data.pageResult?.success;
                                const newPage = data.pageResult?.page;
                                if (isSuccess && newPage) { onUpdateQuery(newPage) }
                                return { isSuccess, newValue: newPage?.title }
                            }
                        }}
                    />
                </TitleH2>}
                {(!!page?.summary || isMe) && <p className="relative w-fit">
                    {page?.summary || (isMe ? 'Add a summary' : '')}
                    <Editable
                        rounded="rounded-md"
                        InputComponent={InputDialog}
                        label={`Update ${pageName} Summary`}
                        inputComponentProps={{
                            placeholder: "Summary",
                            type: 'textarea',
                            value: page?.summary,
                            inputClass: 'min-h-[10rem]',
                            dialogClass: 'w-full md:w-auto md:min-w-[40rem]',
                            useUpdate: useUpdatePage,
                            makeVariables: (summary) => ({ pageName: pageName.toLocaleLowerCase(), pageAttributes: { name: pageName.toLocaleLowerCase(), summary } }),
                            decideSuccess: (data) => {
                                const isSuccess = !!data.pageResult?.success;
                                const newPage = data.pageResult?.page;
                                if (isSuccess && newPage) { onUpdateQuery(newPage) }
                                return { isSuccess, newValue: newPage?.summary }
                            }
                        }}
                    />
                </p>}
            </div>}
        </>
    )
}