// components/email-editor/elements/ButtonElementDisplay.tsx
import { ButtonEmailElement } from "@/lib/types/email-editor.types";
import React from "react";

interface ButtonElementDisplayProps {
  element: ButtonEmailElement;
}

export default function ButtonElementDisplay({ element }: ButtonElementDisplayProps) {
  const { text, href } = element.props;
  const { style } = element;

  // Styles for the <a> tag which will be styled like a button
  // Important for email client compatibility
  const buttonStyles: React.CSSProperties = {
    display: "inline-block", // Or 'block' if width is 100%
    backgroundColor: style.backgroundColor || "#007bff",
    color: style.color || "#ffffff",
    fontFamily: style.fontFamily || "Arial, sans-serif",
    fontSize: style.fontSize || "16px",
    fontWeight: style.fontWeight || "normal",
    paddingTop: style.padding?.split(" ")[0] || style.paddingTop || "10px",
    paddingRight: style.padding?.split(" ")[1] || style.paddingRight || "20px",
    paddingBottom: style.padding?.split(" ")[2] || style.padding?.split(" ")[0] || style.paddingBottom || "10px",
    paddingLeft: style.padding?.split(" ")[3] || style.padding?.split(" ")[1] || style.paddingLeft || "20px",
    borderRadius: style.borderRadius || "5px",
    border: style.border || "none",
    textDecoration: "none",
    width: style.width === '100%' ? '100%' : 'auto', // Full width buttons are common
    boxSizing: 'border-box', // Important for full width buttons with padding
    textAlign: "center", // Text align on the button itself
  };
  
  // Styles for the wrapper div, controlling alignment of the button block
  const wrapperStyle: React.CSSProperties = {
    paddingTop: style.paddingTop || "0px",
    paddingBottom: style.paddingBottom || "0px",
    paddingLeft: style.paddingLeft || "0px",
    paddingRight: style.paddingRight || "0px",
    marginTop: style.marginTop || "0px",
    marginBottom: style.marginBottom || "0px",
    backgroundColor: style.backgroundColor && style.width !== '100%' ? style.backgroundColor : 'transparent', // Only apply if button is not full width block
    textAlign: style.textAlign || "left", // This aligns the button block
  };


  return (
    <div style={wrapperStyle}>
      <a href={href || "#"} target="_blank" rel="noopener noreferrer" style={buttonStyles}>
        {text || "Button Text"}
      </a>
    </div>
  );
}