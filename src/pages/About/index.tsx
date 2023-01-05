import { FC } from "react";
import { useAddOrUpdateAboutArticle, useAddOrUpdateAboutSection } from "../../apolloClient";
import { useAboutPageQuery } from "../../apolloClient/queries/about";
import { AboutArticleView, Card, CardGroup, CreatePage, Editable, Icon, InputAboutArticle, InputDialog, PageHeader, TitleH2 } from "../../components";
import { useUserContext } from "../../store/context/UserProvider";

export const AboutPage: FC = () => {
  const { user, isMe } = useUserContext();
  const { data, loading, error, refetch, updateQuery } = useAboutPageQuery({ userId: user!.id });

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  const aboutPage = data?.aboutPage;

  if (!aboutPage) return <CreatePage pageName="About" onPageCreated={(page) => refetch()}></CreatePage>;

  return (
    <div data-testid="AboutPage" className="flex flex-col gap-8">
      <PageHeader
        page={aboutPage}
        pageName="About"
        onUpdateQuery={(newPage) => {
          updateQuery(({ aboutPage }) => ({ aboutPage: { ...aboutPage!, ...newPage } }));
          refetch();
        }}
      />
      <div className="flex flex-col gap-6">
        {aboutPage?.sections && aboutPage?.sections.length > 0 && aboutPage?.sections.map(section => <div key={section.id} className="flex flex-col gap-6">
          <TitleH2 className="relative w-fit">
            {section.name || (isMe ? 'Add section title' : '')}
            <Editable
              rounded="rounded-md"
              InputComponent={InputDialog}
              label={'Update section title'}
              inputComponentProps={{
                placeholder: "Section title",
                value: section.name,
                useUpdate: useAddOrUpdateAboutSection,
                makeVariables: (name) => ({ aboutSection: { name, id: section.id } }),
                decideSuccess: (data) => {
                  const isSuccess = !!data.addOrUpdateAboutSection?.success
                  const newSection = data.addOrUpdateAboutSection?.section
                  const newSections = aboutPage?.sections.map(sec => (sec.id === section.id ? { ...section, name: newSection!.name } : sec));
                  if (isSuccess) {
                    updateQuery(({ aboutPage }) => ({
                      aboutPage: {
                        ...aboutPage!,
                        sections: newSections
                      }
                    }))
                  }
                  refetch()
                  return { isSuccess, newValue: newSection?.name }
                }
              }}
            />
          </TitleH2>
          <CardGroup>{section.articles && section.articles.length > 0 && <>
            {section.articles.map(article => {
              return <AboutArticleView key={article.id} article={article}>
                <Editable
                  rounded="rounded-md"
                  InputComponent={InputAboutArticle}
                  label="Update article"
                  inputComponentProps={{
                    value: { content: article.content, icon: article.icon as any, id: article.id, label: article.label, sectionId: article.sectionId },
                    useUpdate: useAddOrUpdateAboutArticle,
                    makeVariables: (articleInput) => ({ article: { ...articleInput, id: article.id }, sectionId: section.id }),
                    decideSuccess: (data) => {
                      const isSuccess = !!data.addOrUpdateAboutArticle?.success;
                      const newValue = data.addOrUpdateAboutArticle?.article!;
                      if (isSuccess) {
                        const newArticle = data.addOrUpdateAboutArticle?.article!;
                        updateQuery(({ aboutPage }) => {
                          const sections = [...(aboutPage?.sections || [])];
                          const newSections = sections.map(sec => {
                            if (sec.id === section.id) {
                              const arts = sec.articles.map(art => {
                                const adition = art.id === newArticle?.id ? { ...newArticle } : {};
                                return { ...art, ...adition };
                              })
                              if (!arts.find(art => art.id === newArticle.id)) arts.push(newArticle);
                              return { ...sec, articles: arts }
                            }
                            return sec;
                          })
                          return { aboutPage: { ...aboutPage!, sections: newSections } }
                        });
                      }
                      return { isSuccess, newValue }
                    }
                  }}
                />
              </AboutArticleView>
            })}
          </>}
            {isMe && <Card title={''} className='relative'>
              <div className="w-full h-full flex items-center justify-center">Add an article</div>
              <Editable
                rounded="rounded-md"
                InputComponent={InputAboutArticle}
                label="Add article"
                inputComponentProps={{
                  value: { sectionId: section.id } as any,
                  useUpdate: useAddOrUpdateAboutArticle,
                  makeVariables: (articleInput) => ({ article: articleInput, sectionId: section.id }),
                  decideSuccess: (data) => {
                    const isSuccess = !!data.addOrUpdateAboutArticle?.success;
                    const newValue = data.addOrUpdateAboutArticle?.article;
                    if (isSuccess) {
                      const newArticle = data.addOrUpdateAboutArticle?.article!;
                      updateQuery(({ aboutPage }) => {
                        const sections = [...(aboutPage?.sections || [])];
                        const newSections = sections.map(sec => {
                          if (sec.id === section.id) {
                            const arts = sec.articles.map(art => {
                              const adition = art.id === newArticle?.id ? { ...newArticle } : {};
                              return { ...art, ...adition };
                            })
                            if (!arts.find(art => art.id === newArticle.id)) arts.push(newArticle);
                            return { ...sec, articles: arts }
                          }
                          return sec;
                        })
                        return { aboutPage: { ...aboutPage!, sections: newSections } }
                      });
                    }
                    return { isSuccess, newValue }
                  }
                }}
              />
            </Card>}
          </CardGroup>
        </div>)}
        {isMe && <TitleH2 className="relative w-fit font-semibold">
          Add a section
          <Editable
            rounded="rounded-md"
            InputComponent={InputDialog}
            label={'Add section'}
            inputComponentProps={{
              placeholder: "Section title",
              value: '',
              useUpdate: useAddOrUpdateAboutSection,
              makeVariables: (name) => ({ aboutSection: { name } }),
              decideSuccess: (data) => {
                const isSuccess = !!data.addOrUpdateAboutSection?.success
                const newSection = data.addOrUpdateAboutSection?.section
                if (isSuccess) {
                  const newSections = aboutPage?.sections.map(sec => (sec.id === newSection!.id ? { ...sec, name: newSection!.name } : sec)) || [];
                  if (!!newSections?.find(sec => sec.id === newSection?.id)) newSections.push({ ...newSection!, articles: [] });
                  updateQuery(({ aboutPage }) => ({
                    aboutPage: {
                      ...aboutPage!,
                      sections: newSections
                    }
                  }))
                }
                refetch()
                return { isSuccess, newValue: newSection?.name }
              }
            }}
          />
        </TitleH2>}
      </div>
    </div>
  );
};
