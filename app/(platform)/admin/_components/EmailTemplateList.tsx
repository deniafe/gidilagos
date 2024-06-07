'use client'
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { EmailTemplate } from '@/lib/types';
import { getEmailTemplates } from "@/Firebase/template.queries"; // Make sure to implement this function
import { toast } from "sonner";
import { SkeletonCard } from "@/app/(main)/_components/SkeletonCard";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { EmailTemplateCard } from "./EmailTemplateCard"; // Make sure to implement this component
import { CreateEmailTemplateButton } from "./CreateEmailTemplateButton";

export const EmailTemplateList = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

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

  const delTemplate = (templateId: string) => {
    setTemplates((prevTemplates) => prevTemplates.filter(template => template.id !== templateId));
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 lg:gap-6 lg:p-6 min-h-screen w-full">
      <div className="flex justify-between w-full max-w-4xl mb-8">
        <h1 className="text-lg font-semibold md:text-2xl">Email Templates</h1>
        <CreateEmailTemplateButton />
      </div>

      {!!templates.length && (
        <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl">
          {templates.map((template) => (
            <div className="flex justify-center md:justify-start mb-4" key={template.id}>
              <EmailTemplateCard template={template} delTemplate={delTemplate} />
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
        <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl">
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
    </div>
  );
};
