import { useState } from "react";
import { HelpCircle } from "lucide-react";

interface FilterButtonProps {
    name: string;
    icon: string;
    color: string;
    active?: boolean;
    onToggle: (active: boolean) => void;
}

export function FilterButton({ name, icon, color, active: controlledActive, onToggle }: FilterButtonProps) {
    const [internalActive, setInternalActive] = useState(false);
    const active = controlledActive ?? internalActive;

    return (
        <button
            style={{
                "--tag-color": color,
                "--active-bg": `color-mix(in srgb, ${color}, transparent 80%)`
            } as React.CSSProperties}
            className={`
                group flex items-center gap-1 pr-1.5 pl-1 py-1 border transition-all duration-200
                text-[14px] uppercase tracking-wide cursor-pointer
                hover:border-(--tag-color) hover:text-(--tag-color)
                hover:shadow-[0_0_15px_color-mix(in_srgb,var(--tag-color),transparent_85%)]

                ${active
                    ? "bg-(--active-bg) border-(--tag-color) text-(--tag-color)"
                    : "bg-app-surface border-app-border text-app-muted"
                }       
            `}
            onClick={() => {
                const newState = !active;
                setInternalActive(newState);
                onToggle(newState);
            }}
        >
            <div className="flex items-center justify-center w-5 h-5 shrink-0">
              {icon ? (
                icon.startsWith('devicon-')
                  ? <i className={`${icon} text-[16px]`}></i>
                  : <img src={icon} alt="" className="w-5 h-5 object-contain" />
              ) : (
                <HelpCircle className="w-4 h-4" strokeWidth={1.2} />
              )}
            </div>
            <span>{name}</span>
        </button>
    );
}