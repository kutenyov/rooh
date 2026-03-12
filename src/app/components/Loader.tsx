import React from 'react';
import logo from '@/assets/267bfba205e7b111cd1cd8eed86a3e179c66d213.png';
import loaderImage from '@/assets/029529525a15fad4639b861753efcc2bfe5025df.png';

export function Loader() {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Full screen background image */}
      <div className="absolute inset-0">
        <img
          src={loaderImage}
          alt="Rooh"
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Content overlay */}
      <div className="relative h-full flex flex-col items-center justify-end pb-16 px-6">
        {/* Logo with subtle glow */}
        <div className="mb-8 relative">
          {/* Subtle dark background for contrast - multiple layers */}
          <div className="absolute inset-0 -inset-x-12 -inset-y-8 bg-black/40 blur-3xl rounded-full" />
          <div className="absolute inset-0 -inset-x-8 -inset-y-6 bg-black/25 blur-xl rounded-full" />
          <img 
            src={logo} 
            alt="Rooh" 
            className="h-14 w-auto object-contain mx-auto relative drop-shadow-2xl"
          />
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1.5 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-300 to-brand-500 rounded-full animate-progress" />
        </div>
      </div>
    </div>
  );
}