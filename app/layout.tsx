"use client";

import { Toaster } from '@/components/ui/toaster';
import { PropsWithChildren, useEffect } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter and usePathname

export default function RootLayout({ children }: PropsWithChildren) {
  const pathname = usePathname(); // Get the current path
  const router = useRouter(); // Get the router
  const isLoginPage = pathname === '/login'; // Check if the current path is '/login'
  const isRegisterPage = pathname === '/register'; 

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    // If the user is not authenticated and not on the login or register page, redirect to login page
    if (!isAuthenticated && !isLoginPage && !isRegisterPage) {
      router.push('/login');
    }
  }, [pathname, router, isLoginPage, isRegisterPage]);

  return (
    <html lang="en" className="h-full">
      <body className={`h-full w-full ${isLoginPage || isRegisterPage ? 'bg-gray-900' : 'bg-gray-50 dark:bg-gray-900'}`}>
        <NavbarWrapper />
        <main className="w-full flex flex-col h-full bg-background">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}

function NavbarWrapper() {
  const pathname = usePathname(); // Use usePathname to get the current path
  const isLoginPage = pathname === '/login'; // Check if the current path is '/login'
  const isRegisterPage = pathname === '/register'; 

  // Hide the navbar on login and register pages
  return !isLoginPage && !isRegisterPage ? <Navbar /> : null;
}
