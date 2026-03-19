import { HelpCircle } from "lucide-react";

interface TechIconProps {
  name: string;
  iconUrl: string;
  color?: string;
  className?: string;
}

export function TechIcon({ name, iconUrl, color, className }: TechIconProps) {
  return (
    <div
      className="group/tech relative flex items-center justify-center rounded-md"
      style={{ '--hover-bg': color ? `${color}33` : 'var(--app-surface)' } as React.CSSProperties}
    >
      <div className="absolute inset-0 rounded-md transition-colors duration-150 group-hover/tech:bg-(--hover-bg) pointer-events-none -m-1" />

      {iconUrl ? (
        iconUrl.startsWith('devicon-') ? (
          <i className={`${iconUrl} relative z-10 text-[26px] transition-transform duration-150 group-hover/tech:scale-[1.15] ${className || ""}`}></i>
        ) : (
          <img
            src={iconUrl}
            alt={name}
            className={`w-full h-full object-contain relative z-10 transition-transform duration-150 group-hover/tech:scale-[1.15] will-change-transform backface-hidden ${className || ""}`}
          />
        )
      ) : (
        <HelpCircle
          className={`relative z-10 w-full h-full transition-transform duration-150 group-hover/tech:scale-[1.15] ${className || ""}`}
          strokeWidth={1.2}
          style={{ color: color || "var(--app-text-primary)" }}
        />
      )}

      <div className="pointer-events-none absolute bottom-full mb-1.5 opacity-0 group-hover/tech:opacity-100 z-50">
        <div
          className="bg-app-bg border border-app-border text-[10px] tracking-widest uppercase px-2 py-1 rounded-md whitespace-nowrap shadow-xl"
          style={{ color: color || "var(--app-text-primary)" }}
        >
          {name}
        </div>
      </div>
    </div>
  );
}
