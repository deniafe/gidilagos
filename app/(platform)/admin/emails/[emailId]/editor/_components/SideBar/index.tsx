'use client'
import { useEditor, useNode } from '@craftjs/core';
import { HeroSection } from './HeroSection';
import { ImageComponent } from './ImageComponent';
import { TextComponent } from './TextComponent';
import { ButtonComponent } from './ButtonComponent';

export const Sidebar: React.FC = () => {
  const { connectors } = useEditor();

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl mb-4">Components</h2>
      <div className="space-y-2">
        <div ref={(ref) => { if (ref) connectors.create(ref, <HeroSection />)}} className="bg-blue-500 p-2 rounded cursor-pointer">
          Hero Section
        </div>
        <div ref={(ref) => { if (ref) connectors.create(ref, <ImageComponent />)}} className="bg-blue-500 p-2 rounded cursor-pointer">
          Image
        </div>
        <div ref={(ref) => { if (ref) connectors.create(ref, <TextComponent />)}} className="bg-blue-500 p-2 rounded cursor-pointer">
          Text
        </div>
        <div ref={(ref) => { if (ref) connectors.create(ref, <ButtonComponent />)}} className="bg-blue-500 p-2 rounded cursor-pointer">
          Button
        </div>
      </div>
    </div>
  );
};

