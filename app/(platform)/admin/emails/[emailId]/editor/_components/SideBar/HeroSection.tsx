'use client';

import React from 'react';
import { Element, useNode } from "@craftjs/core";
import { TextComponent } from './TextComponent';

export const HeroSection = () => {

  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
    props: { height, border, text, color, fontSize, fontWeight, backgroundColor, fontFamily, textAlign },
  } = useNode((node) => ({
    selected: node.events.selected,
    props: node.data.props,
  }));

  return (
    <div ref={ref => { if (ref) connect(drag(ref)) }} style={{ height, border, color, backgroundColor, fontFamily, fontSize, fontWeight, textAlign }}>
      <Element id="hero" is="div" canvas>
        <TextComponent />
      </Element>
    </div>
  );
};

HeroSection.craft = {
  name: 'div',
  props: {
    height: '50px',
    border: 'solid 1px grey',
    text: 'Edit me!',
    color: '#000000',
    fontSize: '16px',
    fontWeight: 'normal',
    backgroundColor: 'sky-blue',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'left',
  },
  rules: {
    canDrop: () => true,
    canDrag: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true
  },
};