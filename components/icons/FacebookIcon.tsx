// components/icons/FacebookIcon.tsx
import React from 'react';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  // The original SVG was monochrome, so we'll apply the fill to the path.
  // If your SVG has multiple paths for different colors, adjust accordingly.
  <svg viewBox="0 0 16 16" {...props}>
    <path
      d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0 0 3.603 0 8.05C0 12.098 2.904 15.33 6.75 15.969V10.39H4.81V8.05h1.94V6.278c0-1.911 1.145-2.963 2.876-2.963.824 0 1.534.061 1.743.088v2.04h-1.207c-.927 0-1.105.44-1.105 1.086V8.05h2.268l-.295 2.34H8.963v5.579C13.1 15.33 16 12.098 16 8.049z"
      fill="#1877F2" // Facebook Blue
    />
  </svg>
);
export default FacebookIcon;