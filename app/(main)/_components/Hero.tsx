import React from 'react'
import Image from 'next/image'
import { SearchBox } from './SearchBox'

export const Hero = () => {
  return (
     <div className="flex flex-row justify-around">
      <div className="md:mt-6 hidden md:block">
          {/* <Image
            alt='Header_1'
            width={120}
            height={120}
            src='/img/header_1.jpg'
            className="rounded-full w-[8.5rem] h-[20rem] object-cover bg-center bg-cover bg-lightgray-500"
            style={{
              background: 'lightgray 50% / cover no-repeat'
            }}
          /> */}
          <img
            alt='Header_1'
            width={120}
            height={120}
            src='/img/header_1.jpg'
            className="rounded-full w-[9rem] h-[20rem] object-cover bg-center bg-cover bg-lightgray-500"
            style={{
              background: 'lightgray 50% / cover no-repeat'
            }}
          />
        </div>

        {/* Newsletter sign-up input field */}
        <div className="mt-12 md:mt-20">
          <h1 
          className="text-center px-[1rem] md:px-0 text-[2rem] md:text-[2.5rem] font-bold text-my-primary mb-8"
          style={{
            background: 'linear-gradient(180deg, #31859C 0%, #17375E 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
          >
            Find Amazing Events Happening 
            <br />
            In Your City
          </h1>
          <SearchBox />
        </div>

        <div className="md:mt-32 hidden md:block">
          {/* <Image
            alt='Header_2'
            width={120}
            height={120}
            className="rounded-full w-[8.5rem] h-[20rem] object-cover bg-center bg-cover bg-lightgray-500"
            src='/img/header_2.jpg'
          /> */}

          <img
            alt='Header_2'
            width={120}
            height={120}
            className="rounded-full w-[9rem] h-[20rem] object-cover bg-center bg-cover bg-lightgray-500"
            src='/img/header_2.jpg'
          />
        </div>
      </div>
  )
}