'use client'

import React, { useState, useEffect } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Menu, X } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [open, setOpen] = useState(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      {/* DESKTOP NAV */}
      <nav className="hidden md:flex gap-12 items-center">
        {navItems.map(({ link }, i) => (
          <CMSLink key={i} {...link} appearance="link" />
        ))}
      </nav>

      {/* MOBILE */}
      <div className="md:hidden relative z-50">
        {/* Hamburger / Cross Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="relative w-8 h-8 flex items-center justify-center text-white z-50"
        >
          {/* Stack Menu & X icons */}
          <Menu
            size={28}
            className={`absolute transition-transform duration-300 ease-in-out ${
              open ? 'rotate-45 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          />
          <X
            size={28}
            className={`absolute transition-transform duration-300 ease-in-out ${
              open ? 'rotate-0 scale-100 opacity-100' : 'rotate-45 scale-0 opacity-0'
            }`}
          />
        </button>

        {/* BACKDROP */}
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 bg-black/60 transition-opacity duration-500 ${
            open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* SLIDE-IN MENU */}
        <aside
          className={`fixed top-0 right-0 h-full w-1/2 max-w-sm bg-black border-l border-white/10
            transform transition-transform duration-500 ease-in-out
            ${open ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          {/* Nav items */}
          <nav className="flex flex-col gap-8 px-8 pt-12 text-xl">
            {navItems.map(({ link }, i) => (
              <div
                key={i}
                className="cursor-pointer"
                onClick={() => {
                  setOpen(false)
                  if (link.url?.startsWith('#')) {
                    const target = document.querySelector(link.url)
                    target?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                <CMSLink {...link} appearance="link" className="text-white" />
              </div>
            ))}
          </nav>
        </aside>
      </div>
    </>
  )
}
