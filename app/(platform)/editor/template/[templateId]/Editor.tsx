'use client'

import { ReactElement, useEffect, useRef, useState } from 'react';
import EmailEditor from 'react-email-editor';
import { TemplateNavbar } from '../../_components/TemplateNavbar';
import { EmailTemplate } from '@/lib/types';
import { getEmailTemplateById } from "@/Firebase/template.queries"; // Ensure this import path is correct


type Props = {
    templateId: string 
  }

export function TemplateEditor ({templateId}: Props) {
  const emailEditorRef = useRef<any>();
  const [json, setJson] = useState('');
  const [data, setData] = useState<EmailTemplate>({} as EmailTemplate);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (templateId) {
        const { template, error } = await getEmailTemplateById(templateId as string);
        if (template) {
          setData(template);
          // Optionally, you can load the design into the email editor here if needed
          if (emailEditorRef.current) {
            // emailEditorRef.current.editor.loadDesign(template.content); 
            const design = template.content ? JSON.parse(template?.content) : ''
            emailEditorRef?.current?.editor?.loadDesign(design);// Assuming `content` holds the design JSON
          }
        } else {
          console.error(error);
        }
      }
    };

    fetchTemplate();
  }, [templateId]);

//   // Function to inject CSS into iframe (as per the commented section in your code)
//   useEffect(() => {
//     window.alert(json)
//     // Function to inject CSS into iframe
//     emailEditorRef?.current?.editor?.loadDesign(json);
//   }, [json]);

  useEffect(() => {
    if (json) {
      try {
        const design = JSON.parse(json);
        if (emailEditorRef.current) {
          emailEditorRef.current.editor.loadDesign(design);
        }
      } catch (e) {
        console.error("Invalid JSON", e);
      }
    }
  }, [json]);

  const exportHtml = () => {
    emailEditorRef?.current?.editor?.exportHtml((data: { design: any; html: any; }) => {
      const { design, html } = data;
      console.log('exportHtml', html);
    });
  };

  const exportJson = async (): Promise<{ json: any, html: string }> => {
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
    const design = data.content ? JSON.parse(data?.content) : ''
    emailEditorRef?.current?.editor?.loadDesign(design);
  };

  const onReady = () => {
    // Editor is ready
    console.log('onReady');
  };

  return (
    <div>
      <TemplateNavbar data={data} exportJson={exportJson} setJson={setJson} />
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
