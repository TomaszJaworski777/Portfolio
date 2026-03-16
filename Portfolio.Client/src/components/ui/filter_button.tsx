import { useState } from "react";

interface FilterButtonProps {
    name: string;
    icon: string;
    color: string;
    onToggle: (active: boolean) => void;
}

export function FilterButton({ name, icon, color, onToggle }: FilterButtonProps) {
    const [active, setActive] = useState(false);

    return (
        <button
            key={name}
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
                setActive(newState);
                onToggle(newState);
            }}
        >
            <img
                src={icon}
                alt=""
                className={`w-5 h-5`}
            />
            <span>{name}</span>
        </button>
    );
}