'use client'

import { Logo } from '@/components/global/Logo'
import { Button } from '@/components/ui/button'
import { Email } from '@/lib/types'
import { Mail, Save } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'sonner'
import { Loading } from '@/components/global/Loading'
import { updateEmail } from '@/Firebase/email.queries'
import { SendTestEmail } from './SendTestEmail'
import { SendToSubscribers } from './SendToSubscribers'

type Props = {
  data: Partial<Email>
  exportData: () => Promise<{
      json: any;
      html: string;
  }>
  setRecipients: Dispatch<SetStateAction<string[]>>
};

export const EmailNavbar = ({ data, exportData, setRecipients }: Props) => {

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const saveEmail = async () => {
    setIsLoading(true)
    const { json, html } = await exportData();
    const jsonData = JSON.stringify(json)
    try {
      const emailData = {
        content: html,
        json: jsonData,
      };

      data.id && await updateEmail(data.id, emailData);
      toast('✅ Email Draft Updated')
      setIsLoading(false)
      return router.push(`/admin/emails`)
      
    } catch (error) {
      console.log(error);
      toast('⛔ Oops!', { description: 'Could not update your email draft' })
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

         <SendTestEmail setRecipients={setRecipients} exportData={exportData} />

        <Button size="sm" variant={'outline'} onClick={saveEmail}>
          <Save className='h-4 w-4 mr-2' />
          {isLoading ? <Loading /> : 'Save Draft'}
        </Button>

        {/* <Button size="sm" onClick={saveEmail}>
          <Mail className='h-4 w-4 mr-2' />
          {isLoading ? <Loading /> : 'Send Email To Subscribers'}
        </Button> */}
        <SendToSubscribers exportData={exportData} saveEmail={saveEmail} />
        </div>
      </nav>
  )
}