'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { Media } from '@/lib/types';

interface MediaProviderProps {
  children: React.ReactNode;
}

type MediaContextType = {
  media: Media[];
  setMedia: (media: Media[]) => void;
};

export const MediaContext = createContext<MediaContextType>({
  media: [],
  setMedia: (media: Media[]) => {},
});

const MediaProvider: React.FC<MediaProviderProps> = ({ children }) => {
  const [media, setMedia] = useState<Media[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // You can fetch media data here on component mount if needed
    // Example: fetchMediaData().then((media) => setMedia(media));
  }, []);

  if (!isMounted) return null;

  return (
    <MediaContext.Provider value={{ media, setMedia }}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within the media provider');
  }
  return context;
};

export default MediaProvider;
