'use client'

import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { EmailTemplate } from "@/lib/types";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { getEmailTemplates } from "@/Firebase/template.queries";
import { SkeletonCard } from "@/app/(main)/_components/SkeletonCard";
import { PickTemplateCard } from "./PickTemplateCard";
import { FormLabel } from "@/components/ui/form";

type Props = {
  setTemplate: Dispatch<SetStateAction<EmailTemplate>>
  template: EmailTemplate
};

export const PickEmailTemplateButton = ({ setTemplate, template }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [templates, setTemplates] = useState<EmailTemplate[]>([]);
    const [loading, setLoading] = useState(false);
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
    const [hasMore, setHasMore] = useState(true);

    const pickTemplate = (template: EmailTemplate) => {
      setIsOpen(false)
      setTemplate(template)
    }

    const getTemplates = async (initial = false) => {
      setLoading(true);
      const orgTemplates = await getEmailTemplates(8, initial ? null : lastVisible);
      if (orgTemplates.error) {
        setLoading(false);
        return toast('⛔ Oops!', { description: 'Could not get email templates' });
      }

      const newTemplates: EmailTemplate[] = orgTemplates.templates;
      setTemplates((prevTemplates) => initial ? newTemplates : [...prevTemplates, ...newTemplates]);
      setLastVisible(orgTemplates.lastVisible);
      setHasMore(newTemplates.length > 0);
      setLoading(false);
    };

    useEffect(() => {
      getTemplates(true);
    }, []);

    const handleShowMore = () => {
      if (hasMore) {
        getTemplates();
      }
    };

  return (
    <div> 
        <div className='cursor-pointer' onClick={() =>  setIsOpen(true)}>
          <FormLabel>Pick Email Template</FormLabel>
          <Image
            height={100}
            width={100}
            className={`rounded pt-2 w-full h-[14rem] object-cover ${!template.previewImage && 'opacity-50'}`}
            src={template.previewImage || `/img/default.png`}
            alt="Email Template Preview"
          />
        </div>
        <Dialog
        open={isOpen}
        onOpenChange={(isOpen) => !isOpen &&  setIsOpen(false)}
      >
        <DialogContent className="sm:w-[500px] md:w-[900px] h-[90vh] overflow-scroll">
          <DialogHeader>
            <DialogTitle className="text-center pt-4">Pick Email Template</DialogTitle>

            <DialogDescription className="text-center py-8">
              Pick an email template to start with
            </DialogDescription>

            {/* <div className="flex flex-col items-center gap-4 p-4 lg:gap-6 lg:p-6 min-h-screen w-full"> */}

              {!!templates.length && (
                <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4 w-full max-w-4xl">
                  {templates.map((template) => (
                    <div className="flex justify-center md:justify-start mb-4" key={template.id}>
                      <PickTemplateCard template={template} pickTemplate={pickTemplate} />
                    </div>
                  ))}
                </div>
              )}

              {!templates.length && !loading && (
                <div className="flex flex-1 items-center justify-center w-full max-w-4xl">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold tracking-tight">No Templates</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      There are no email templates available.
                    </p>
                  </div>
                </div>
              )}

              {loading && (
                <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4 w-full max-w-4xl">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
              )}

              {!!templates.length && (
                <div className="flex justify-center mt-8 w-full max-w-4xl">
                  <Button variant={'ghost'} size={'sm'} onClick={handleShowMore} disabled={loading || !hasMore}>
                    <div>See More</div>
                  </Button>
                </div>
              )}
            {/* </div> */}

          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
