// lib/email-editor/generateHtml.ts

import {
    AnyEmailElement,
    EmailDesign,
    TextEmailElement,
    ImageEmailElement,
    ButtonEmailElement,
    DividerEmailElement,
    SpacerEmailElement,
    SocialEmailElement,
    ColumnsEmailElement
  } from "@/lib/types/email-editor.types";
  
  // Helper to convert a style object into an inline CSS string
  const styleObjectToString = (style: object | undefined): string => {
    if (!style) return "";
    return Object.entries(style)
      .map(([key, value]) => {
        if (value === undefined || value === null) return '';
        // Convert camelCase to kebab-case for CSS properties
        const cssKey = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
        return `${cssKey}: ${value};`;
      })
      .join(" ");
  };
  
  // =================================================================================
  // Individual Element HTML Generators
  // =================================================================================
  
  const generateTextHtml = (element: TextEmailElement): string => {
    const style = styleObjectToString(element.style);
    return `<div style="${style}">${element.props.content}</div>`;
  };
  
  const generateImageHtml = (element: ImageEmailElement): string => {
    const wrapperStyle = styleObjectToString({
        paddingTop: element.style.paddingTop,
        paddingBottom: element.style.paddingBottom,
        paddingLeft: element.style.paddingLeft,
        paddingRight: element.style.paddingRight,
        textAlign: element.style.textAlign || 'center',
    });
    
    const imgStyle = styleObjectToString({
      maxWidth: '100%', // For responsiveness
      height: element.style.height || 'auto',
      width: element.style.width || '100%', // Use 100% width for fluid images, fixed for others
      display: 'inline-block', // To respect textAlign of parent
    });
  
    const imgTag = `<img src="${element.props.src}" alt="${element.props.alt || ''}" style="${imgStyle}" width="${parseInt(element.style.width || "0") || ''}" />`;
  
    if (element.props.href) {
      return `<div style="${wrapperStyle}"><a href="${element.props.href}" target="_blank" style="text-decoration: none;">${imgTag}</a></div>`;
    }
    return `<div style="${wrapperStyle}">${imgTag}</div>`;
  };
  
  const generateButtonHtml = (element: ButtonEmailElement): string => {
    const wrapperStyle = styleObjectToString({
      paddingTop: element.style.paddingTop,
      paddingBottom: element.style.paddingBottom,
      textAlign: element.style.textAlign || 'center',
    });
    
    const buttonStyle = styleObjectToString({
      display: "inline-block",
      backgroundColor: element.style.backgroundColor,
      color: element.style.color,
      fontFamily: element.style.fontFamily,
      fontSize: element.style.fontSize,
      fontWeight: element.style.fontWeight,
      padding: element.style.padding || `12px 24px`,
      borderRadius: element.style.borderRadius,
      border: element.style.border || 'none',
      textDecoration: 'none',
      boxSizing: 'border-box',
    });
  
    return `<div style="${wrapperStyle}">
      <a href="${element.props.href}" target="_blank" style="${buttonStyle}">
        ${element.props.text}
      </a>
    </div>`;
  };
  
  const generateDividerHtml = (element: DividerEmailElement): string => {
      const wrapperStyle = styleObjectToString({
          paddingTop: element.style.paddingTop,
          paddingBottom: element.style.paddingBottom,
      });
      // Use a table for better email client compatibility
      return `<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="${wrapperStyle}">
          <tr>
              <td style="border-bottom: ${element.style.borderTopWidth || '1px'} ${element.style.borderTopStyle || 'solid'} ${element.style.borderTopColor || '#cccccc'};"></td>
          </tr>
      </table>`;
  };
  
  
  const generateSpacerHtml = (element: SpacerEmailElement): string => {
    const style = styleObjectToString({
      height: element.style.height,
      lineHeight: element.style.height, // Important for some Outlook clients
      fontSize: element.style.height, // Important for some Outlook clients
    });
    return `<div style="${style}">&nbsp;</div>`;
  };
  
  const generateSocialHtml = (element: SocialEmailElement): string => {
      const wrapperStyle = styleObjectToString({
          paddingTop: element.style.paddingTop,
          paddingBottom: element.style.paddingBottom,
          textAlign: element.style.align || 'center',
      });
  
      const iconHtml = element.props.links.map((link, index) => {
          // Here you would have a more complex logic to get the actual icon image URL
          // For now, we'll just use text placeholders
          const iconPlaceholder = link.platform.charAt(0).toUpperCase();
          const linkStyle = `display:inline-block; text-decoration: none; margin-right: ${index === element.props.links.length - 1 ? '0' : (element.style.iconSpacing || '10px')};`;
          // In a real scenario, you'd have hosted images for each social icon style
          const iconSrc = `https://your-cdn.com/icons/${link.platform}-${element.style.iconStyle || 'color'}.png`; // Example
          
          // Using text for now as we don't have hosted icons
          return `<a href="${link.url}" target="_blank" style="${linkStyle}">${iconPlaceholder}</a>`;
      }).join('');
  
      return `<div style="${wrapperStyle}">${iconHtml}</div>`;
  };
  
  const generateColumnsHtml = (element: ColumnsEmailElement): string => {
    const rowStyle = styleObjectToString({
      paddingTop: element.style.paddingTop,
      paddingBottom: element.style.paddingBottom,
      backgroundColor: element.style.backgroundColor,
    });
  
    // Using a table for robust column layout in emails
    const columnsContent = element.columns.map(col => {
      const colStyle = styleObjectToString({
        paddingTop: col.style?.paddingTop,
        paddingBottom: col.style?.paddingBottom,
        paddingLeft: col.style?.paddingLeft,
        paddingRight: col.style?.paddingRight,
        backgroundColor: col.style?.backgroundColor,
        verticalAlign: 'top', // Default
      });
      const colElementsHtml = col.elements.map(el => generateElementHtml(el)).join('');
      // Using percentage width for responsive behavior
      return `<td width="${col.widthFactor * 100}%" style="${colStyle}">${colElementsHtml}</td>`;
    }).join('');
  
    return `<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="${rowStyle}">
      <tr>
        ${columnsContent}
      </tr>
    </table>`;
  };
  
  
  const generateElementHtml = (element: AnyEmailElement): string => {
    switch (element.type) {
      case "text":
        return generateTextHtml(element as TextEmailElement);
      case "image":
        return generateImageHtml(element as ImageEmailElement);
      case "button":
        return generateButtonHtml(element as ButtonEmailElement);
      case "divider":
        return generateDividerHtml(element as DividerEmailElement);
      case "spacer":
        return generateSpacerHtml(element as SpacerEmailElement);
      case "social":
        return generateSocialHtml(element as SocialEmailElement);
      case "columns":
        return generateColumnsHtml(element as ColumnsEmailElement);
      default:
        return "";
    }
  };
  
  
  // =================================================================================
  // Main HTML Generator Function
  // =================================================================================
  
  export const generateHtml = (design: EmailDesign): string => {
    const { globalStyle, elements } = design;
  
    const elementsHtml = elements.map(generateElementHtml).join('');
    
    const contentWrapperStyle = styleObjectToString({
      width: '100%',
      maxWidth: globalStyle.contentWidth || '600px',
      margin: '0 auto',
      backgroundColor: globalStyle.contentBackgroundColor || '#FFFFFF',
    });
  
    const bodyStyle = styleObjectToString({
      margin: 0,
      padding: 0,
      backgroundColor: globalStyle.backgroundColor || '#f4f4f4',
      fontFamily: globalStyle.fontFamily || 'Arial, sans-serif',
      color: globalStyle.textColor || '#333333',
    });
  
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${design.name || 'Your Email'}</title>
        <style>
          a { color: ${globalStyle.linkColor || '#007bff'}; }
        </style>
      </head>
      <body style="${bodyStyle}">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td>
              <div style="${contentWrapperStyle}">
                ${elementsHtml}
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  };