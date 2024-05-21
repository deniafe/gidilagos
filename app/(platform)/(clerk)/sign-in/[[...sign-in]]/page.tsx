'use client'
import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from "next-themes"

function Page() {
  const { theme } = useTheme()
  return <SignIn appearance={theme === 'dark' ? { baseTheme: dark } : undefined} />
}

export default Page