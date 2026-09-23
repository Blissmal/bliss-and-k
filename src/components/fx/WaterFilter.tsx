export default function WaterFilter() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute pointer-events-none">
      <defs>
        <filter id="water-ripple" x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.05" numOctaves="2" result="n">
            <animate attributeName="baseFrequency" dur="5s" values="0.02 0.05;0.035 0.09;0.02 0.05" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
