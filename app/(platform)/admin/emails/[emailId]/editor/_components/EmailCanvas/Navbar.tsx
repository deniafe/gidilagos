import { Logo } from '@/components/global/Logo';
import { ModeToggle } from '@/components/global/ModeToggle';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getOutputCode } from '@/lib/export';
import { useEmailEditor } from '@/providers/email-editor';
import { UserButton, useUser } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useEditor } from '@craftjs/core';
import { Code, Laptop, Redo, Smartphone, Tablet, Undo } from 'lucide-react';
import { useTheme } from "next-themes"
import Link from 'next/link';
import { useState } from 'react';

export const Navbar = () => {
    const [importString, setImportString] = useState('')
    const [output, setOutput] = useState('')
    const [htmlOutput, setHtmlOutput] = useState<string>('');
    const { handleViewChange } = useEmailEditor();
    const { user } = useUser()
    const { theme } = useTheme()
    const { actions, query } = useEditor();
    const { nodes } = useEditor((state) => ({
      nodes: state.nodes,
    }));


  const handleUndo = () => {
    actions.history.undo();
  };

  const handleRedo = () => {
    actions.history.redo();
  };

  const handleExportReact = () => {
    const nodes = query.getSerializedNodes();
    console.log('codeeeeeeeeeeeeeeeeee', nodes)
    // const reactCode = exportToReact(nodes);
    // downloadFile('email.jsx', reactCode);
  };

  // const handleExportHTML = () => {
  //   const nodes = query.getSerializedNodes();
  //   console.log('codeeeeeeeeeeeeeeeeee', nodes)
  //   // const htmlCode = exportToHTML(nodes);
  //   // downloadFile('email.html', htmlCode);
  // };

  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };


  interface NodeType {
    resolvedName: string;
  }
  
  interface NodeProps {
    [key: string]: any;
  }
  
  interface Node {
    type: NodeType;
    props: NodeProps;
    nodes: string[];
  }
  
  interface CraftJson {
    [key: string]: Node;
  }
  
  const handleExportHTML = () => {
    // const nodes = query.node('ROOT');
    const htmlCode = getOutputCode(nodes);
    const { importString, output } = getOutputCode(nodes);
    setImportString(importString)
    setOutput(output)
    console.log('codeeeeeeeeeeeeeeeeee', htmlCode)
    console.log('...........................')
    console.log(nodes)
    // downloadFile('email.html', htmlCode);

    const nodes2 = query.getSerializedNodes();
    console.log('--------------------------------')
    console.log(nodes2)
  }

  return (
    <Dialog>
      <nav className="md:max-w-screen-2xl z-[1] fixed top-0 w-full py-2 px-2 md:px-4 shadow-sm bg-secondary flex justify-between items-center md:py-2">
        <div className=" flex items-center gap-x-4">
          <div className="md:flex">
            <Logo />
          </div>
        </div>
        <div className="flex justify-center space-x-4 text-muted-foreground">
          <Button variant="outline" size="icon" onClick={() => handleViewChange('desktop')}>
            <Laptop className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all"/>
          </Button>
          <Button variant="outline" size="icon" onClick={() => handleViewChange('tablet')}>
            <Tablet className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all"/>
          </Button>
          <Button variant="outline" size="icon" onClick={() => handleViewChange('mobile')}>
            <Smartphone className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all"/>
          </Button>
        </div>
        <div className="flex justify-center items-center space-x-2 pr-6 md:pr-4">
            <Button variant="outline" size="icon" className='h-8 w-8' onClick={() => handleExportHTML()}>
            <DialogTrigger><Code className="h-4 w-4"/></DialogTrigger>
            </Button>
            <Button variant="outline" size="icon" className='h-8 w-8' onClick={() => handleUndo()}>
              <Undo className="h-4 w-4"/>
            </Button>
            <Button variant="outline" size="icon" className='h-8 w-8 mr-8' onClick={() => handleRedo()}>
              <Redo className="h-4 w-4"/>
            </Button>
            {
              user ?
                //  <Button className="" size="icon" variant="outline">
                  <UserButton appearance={{
                      baseTheme: theme === 'dark' ? dark : undefined, 
                      elements: {
                        avatarBox: {height: 30, width: 30}
                      }
                      }}
                    />
                  // </Button>
            
              :
              <Button className="hidden md:inline-block" size="sm" variant="outline" asChild>
                <Link href="/sign-in">
                  Login
                </Link>
              </Button>
            }
          <ModeToggle />
        </div>
        <DialogContent className='w-auto overflow-scroll'>
          <DialogHeader>
            <DialogTitle>Generated Code</DialogTitle>
            <DialogDescription>
              <div>
                <pre>
                  <code>{importString}</code>
                </pre>
                <pre>
                  <code>{output}</code>
                </pre>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </nav>
    </Dialog>
  )
}


