'use client'

import { useNode } from '@craftjs/core';

interface TextComponentProps {
  text: string;
}

export const TextComponent: React.FC<TextComponentProps> = ({ text }) => {
    const { connectors: { connect, drag } } = useNode();
  
    return (
      <div ref={(ref) => { if (ref) connect(drag(ref)); }}>
        {text}
      </div>
    );
  };


  
