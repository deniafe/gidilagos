import React from 'react'
import { Hero } from './_components/Hero'
import { Category } from './_components/Category'
import { SkeletonCard } from './_components/SkeletonCard'
import { CTA } from './_components/CTA'


function MainPage() {
  return (
    <div>
      <Hero />
      <Category />
      <h2 className="flex justify-center md:justify-start text-[1.75rem] font-medium px-[2rem]">
        Latest Events
      </h2>
      <SkeletonCard />
      <CTA />
    </div>
  )
}

export default MainPage