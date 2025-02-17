import Image from 'next/image'
import React from 'react'

export default function SlidingImages() {
    // LATER: it should be animated 
  return (
    <div className="flex justify-center gap-1 transition-all">
        <div className="h-48 w-48 relative ">
          <Image
            src="https://picsum.photos/300"
            alt="images "
            fill
            className="border rounded-md"
          />
        </div>
        <div className="h-48 w-48 relative">
          <Image
            src="https://picsum.photos/300"
            alt="images "
            fill
            className="scale-110 border rounded-md z-10"
          />
        </div>
        <div className="h-48 w-48 relative">
          <Image
            src="https://picsum.photos/300"
            alt="images "
            fill
            className="border rounded-md"
          />
        </div>
      </div>
  )
}
