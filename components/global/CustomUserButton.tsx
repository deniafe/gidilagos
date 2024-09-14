import { UserButton, useUser } from '@clerk/nextjs'
import { CalendarDays, UserCheck } from 'lucide-react'
import { dark } from '@clerk/themes'
import { useTheme } from "next-themes"

export const CustomUserDropdown = () => {
    const { theme } = useTheme();
    const { user } = useUser();
  
    const adminEmails = ['wowe.media@gmail.com', 'deniafe@gmail.com', 'orebamz1@gmail.com'];
  
    return (
      <UserButton 
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined, 
        elements: {
          avatarBox: {height: 30, width: 30}
        }
        }}
      >
        <UserButton.MenuItems>
          <UserButton.Action label="manageAccount" />
          <UserButton.Link label="My Events" labelIcon={<CalendarDays size={16} />} href="/user-events" />
          {user?.primaryEmailAddress?.emailAddress && adminEmails.includes(user.primaryEmailAddress.emailAddress) && (
              <UserButton.Link label="Admin" labelIcon={<UserCheck size={16} />} href="/admin" />
            )}
         
        </UserButton.MenuItems>
      </UserButton>
    );
  };