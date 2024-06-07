'use client'

import { Editor } from "@craftjs/core";
import { EditorCanvas } from "./EmailCanvas";
import { Navbar } from "./EmailCanvas/Navbar";
import { Sidebar } from "./SideBar";
import { ButtonComponent } from "./SideBar/ButtonComponent";
import { HeroSection } from "./SideBar/HeroSection";
import { ImageComponent } from "./SideBar/ImageComponent";
import { TextComponent } from "./SideBar/TextComponent";
import {PropertiesPanel} from "./PropertiesPanel";

export const EmailEditor: React.FC = () => {

  return (
    <Editor resolver={{ HeroSection, ImageComponent, TextComponent, ButtonComponent }}>
        <Navbar />
        <main className="flex mt-[5rem]">
            <Sidebar />
            <EditorCanvas />
            <PropertiesPanel />
        </main>
    </Editor>
  );
};




