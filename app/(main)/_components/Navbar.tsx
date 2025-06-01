'use client';
import { Logo } from '@/components/global/Logo';
import { ModeToggle } from '@/components/global/ModeToggle';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { subscribeUser } from '@/actions/newsletter.actions';
import { NewsletterSubscription } from './NewsletterSubscription';
import { CustomUserDropdown } from '@/components/global/CustomUserButton';

// Main Navbar Component
export const Navbar = () => {
  const { user } = useUser()

  const subscribe = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;
    try {
      const { error, success } = await subscribeUser(email);
      if (error) return error;
      success && toast('✅ You have been subscribed to our newsletter');
    } catch (error) {
      toast('⛔ Oops!', { description: 'Could not create subscription' });
    }
  };

  return (
    <nav className="md:max-w-screen-2xl z-[1] fixed top-0 w-full py-2 px-2 md:px-4 shadow-sm bg-secondary flex items-center md:py-4">
      <div className="flex items-center gap-x-4">
        <div className="md:flex">
          <Logo />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <div className="hidden md:flex">
          {user && <NewsletterSubscription />}
          <Button size="sm" variant="ghost" asChild>
            <a href="https://blog.gidiopolis.com/about/">
              About
            </a>
          </Button>
          <Button size="sm" variant="ghost" asChild>
            <a href="https://blog.gidiopolis.com/">
              Blog
            </a>
          </Button>
        </div>

        <Button size="sm" asChild>
          <Link href="/create-event">
            <Plus size={16} />
            <span className="hidden md:flex">Create Event</span>
          </Link>
        </Button>
        {user ? (
          <CustomUserDropdown />
        ) : (
          <Button className="hidden md:inline-block" size="sm" variant="outline" asChild>
            <Link href="/sign-in">
              Sign In
            </Link>
          </Button>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
};
