import type { LucideIcon } from "lucide-react";

interface TopBarButtonProps {
  icon?: LucideIcon;
  devicon?: string;
  onClick?: () => void;
  className?: string; 
  size?: number;
}

export function TopBarButton({ icon: Icon, devicon, onClick, className = "", size = 28 }: TopBarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-11 h-10 flex items-center justify-center
        transition-all active:scale-90 cursor-pointer
        text-app-text-primary hover:scale-99 ${className} 
      `}
    >
      {Icon && <Icon size={size} strokeWidth={1.5} />}

      {devicon && <i className={`${devicon} text-[${size}px]`} />}
    </button>
  );
}