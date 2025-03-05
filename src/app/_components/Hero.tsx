import React from 'react';
import SlidingImages from './SlidingImages ';

export default function Hero() {
  return (
    <section className=" container mx-auto py-8 flex items-center justify-center  gap-20">
      <div className='flex flex-col gap-20'>
        <SlidingImages />
        <div className="text-center flex flex-col gap-6">
          <h1 className="text-center text-4xl bold font-sans">
            Generate AI Recipes & Plan Your Meals Like a Pro&quot;
          </h1>
          <div>
            <a href='#Features' className="bg-primary px-4 py-2 rounded-md  min-w-32 text-xl text-natural-cream text-center hover:bg-secondary transition-all">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
