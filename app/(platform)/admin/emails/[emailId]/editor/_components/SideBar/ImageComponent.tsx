'use client'

import { useNode } from "@craftjs/core";

export const ImageComponent
: React.FC = () => {
  const { connectors: { connect, drag } } = useNode();
  
  return (
    <div ref={(ref) => { if (ref) connect(drag(ref)); }}>
      <img src="/img/davido.jpg" alt="Placeholder" className="w-full" />
    </div>
  );
};
