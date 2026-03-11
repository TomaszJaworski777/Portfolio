import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { TopBarButton } from "./top_bar_button";

interface ThemeToggleProps {
  defaultLight?: boolean;
  onToggle: (isLight: boolean) => void;
  className?: string; 
  size?: number;
}

export function ThemeToggle({ size = 28, defaultLight = false, className = "", onToggle }: ThemeToggleProps) { //TODO: Write normalized topbar button and use here for consistency
  const [isLight, setIsLight] = useState(defaultLight);

  onToggle(isLight);

  return (
    <TopBarButton icon={isLight ? Moon : Sun} size={size} onClick={() => { setIsLight(!isLight); onToggle(!isLight) }} className={`hover:text-app-theme-toggle ${className}`}/>
  );
}