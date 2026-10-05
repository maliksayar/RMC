import React from 'react';

interface ClinicLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  showTagline?: boolean;
  layout?: 'horizontal' | 'vertical';
  className?: string;
}

export const ClinicLogo: React.FC<ClinicLogoProps> = ({
  size = 'md',
  showWordmark = true,
  showTagline = false,
  layout = 'horizontal',
  className = ''
}) => {
  // Balanced size scales for icon and typography
  const sizeStyles = {
    sm: {
      icon: 'w-8 h-8',
      title: 'text-[13px] tracking-[0.18em]',
      sub: 'text-[8.5px] tracking-[0.3em]',
      tag: 'text-[9.5px]',
      gap: 'gap-2.5'
    },
    md: {
      icon: 'w-12 h-12',
      title: 'text-[15px] sm:text-[17px] tracking-[0.2em]',
      sub: 'text-[9.5px] sm:text-[10px] tracking-[0.32em]',
      tag: 'text-[11px]',
      gap: 'gap-3.5'
    },
    lg: {
      icon: 'w-16 h-16',
      title: 'text-2xl sm:text-3xl tracking-[0.22em]',
      sub: 'text-xs tracking-[0.38em]',
      tag: 'text-xs',
      gap: 'gap-4'
    },
    xl: {
      icon: 'w-24 h-24 sm:w-28 sm:h-28',
      title: 'text-3xl sm:text-4xl tracking-[0.24em]',
      sub: 'text-xs sm:text-sm tracking-[0.42em]',
      tag: 'text-sm',
      gap: 'gap-5'
    }
  };

  const current = sizeStyles[size];
  const isVertical = layout === 'vertical';

  return (
    <div
      className={`inline-flex ${isVertical ? 'flex-col items-center text-center' : `items-center ${current.gap}`
        } text-current ${className}`}
    >
      {/* 
        User's Exact Brain Spiral Insignia:
        - Background precisely matched and blended to project theme (pure transparent / white)
        - Preserving exact cortex vortex curves, cerebellar folia, and brainstem contours
      */}
      <div className={`${current.icon} shrink-0 transition-transform duration-200 hover:scale-105 flex items-center justify-center`}>
        <img
          src="/brain-logo-theme.png"
          alt="Reality Mind Clinic Emblem"
          className="w-full h-full object-contain select-none pointer-events-none [footer_&]:brightness-0 [footer_&]:invert"
          loading="eager"
        />
      </div>

      {/* Typography with exact proportions and letter spacing */}
      {showWordmark && (
        <div className={`flex flex-col items-center text-center ${isVertical ? 'mt-3' : ''}`}>
          {/* Main Wordmark: REALITY MIND */}
          <div className={`font-garamond font-bold uppercase text-current ${current.title} leading-none text-center`}>
            REALITY MIND
          </div>

          {/* Submark: — CLINIC — precisely centered with balanced horizontal rules */}
          <div className="flex items-center justify-center gap-2.5 w-full mt-1.5 text-center">
            <span className="h-[1px] bg-current w-4 sm:w-6 inline-block shrink-0 opacity-80"></span>
            <span className={`font-jakarta font-semibold uppercase text-current ${current.sub}`}>
              CLINIC
            </span>
            <span className="h-[1px] bg-current w-4 sm:w-6 inline-block shrink-0 opacity-80"></span>
          </div>

          {/* Tagline enclosed in fine parallel hairlines */}
          {showTagline && (
            <div className="w-full mt-2 pt-1 border-t border-b border-current/40 py-0.5 text-center">
              <span className={`font-garamond italic text-current ${current.tag} tracking-wide whitespace-nowrap block opacity-90`}>
                Beyond Symptoms. Real Recovery.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
