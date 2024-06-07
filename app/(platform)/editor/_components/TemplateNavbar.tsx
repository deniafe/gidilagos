'use client'
import { updateEmailTemplate } from '@/Firebase/template.queries'
import { Logo } from '@/components/global/Logo'
import { Button } from '@/components/ui/button'
import { EmailTemplate } from '@/lib/types'
import { Save } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'sonner'
import { LoadJSONButton } from './LoadJSONButton'
import { Loading } from '@/components/global/Loading'

type Props = {
  data: Partial<EmailTemplate> 
  exportJson: () => Promise<{
      json: any;
      html: string;
  }>
  setJson: Dispatch<SetStateAction<string>>
};

export const TemplateNavbar = ({ data, exportJson, setJson }: Props) => {

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const saveTemplate = async () => {
    setIsLoading(true)
    const { json, html } = await exportJson();
    const jsonData = JSON.stringify(json)
   
    try {
      const templateData = {
        content: jsonData,
      };

      data.id && await updateEmailTemplate(data.id, templateData);
      toast('✅ Template Updated');
      setIsLoading(false)
      return router.push(`/admin/email-templates`)
      
    } catch (error) {
      console.log(error);
      toast('⛔ Oops!', { description: 'Could not update your template' }) 
      setIsLoading(false)
    }
  };

  return (
      <nav className="md:max-w-screen-2xl z-[1] fixed top-0 w-full py-2 px-2 md:px-4 shadow-sm bg-secondary flex items-center md:py-4">
        <div className=" flex items-center gap-x-4">
          <div className="md:flex">
            <Link href="/">
                <Logo />
            </Link>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-x-2">

        <div className="">
        

        </div>

         <LoadJSONButton setJson={setJson} />

        <Button size="sm" onClick={saveTemplate}>
          <Save className='h-4 w-4 mr-2' />
          {isLoading ? <Loading /> : 'Save Template'}
        </Button>
        </div>
      </nav>
  )
}