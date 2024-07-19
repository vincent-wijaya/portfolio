'use client';

import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { useState } from 'react';
import { Link } from '@nextui-org/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
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
  ]

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link href={`#${item.id}`}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>{item.label}</NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
