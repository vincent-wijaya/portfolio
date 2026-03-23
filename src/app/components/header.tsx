'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { Link } from '@nextui-org/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const menuItems = useMemo(() => [
    {
      label: 'About',
      id: 'about',
    },
    {
      label: 'Experience',
      id: 'experience',
    },
    {
      label: 'Projects',
      id: 'projects',
    },
    {
      label: 'Education',
      id: 'education',
    },
    // {
    //   label: 'Skills',
    //   id: 'skills',
    // },
    {
      label: 'Contact',
      id: 'contact',
    }
  ], []);

  const navigateToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    const navbar = document.querySelector('nav');
    const navHeight = navbar instanceof HTMLElement ? navbar.offsetHeight : 0;
    const targetTop = section.getBoundingClientRect().top + window.scrollY - navHeight - 8;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: 'smooth',
    });

    window.history.replaceState(null, '', `#${sectionId}`);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const sectionIds = menuItems.map((item) => item.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: [0.3, 0.5, 0.8], rootMargin: '-20% 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [menuItems]);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className='fixed top-0 left-0 right-0 z-50 h-16 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md border-b border-white/30 dark:border-zinc-800/60 shadow-sm'
    >
      <NavbarContent className='h-full px-4'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
      </NavbarContent>

      <NavbarContent
        className='hidden sm:flex gap-1 px-4'
        justify='center'
      >
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                navigateToSection(item.id);
              }}
              className={`transition duration-200 ${
                activeSection === item.id
                  ? 'font-semibold text-blue-700 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-400/10'
                  : 'text-zinc-700 dark:text-zinc-200 hover:bg-white/60 dark:hover:bg-zinc-800/50'
              } px-3 py-2 rounded-md`}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu className='backdrop-blur-md'>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                navigateToSection(item.id);
              }}
              className={`w-full px-3 py-2 rounded-md transition duration-200 ${
                activeSection === item.id
                  ? 'font-semibold text-blue-700 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-400/10'
                  : 'text-zinc-700 dark:text-zinc-200 hover:bg-white/60 dark:hover:bg-zinc-800/50'
              }`}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
