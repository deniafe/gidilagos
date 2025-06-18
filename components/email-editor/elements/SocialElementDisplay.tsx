// components/email-editor/elements/SocialElementDisplay.tsx
import { SocialEmailElement, SocialLink } from "@/lib/types/email-editor.types";
import React from "react";
import { Facebook, Twitter, LinkedinIcon as ActualLinkedInIcon, Instagram, Youtube, Link as LinkIcon } from "lucide-react";

interface SocialElementDisplayProps {
  element: SocialEmailElement;
}

const PlatformIcon: React.FC<{ platform: SocialLink['platform'], iconStyle?: SocialEmailElement['style']['iconStyle'], size?: string }> = ({ platform, iconStyle, size = "24px" }) => {
  let color = "#333333";
  const iconSizeNum = parseInt(size.replace('px', '')) || 24;

  if (iconStyle === 'color') {
    switch (platform) {
      case 'facebook': color = '#1877F2'; break;
      case 'twitter': color = '#1DA1F2'; break;
      case 'linkedin': color = '#0A66C2'; break;
      case 'instagram': color = '#E4405F'; break;
      case 'youtube': color = '#FF0000'; break;
      case 'website': color = '#4A90E2'; break;
      case 'custom': color = '#777777'; break;
      default: color = '#333333';
    }
  } else if (iconStyle === 'white') {
    color = '#FFFFFF';
  } else if (iconStyle === 'black') {
     color = '#000000';
  }

  const iconProps = { size: iconSizeNum, color: color, strokeWidth: 1.5 };

  switch (platform) {
    case "facebook": return <Facebook {...iconProps} />;
    case "twitter": return <Twitter {...iconProps} />;
    case "linkedin": return <ActualLinkedInIcon {...iconProps} />;
    case "instagram": return <Instagram {...iconProps} />;
    case "youtube": return <Youtube {...iconProps} />;
    case "website": return <LinkIcon {...iconProps} />;
    case "custom": return <LinkIcon {...iconProps} />;
    default: return <LinkIcon {...iconProps} />;
  }
};

export default function SocialElementDisplay({ element }: SocialElementDisplayProps) {
  const { links } = element.props;
  const { style } = element;

  const wrapperStyle: React.CSSProperties = {
    paddingTop: style.paddingTop || "10px",
    paddingBottom: style.paddingBottom || "10px",
    paddingLeft: style.paddingLeft || "0px",
    paddingRight: style.paddingRight || "0px",
    marginTop: style.marginTop || "0px",
    marginBottom: style.marginBottom || "0px",
    backgroundColor: style.backgroundColor,
    textAlign: style.align || "center",
  };

  const linkStyle: React.CSSProperties = {
    display: "inline-block",
    marginRight: style.iconSpacing || "10px",
    textDecoration: "none",
    lineHeight: "1",
  };

  if (!links || links.length === 0) {
     return (
         <div style={wrapperStyle} className="py-3 px-2 text-xs text-muted-foreground text-center border border-dashed">
             Social Icons: Add links in properties panel.
         </div>
     );
  }

  return (
    <div style={wrapperStyle}>
      {links.map((link, index) => (
        <a
          key={link.id}
          href={link.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          style={index === links.length - 1 ? { ...linkStyle, marginRight: "0px" } : linkStyle}
          title={link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
        >
          {link.platform === 'custom' && link.iconSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={link.iconSrc} alt={link.platform} style={{ width: style.iconSize || "24px", height: style.iconSize || "24px", display: 'inline-block', verticalAlign: 'middle' }} />
          ) : (
            <PlatformIcon platform={link.platform} iconStyle={style.iconStyle} size={style.iconSize} />
          )}
        </a>
      ))}
    </div>
  );
}