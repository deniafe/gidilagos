import React from 'react';
import Link from 'next/link';
import { company, resources } from '@/lib/constants';
import { Twitter } from '@/components/icons/Twitter';
import { Instagram } from '@/components/icons/Instagram';
import { LinkedIn } from '@/components/icons/LinkedIn';
import { Facebook } from '@/components/icons/Facebook';
import { Logo } from '@/components/global/Logo';

export const Footer = () => {
  const currentYear = new Date().getFullYear(); // Dynamically fetch the current year

  return (
    <footer className="bg-primary-foreground text-center text-white lg:text-left">
      <div className="mx-4 md:mx-[6rem] py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center md:items-start">
            <h6 className="mb-8 font-semibold uppercase">Company</h6>
            {company.map((link, index) => (
              <p key={index} className="mb-6">
                <a href={link.url}>{link.title}</a>
              </p>
            ))}
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h6 className="mb-8 font-semibold uppercase">Resources</h6>
            {resources.map((link, index) => (
              <p key={index} className="mb-6">
                <Link href={link.url}>{link.title}</Link>
              </p>
            ))}
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h6 className="mb-8 font-semibold uppercase">Connect With Us</h6>
            <div className="flex space-x-4">
              <a href="#!" className="p-1 bg-white rounded-full">
                <Twitter />
              </a>
              <a href="#!" className="p-1 bg-white rounded-full">
                <Instagram />
              </a>
              <a href="#!" className="p-1 bg-white rounded-full">
                <LinkedIn />
              </a>
              <a href="#!" className="p-1 bg-white rounded-full">
                <Facebook />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h6 className="mb-4 font-semibold uppercase">Contact</h6>
            <p className="mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-3 h-5 w-5"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
              Lagos Nigeria
            </p>
            <p className="mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-3 h-5 w-5"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              wowe.media@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Logo />
      </div>
      <div className="py-2 text-center">
        <span>© {currentYear} Copyright</span>
      </div>
    </footer>
  );
};
