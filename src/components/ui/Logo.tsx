import React from "react";

interface LogoProps {
  className?: string;
}

export function LogoIcon({ className = "w-9 h-9" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Modern Orange-to-Purple Gradient */}
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" /> {/* Orange */}
          <stop offset="55%" stopColor="#EC4899" /> {/* Pink */}
          <stop offset="100%" stopColor="#7C3AED" /> {/* Purple */}
        </linearGradient>

        {/* Mask for letter B cutouts (holes) */}
        <mask id="bMask">
          {/* Everything white is kept, black is cut out */}
          <rect x="0" y="0" width="100" height="100" fill="white" />
          
          {/* Top hole of B */}
          <path
            d="M 31 29 H 41 C 43 29 44.5 30 44.5 31.5 C 44.5 33 43 34.5 41 34.5 H 31 V 29 Z"
            fill="black"
          />
          
          {/* Bottom hole of B */}
          <path
            d="M 31 43.5 H 43 C 45 43.5 46.5 44.5 46.5 46.5 C 46.5 48.5 45 49.5 43 49.5 H 31 V 43.5 Z"
            fill="black"
          />
        </mask>
      </defs>

      {/* 1. Left Wrapping Arc (wrapping the 'B') */}
      <path
        d="M 34 14 A 26 26 0 1 0 34 66"
        stroke="url(#logoGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* 2. Letter B (using mask for transparency) */}
      <path
        d="M 26 24 H 44 C 48.5 24 51.5 26.5 51.5 30.5 C 51.5 34.5 48.5 37 44 37 H 26 V 24 Z"
        fill="white"
        mask="url(#bMask)"
      />
      <path
        d="M 26 37 H 46 C 50.5 37 53.5 39.5 53.5 44 C 53.5 48.5 50.5 51 46 51 H 26 V 37 Z"
        fill="white"
        mask="url(#bMask)"
      />

      {/* 3. Ampersand & (styled in orange/gold) */}
      <text
        x="54"
        y="42"
        fill="#F59E0B"
        fontSize="13"
        fontWeight="800"
        fontFamily="var(--font-inter), system-ui, sans-serif"
      >
        &amp;
      </text>

      {/* 4. Letter K */}
      {/* K Stem (White) */}
      <rect x="67" y="24" width="5" height="27" rx="1" fill="white" />
      {/* K Diagonal Arms (Gradient) */}
      <path
        d="M 85 24 L 72.5 37.5 L 85 51"
        stroke="url(#logoGrad)"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function BuildingDigitalSolutionsSVG({ className = "w-full max-w-[320px]" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 300 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      {/* Computer / Code Icon */}
      <g transform="translate(130, 8)">
        <rect x="0" y="0" width="40" height="28" rx="5" stroke="white" strokeWidth="2" fill="none" opacity="0.9" />
        <path d="M 12 34 L 28 34" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M 16 28 L 13 34" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M 24 28 L 27 34" stroke="white" strokeWidth="2" strokeLinecap="round" />
        {/* Code symbol </ > inside the monitor */}
        <path d="M 14 10 L 10 14 L 14 18" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 26 10 L 30 14 L 26 18" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 22 9 L 18 19" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* Styled Text */}
      <text
        x="150"
        y="68"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="800"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        letterSpacing="0.1em"
        opacity="0.9"
      >
        BUILDING
      </text>

      <text
        x="150"
        y="90"
        textAnchor="middle"
        fill="url(#badgeGrad)"
        fontSize="16"
        fontWeight="900"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        letterSpacing="0.08em"
      >
        DIGITAL SOLUTIONS
      </text>

      <text
        x="150"
        y="112"
        textAnchor="middle"
        fill="rgba(255,255,255,0.7)"
        fontSize="12"
        fontWeight="500"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        letterSpacing="0.05em"
      >
        for a Better Tomorrow.
      </text>
    </svg>
  );
}

export function InnovateSloganSVG({ className = "w-full max-w-[420px]" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 420 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      {/* Lightbulb Icon on the left */}
      <g transform="translate(10, 16)">
        {/* Glow behind bulb */}
        <circle cx="16" cy="16" r="10" fill="#F97316" opacity="0.12" />
        
        {/* Bulb outline */}
        <path
          d="M 16 6 C 11.5 6 8 9.5 8 14 C 8 17.2 10 20 11.5 21.5 L 11.5 24.5 C 11.5 25.3 12.2 26 13 26 H 19 C 19.8 26 20.5 25.3 20.5 24.5 L 20.5 21.5 C 22 20 24 17.2 24 14 C 24 9.5 20.5 6 16 6 Z"
          stroke="#F97316"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Filaments */}
        <path d="M 13 13 H 19" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 14 17 H 18" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" />
        {/* Bottom metal base thread details */}
        <path d="M 14.5 29 H 17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        {/* Light rays */}
        <path d="M 16 2 L 16 4" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 6 14 H 4" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 28 14 H 26" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 9 7 L 11 9" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 23 7 L 21 9" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* Slogan Text: Innovate. Develop. Elevate. */}
      <text
        x="50"
        y="35"
        fill="url(#textGrad)"
        fontSize="21"
        fontWeight="900"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        letterSpacing="0.06em"
      >
        INNOVATE. DEVELOP. ELEVATE.
      </text>

      {/* Subtext: We Code Your Dreams Into Reality. */}
      <text
        x="50"
        y="58"
        fill="rgba(255,255,255,0.6)"
        fontSize="13.5"
        fontWeight="500"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        letterSpacing="0.04em"
      >
        We Code Your Dreams Into Reality.
      </text>
    </svg>
  );
}
