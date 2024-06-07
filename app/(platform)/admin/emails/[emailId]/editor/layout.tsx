import EmailEditorProvider from "@/providers/email-editor"
import { Editor } from "@craftjs/core"

function PlatformLayout({children} : {children: React.ReactNode}) {

  return (
    <div className="h-full" >
        <EmailEditorProvider>
          {children}
        </EmailEditorProvider>
    </div>
  )
}

export default PlatformLayout 