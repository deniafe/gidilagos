'use client'

import { ReactNode } from 'react';
import { useNode } from '@craftjs/core';

interface ContainerComponentProps {
  children: ReactNode;
}

export const ContainerComponent: React.FC<ContainerComponentProps> = ({ children }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div ref={(ref) => { if (ref) connect(drag(ref)); }} >
      {children}
    </div>
  );
};