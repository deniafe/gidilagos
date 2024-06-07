import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { EmailTemplate } from '@/lib/types';
import { formatDate, truncateString } from '@/lib/utils';
import { Code, Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'// Make sure to implement this action
import { toast } from 'sonner';
import { deleteEmailTemplate } from '@/Firebase/template.queries';
import { CreateEmailTemplateButton } from './CreateEmailTemplateButton';
import { useRouter } from 'next/navigation';

interface Props {
  template: EmailTemplate;
  delTemplate: (templateId: string) => void;
}

export const EmailTemplateCard: React.FC<Props> = ({ template, delTemplate }) => {
  const [deletingTemplate, setDeletingTemplate] = useState(false);
  const router = useRouter()

  const handleDeleteTemplate = async () => {
    if (!template?.id) return;
    setDeletingTemplate(true);
    try {
      const response = await deleteEmailTemplate(template.id);
      toast('✅ Deleted Template', {
        description: 'Email template deleted successfully',
      });
      setDeletingTemplate(false);
      delTemplate(template.id);
    } catch (error) {
      console.log(error);
      toast('⛔ Oops!', {
        description: 'Could not delete the email template',
      });
      setDeletingTemplate(false);
    }
  };

  return (
    <AlertDialog>
      <div
        className="block cursor-pointer rounded w-[17rem] bg-muted transition-shadow shadow-sm hover:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_2px_15px_-3px_rgba(249,249,249,0.07),0_10px_20px_-2px_rgba(249,249,249,0.04)]"
      >
        <div className="relative overflow-hidden bg-cover bg-no-repeat" data-te-ripple-init data-te-ripple-color="light">
          <Image
            height={50}
            width={300}
            className="rounded-t w-full h-32 object-cover"
            src={template.previewImage || '/default-template-image.jpg'} // Add a default image if previewImage is not provided
            alt="Email Template Preview"
          />
          <a href="#!">
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
          </a>
        </div>
        <div className="px-3 py-8">
          <h5 className="mb-2 text-lg font-bold leading-tight">
            {truncateString(template.name, 25)}
          </h5>
          <p className="mb-1 text-xs font-bold text-muted-foreground">
            Created At: {formatDate(template.createdAt)}
          </p>
          <div className="flex justify-between my-4">
            <div className="flex justify-end"> 
               <CreateEmailTemplateButton data={template} update />
               <Button className='ml-2' variant={'outline'} size={'icon'} onClick={() =>  router.push(`/editor/template/${template.id}`)}>
                  <Code className='h-[1rem] w-[1rem]'/>
                </Button> 
              <Button size={'icon'} variant={'outline'} className='ml-2'>
                <AlertDialogTrigger>
                  <Trash className='h-[1rem] w-[1rem] text-destructive' />
                </AlertDialogTrigger>
              </Button>
             
            </div>
          </div>
        </div>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-left">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              This action cannot be undone. This will permanently delete the email template.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-center">
            <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deletingTemplate}
              className="bg-destructive hover:bg-destructive"
              onClick={handleDeleteTemplate}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </div>
    </AlertDialog>
  );
};
