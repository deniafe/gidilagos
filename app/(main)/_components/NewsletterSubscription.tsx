import { subscribeUser } from '@/actions/newsletter.actions';
import { Loading } from '@/components/global/Loading';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { toast } from 'sonner';

export const NewsletterSubscription = () => {
  const { user } = useUser();
//   const { isOpen, setOpen, setClose } = useModal();
  const [ isOpen, setIsOpen ] = useState(false);
  const [loading, setLoading] = useState(false)

  const subscribe = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return setIsOpen(false);
    setLoading(true)
    try {
      const { error, success } = await subscribeUser(email);
      if (error) {
        setIsOpen(false);
        setLoading(false)
        return toast(error);
      }
      if (success) {
        toast('✅ You have been subscribed to our newsletter');
      }
      setIsOpen(false);
      setLoading(false)
    } catch (error) {
      toast('⛔ Oops!', { description: 'Could not create subscription' });
      setIsOpen(false);
      setLoading(false)
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>  setIsOpen(true)}
      >
        Newsletter
      </Button>
      <Dialog
        open={isOpen}
        onOpenChange={(isOpen) => !isOpen &&  setIsOpen(false)}
      >
        <DialogContent className="sm:w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-center">Join Our Community!</DialogTitle>
            <DialogDescription className="text-center pt-2">
              Subscribe to our newsletter and never miss out on {`what's`} happening around you.
            </DialogDescription>
            <div className="flex justify-center pt-4">
              <Button disabled={loading} type="button" onClick={subscribe}>
                {loading ? <Loading /> : `Subscribe To Our Newsletter`}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
