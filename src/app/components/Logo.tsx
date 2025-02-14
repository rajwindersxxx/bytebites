import Link from 'next/link';
import React from 'react';

export default function Logo() {
  return (
    <h1 className="text-2xl justify-self-start">
      <Link href="/">ByteBite</Link>
    </h1>
  );
}
