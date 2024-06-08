import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const CTA = () => {

  return (
    <section
      className="mb-8 md:mb-32"
    >
      
      <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 mt-12 md:mt-20 px-[2rem]">

        <div className="md:px-[2rem] mt-12 mb-12 md:mb-0" >
          <h2 className="text-center md:text-left text-[1.75rem] font-medium mb-4">
            Showcase Your Events
          </h2>
          <p className="mb-6 text-center md:text-left">
            Ready to showcase your amazing upcoming event to a diverse and engaged audience? Submit your event to our platform
          </p>

              <Link 
                 href="/organization"
                className="flex justify-center md:justify-start"
                >
                <Button>
                  Submit Event
                </Button>
              </Link>
              
           
        </div>
        <div className="flex relative justify-center">
        <div className="hidden md:block absolute top-[2rem] left-[3rem] h-8 w-8 rounded-lg bg-cyan-400"></div>
          <div className="hidden md:block absolute top-[4rem] left-[5rem] h-12 w-12 rounded-xl bg-primary"></div>
          <Image
            alt='Davido'
            width={120}
            height={120}
            className="rounded-3xl md:rounded-3xl w-[18rem] h-[20rem] object-cover bg-center bg-cover bg-lightgray-500"
            src='/img/davido.jpg'
          ></Image>
        </div>
        
      </div>
      
    </section>
  )
}