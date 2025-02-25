import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import ProfilePanel from './ProfilePanel';

export default function Header() {
  return (
    <div className="h-20 bg-natural-beige ">
      <div className="container h-full mx-auto grid grid-cols-[1fr_auto_1fr] items-center text-orange-900">
        <Logo/>
        <Navigation/>
        <ProfilePanel />
      </div>
    </div>
  );
}
