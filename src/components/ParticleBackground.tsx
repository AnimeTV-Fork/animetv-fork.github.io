import React from 'react';

export const ParticleBackground: React.FC<{ theme: string }> = () => {
  return (
    <div className="absolute inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none opacity-30 dark:opacity-20">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dotGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="currentColor" className="text-[var(--color-primary)] opacity-40" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotGrid)" />
      </svg>
      {/* Subtle background glow spots matching the GitHub / developer theme */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--color-primary)] opacity-15 filter blur-[120px]" />
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[var(--color-secondary)] opacity-10 filter blur-[100px]" />
    </div>
  );
};
