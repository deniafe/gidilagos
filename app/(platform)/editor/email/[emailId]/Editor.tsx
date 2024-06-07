'use client'

import { ReactElement, useEffect, useRef, useState } from 'react';
import EmailEditor from 'react-email-editor';
import { TemplateNavbar } from '../../_components/TemplateNavbar';
import { Email, EmailTemplate } from '@/lib/types';
import { getEmailTemplateById } from "@/Firebase/template.queries"; // Ensure this import path is correct
import { getEmailById } from '@/Firebase/email.queries';
import { EmailNavbar } from '../../_components/EmailNavbar';


type Props = {
    emailId: string 
  }

export function GidiEmailEditor ({emailId}: Props) {
  const emailEditorRef = useRef<any>();
  const [recipients, setRecipients] = useState<string[]>([]);
  const [data, setData] = useState<Email>({} as Email);

  useEffect(() => {
    const fetchEmail = async () => {
      if (emailId) {
        const { email, error } = await getEmailById(emailId);
        if (email) {
          setData(email);
          // Optionally, you can load the design into the email editor here if needed
          if (emailEditorRef.current) {
            // emailEditorRef.current.editor.loadDesign(template.content); 
            const design = email.json ? JSON.parse(email?.json) : ''
            emailEditorRef?.current?.editor?.loadDesign(design);// Assuming `content` holds the design JSON
          }
        } else {
          console.error(error);
        }
      }
    };

    fetchEmail();
  }, [emailId]);


  const exportHtml = () => {
    emailEditorRef?.current?.editor?.exportHtml((data: { design: any; html: any; }) => {
      const { design, html } = data;
      console.log('exportHtml', html);
      return html
    });
  };

  const exportData = async (): Promise<{ json: any, html: string }> => {
    return new Promise((resolve, reject) => {
      emailEditorRef?.current?.editor?.exportHtml((data: { design: any; html: any; }) => {
        const { design, html } = data;
        resolve({ json: design, html });
      });
    });
  };

  const onLoad = () => {
    // Editor instance is created
    // You can load your template here;
    // const templateJson = { ... }; // Assuming you want to load a default template
    const design = data.json ? JSON.parse(data?.json) : ''
    emailEditorRef?.current?.editor?.loadDesign(design);
  };

  const onReady = () => {
    // Editor is ready
    console.log('onReady');
  };

  return (
    <div>
      <EmailNavbar data={data} setRecipients={setRecipients} exportData={exportData} />
      <div className="mt-12">
        <EmailEditor
          ref={emailEditorRef}
          onLoad={onLoad}
          onReady={onReady}
          style={{ height: '100vh' }}
        />
      </div>
    </div>
  );
}
