import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

export const SmallLogo = () => {
  return (
    <Link href='/'>
      <div className='hover:opacity-90 transition items-center'>
        <Image alt="Mobile Logo" src="/favicon.svg" height={30} width={30} />
      </div>
    </Link>
  )
}
