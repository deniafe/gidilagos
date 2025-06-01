// components/icons/TikTokIcon.tsx
import React from 'react';

// This SVG is a single path, so we fill that path.
// For TikTok's true multi-color logo, you'd need a more complex SVG.
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 286.054 286.054" {...props}> {/* Removed fill="currentColor" */}
    <path
      d="M203.538,131.047V54.345c3.105-0.894,6.353-1.404,9.688-1.404c24.944,0,45.168,20.224,45.168,45.168     c0,14.968-7.277,28.117-18.461,36.008v45.17c34.979-9.189,61.748-40.563,61.748-77.691c0-44.603-36.173-80.776-80.776-80.776     c-23.307,0-44.06,9.918-58.863,25.943V0h-63.498v203.538c-10.542,5.538-17.987,16.517-17.987,29.03c0,18.085,14.658,32.742,32.742,32.742     s32.742-14.657,32.742-32.742C221.525,147.563,214.08,136.584,203.538,131.047z"
      fill="#000000" // TikTok Black (often part of their branding)
      // Or you could try one of their vibrant colors like #25F4EE (teal) or #FE2C55 (pink)
      // If your SVG supports multiple colors:
      // e.g., path for teal, path for pink, path for black/white
    />
  </svg>
);
export default TikTokIcon;