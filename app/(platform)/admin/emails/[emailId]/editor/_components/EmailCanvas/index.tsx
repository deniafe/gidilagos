import { Editor, Frame, Element } from '@craftjs/core';
import { useEmailEditor } from '@/providers/email-editor';

export const EditorCanvas: React.FC = () => {
  const { view } = useEmailEditor();

  const canvasClasses = {
    desktop: 'w-full',
    tablet: 'w-3/5',
    mobile: 'w-1/3',
  };

  return (
      <div className={`transition-width duration-300 ease-in-out mx-auto ${canvasClasses[view]}`}>
        <div className="bg-gray-50 min-h-screen p-4 border-2 border-dashed border-gray-300 dark:bg-card">
            <Frame>
            <Element id="ROOT" is="div" canvas>
            </Element>
            </Frame>
         </div>
       </div>
  );
};
