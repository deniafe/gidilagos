import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href='/'>
      <div className='hover:opacity-90 transition items-center'>
        <Image alt="Mobile Logo" src="/logo.svg" height={20} width={180} />
        {/* <Image className='flex md:hidden' alt="Mobile Logo" src="/mobile-logo.svg" height={30} width={30} /> */}
      </div>
    </Link>
  )
}
