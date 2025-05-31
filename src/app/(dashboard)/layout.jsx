"use client";

import { dashboardNavLinks } from "../../constants/data";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/auth"


export default function RootLayout({ children }) {
  // const session =  getServerSession(authOptions)

  // if (!session) {
  //   redirect("/login")
  // }
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex items-center flex-shrink-0 px-6 py-4 border-b border-gray-200">
            <Link href="/dashboard">
              <div className="flex items-center space-x-4">
                <div className="logo-icon">
                  <img src="/assets/logo/logo.png" alt="" />
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-6 flex-grow flex flex-col">
            <nav className="flex-1 px-4 space-y-2">
              {dashboardNavLinks.map((link, index) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={index}
                    href={link.href}
                    className={`group flex items-center rounded-lg gap-1 px-3 py-3 font-medium text-sm ${isActive ? 'bg-primary-main text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {link.icon && <Icon icon={link.icon} width="18" height="18" />}
                    <span className="mt-0.5">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 p-4">
            <button onClick={() => signOut({ callbackUrl: "/" })} className="cursor-pointer w-full bg-primary-main text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center ">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button className="bg-white p-2 rounded-lg shadow-md">
          {/* <BarChart3 className="h-6 w-6 text-gray-600" /> */}
        </button>
      </div>
      <div className="lg:pl-64 flex flex-col flex-1">{children}</div>
    </div >
  );
}
