import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Share } from 'lucide-react';
import { useState } from 'react';
import { Facebook } from '@/components/icons/Facebook';
import { Twitter } from '@/components/icons/Twitter';
import { Whatsapp } from '@/components/icons/Whatsapp';
import { Messenger } from '@/components/icons/Messenger';
import { toast } from 'sonner';

type Props = {
  link: string;
};

export const ShareButton = ({ link }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    toast('✅ Link copied to clipboard!');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(link)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`, '_blank');
  };

  const shareOnMessenger = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent)) {
      window.open(`fb-messenger://share?link=${encodeURIComponent(link)}`, '_blank');
    } else {
      window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(link)}&app_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent(window.location.href)}`, '_blank');
    }
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`, '_blank');
  };

  return (
    <div onClick={(e) => { e.stopPropagation(); }}>
      <Button
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        <Share className="h-4 w-4" />
      </Button>
      <Dialog
        open={isOpen}
        onOpenChange={(isOpen) => {
          !isOpen && setIsOpen(false);
        }}
      >
        <DialogContent className="sm:w-[450px]">
          <DialogHeader>
            <DialogTitle>Share with friends</DialogTitle>
            <DialogDescription>
              Copy event URL or click any of the buttons below to share
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">Link</Label>
              <Input id="link" defaultValue={link} readOnly />
            </div>
            <Button type="button" size="sm" className="px-3" onClick={copyToClipboard}>
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Button variant="outline" size="icon" onClick={shareOnTwitter}>
              <Twitter />
            </Button>
            <Button variant="outline" size="icon" onClick={shareOnWhatsApp}>
              <Whatsapp />
            </Button>
            <Button variant="outline" size="icon" onClick={shareOnFacebook}>
              <Facebook />
            </Button>
            <Button variant="outline" size="icon" onClick={shareOnMessenger}>
              <Messenger />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
