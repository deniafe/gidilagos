
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { EmailTemplate } from '@/lib/types';
import { truncateString } from '@/lib/utils';

interface Props {
  template: EmailTemplate;
  pickTemplate: (template: EmailTemplate) => void
}

export const PickTemplateCard: React.FC<Props> = ({ template, pickTemplate }) => {

  return (
      <div
        onClick={() => {pickTemplate(template)}}
        className="block cursor-pointer rounded w-[15rem] bg-muted transition-shadow shadow-sm hover:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_2px_15px_-3px_rgba(249,249,249,0.07),0_10px_20px_-2px_rgba(249,249,249,0.04)]"
      >
        <div className="relative overflow-hidden bg-cover bg-no-repeat">
          <Image
            height={120}
            width={200}
            className="rounded-t w-full h-40 object-cover"
            src={template.previewImage || '/default-template-image.jpg'} // Add a default image if previewImage is not provided
            alt="Email Template Preview"
          />
        </div>
        <div className="px-3 py-2">
          <h5 className="mb-2 text-lg">
            {truncateString(template.name, 25)}
          </h5>
        </div>
      </div>
  );
};
