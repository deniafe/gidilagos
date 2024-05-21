import React from 'react'
import { Navbar } from './_components/Navbar'
import { Footer } from './_components/Footer'

function MainLayout({children} : {children: React.ReactNode}) {
  return (
    <div className='h-full'>
      <Navbar />
        <main className="py-16 md:py-28 md:px-[2rem]">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout