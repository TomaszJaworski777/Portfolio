import { Sun, Moon } from "lucide-react";
import { useState } from "react";

export function ThemeToggle({ size: size, defaultLight: defaultLight, onToggle: onToggle }: { size: number, defaultLight: boolean, onToggle: (isLight: boolean) => void }) { //TODO: Write normalized topbar button and use here for consistency
  const [isLight, setIsLight] = useState(defaultLight);

  onToggle(isLight);

  return (
    <button
      onClick={() => {setIsLight(!isLight); onToggle(!isLight)}}
      className="
        w-11 h-10 flex items-center justify-center
        transition-all active:scale-90 cursor-pointer
        hover:text-app-theme-toggle text-app-text-primary
      "
    >
      {isLight ? <Moon size={size} strokeWidth={1.5}/> : <Sun size={size} strokeWidth={1.5}/>}
    </button>
  );
}