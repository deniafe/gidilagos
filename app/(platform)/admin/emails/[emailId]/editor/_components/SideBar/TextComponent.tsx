'use client'

import { useNode } from '@craftjs/core';
import React from 'react';

export const TextComponent = () => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
    props: {
      text, color, fontSize, fontWeight, backgroundColor, fontFamily, textAlign,
      lineHeight, textDecoration, textTransform, letterSpacing, wordSpacing,
      fontStyle, textShadow, whiteSpace, overflowWrap, direction, textIndent,
      unicodeBidi, verticalAlign, writingMode, hyphens, textOverflow, textRendering,
      wordBreak, tabSize, quotes, orphans, widows, fontSynthesis
    },
  } = useNode((node) => ({
    selected: node.events.selected,
    props: node.data.props,
  }));

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)) }}
      style={{
        color, backgroundColor, fontFamily, fontSize, fontWeight, textAlign,
        lineHeight, textDecoration, textTransform, letterSpacing, wordSpacing,
        fontStyle, textShadow, whiteSpace, overflowWrap, direction, textIndent,
        unicodeBidi, verticalAlign, writingMode, hyphens, textOverflow, textRendering,
        wordBreak, tabSize, quotes, orphans, widows, fontSynthesis
      }}
    >
      <p
        contentEditable={selected}
        onInput={(e) =>
          setProp((props: { text: string; }) => (props.text = (e.target as HTMLElement).innerText))
        }
      >
        {text}
      </p>
    </div>
  );
};

TextComponent.craft = {
  name: 'p',
  props: {
    text: 'Edit me!',
    color: '#000000',
    fontSize: '16px',
    fontWeight: 'normal',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'left',
    lineHeight: '1.5',
    textDecoration: 'none',
    textTransform: 'none',
    letterSpacing: 'normal',
    wordSpacing: 'normal',
    fontStyle: 'normal',
    textShadow: 'none',
    whiteSpace: 'normal',
    overflowWrap: 'normal',
    direction: 'ltr',
    textIndent: '0px',
    unicodeBidi: 'normal',
    verticalAlign: 'baseline',
    writingMode: 'horizontal-tb',
    hyphens: 'none',
    textOverflow: 'clip',
    textRendering: 'auto',
    wordBreak: 'normal',
    tabSize: '8',
    quotes: 'auto',
    orphans: '2',
    widows: '2',
    fontSynthesis: 'none',
  },
};
