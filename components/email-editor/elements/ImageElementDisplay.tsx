// components/email-editor/elements/ImageElementDisplay.tsx
import { ImageEmailElement } from "@/lib/types/email-editor.types";
import React from "react";
import NextImage from "next/image"; // Using Next.js Image for potential optimization, though for email HTML direct <img> is fine

interface ImageElementDisplayProps {
  element: ImageEmailElement;
}

export default function ImageElementDisplay({ element }: ImageElementDisplayProps) {
  const { src, alt, href } = element.props;
  const { style } = element;

  const imgStyle: React.CSSProperties = {
    maxWidth: style.width || "100%", // Default to 100% width of container
    height: style.height || "auto",
    display: "block", // To handle alignment and prevent extra space
    margin: style.textAlign === 'center' ? '0 auto' : (style.textAlign === 'right' ? '0 0 0 auto' : '0'),
  };

  const wrapperStyle: React.CSSProperties = {
    paddingTop: style.paddingTop || "0px",
    paddingBottom: style.paddingBottom || "0px",
    paddingLeft: style.paddingLeft || "0px",
    paddingRight: style.paddingRight || "0px",
    marginTop: style.marginTop || "0px",
    marginBottom: style.marginBottom || "0px",
    backgroundColor: style.backgroundColor,
    textAlign: style.textAlign || "left", // for the block container
  };

  const imageNode = (
    // Using a regular <img> tag for simplicity in email context,
    // as Next/Image optimizations might not translate well to email clients.
    // However, for preview within the editor, Next/Image can be fine.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src || "https://placehold.co/600x100?text=Image"}
      alt={alt || "Email image"}
      style={imgStyle}
      width={parseInt(style.width || "600")} // HTML width attribute for better email client compatibility
      // height attribute can also be set if style.height is fixed
    />
  );

  return (
    <div style={wrapperStyle}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'inline-block' }}>
          {imageNode}
        </a>
      ) : (
        imageNode
      )}
    </div>
  );
}