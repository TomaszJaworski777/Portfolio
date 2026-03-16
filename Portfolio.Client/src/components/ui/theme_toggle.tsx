import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { TopBarButton } from "./top_bar_button";

interface ThemeToggleProps {
  defaultLight?: boolean;
  onToggle: (isLight: boolean) => void;
  className?: string;
  size?: number;
}

export function ThemeToggle({ size = 28, defaultLight = false, className = "", onToggle }: ThemeToggleProps) {
  const [isLight, setIsLight] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "light" : defaultLight;
  });

  useEffect(() => {
    localStorage.setItem("theme", isLight ? "light" : "dark");
    onToggle(isLight);
  }, [isLight, onToggle]);

  return (
    <TopBarButton icon={isLight ? Moon : Sun} size={size} onClick={() => setIsLight(!isLight)} className={`hover:text-app-theme-toggle ${className}`} />
  );
}