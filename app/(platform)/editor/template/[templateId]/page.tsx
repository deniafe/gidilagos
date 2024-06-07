import { TemplateEditor } from "./Editor";


type Props = {
  params: { templateId: string };
};

async function Page({ params }: Props) {  

  const {templateId} = params

  return (
   <TemplateEditor templateId={templateId} />
  )
}

export default Page