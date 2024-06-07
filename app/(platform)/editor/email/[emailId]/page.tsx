import { GidiEmailEditor } from "./Editor";


type Props = {
  params: { emailId: string };
};

async function Page({ params }: Props) {  

  const {emailId} = params

  return (
   <GidiEmailEditor emailId={emailId} />
  )
}

export default Page