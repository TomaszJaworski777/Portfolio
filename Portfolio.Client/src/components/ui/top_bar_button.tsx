import type { LucideIcon } from "lucide-react";

interface TopBarButtonProps {
  icon?: LucideIcon;
  devicon?: string;
  onClick?: () => void;
  className?: string;
  size?: number;
  title?: string;
}

export function TopBarButton({ icon: Icon, devicon, onClick, className = "", size = 28, title }: TopBarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative w-11 h-10 flex items-center justify-center
        transition-all active:scale-90 cursor-pointer
        text-app-text-primary hover:scale-110 ${className} 
      `}
    >
      {Icon && <Icon size={size} strokeWidth={1.5} />}

      {devicon && <i className={devicon} style={{ fontSize: size }} />}

      {title && (
        <div className="pointer-events-none absolute top-full mt-1.5 opacity-0 group-hover:opacity-100 z-50">
          <div className="bg-app-bg border border-app-border text-[10px] tracking-widest uppercase px-2 py-1 rounded-md whitespace-nowrap shadow-xl text-app-text-primary font-sans font-normal">
            {title}
          </div>
        </div>
      )}
    </button>
  );
}