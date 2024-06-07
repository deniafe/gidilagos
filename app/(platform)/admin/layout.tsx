import MediaProvider from '@/providers/media-provider'
import { Sidebar } from './_components/Sidebar'
import { Navbar } from '@/app/(main)/_components/Navbar'

function PlatformLayout({children} : {children: React.ReactNode}) {

  return (
    <div className="h-full" >
        <Navbar />
        <div className="pt-20 md:pt-24 mx-auto">
        <div className="flex gap-x-7">
            <div className="w-64 shrink-0 hidden md:block">
            <Sidebar />
            </div>
            {children}
        </div>
        </div>
  </div>
  )
}

export default PlatformLayout 