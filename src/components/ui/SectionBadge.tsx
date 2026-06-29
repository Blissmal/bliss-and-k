interface SectionBadgeProps {
  children: React.ReactNode;
  color?: string;
}

export default function SectionBadge({ children, color = "#a5b4fc" }: SectionBadgeProps) {
  return (
    <span
      className="inline-flex items-center text-[11px] font-bold uppercase tracking-[0.18em]"
      style={{ color }}
    >
      {children}
    </span>
  );
}
