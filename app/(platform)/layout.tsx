import MediaProvider from '@/providers/media-provider'
import ModalProvider from '@/providers/modal-provider'

function PlatformLayout({children} : {children: React.ReactNode}) {

  return (
    <div className="h-full" >
      <ModalProvider>
        <MediaProvider>
          {children}
        </MediaProvider>
      </ModalProvider>
    </div>
  )
}

export default PlatformLayout 