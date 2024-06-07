import MediaProvider from '@/providers/media-provider'

function PlatformLayout({children} : {children: React.ReactNode}) {

  return (
    <div className="h-full" >
      <MediaProvider>
        {children}
      </MediaProvider>
    </div>
  )
}

export default PlatformLayout 