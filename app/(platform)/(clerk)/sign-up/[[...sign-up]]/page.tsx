'use client'
import { SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from "next-themes"

function Page() {
  const { theme } = useTheme()
  return <SignUp appearance={theme === 'dark' ? { baseTheme: dark } : undefined} />
}

export default Page