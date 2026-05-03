import { SquareArrowRightEnter } from "lucide-react";
import { TechIcon } from "./tech_icon";
import type { TechData } from "../../services/api";
import { recordProjectClick } from "../../services/api";

interface ProjectCardProps {
    id: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    githubUrl: string;
    demoUrl: string;
    technologies: TechData[];
    isLight: boolean;
}

export function ProjectCard({ id, title, description, thumbnailUrl, githubUrl, demoUrl, technologies, isLight }: ProjectCardProps) {
    return (
        <div className="group relative bg-app-sidebar border border-app-border p-3 min-h-90 lg:min-h-100 h-full flex flex-col overflow-hidden">
            <div className="bg-app-sidebar w-full h-40 lg:h-45 flex items-center justify-center overflow-hidden shrink-0">
                {thumbnailUrl && <img src={thumbnailUrl} alt={title} className="w-full h-full object-contain" />}
            </div>
            <h3 className="text-app-text-primary font-bold uppercase mt-2 text-[17px] lg:text-[21px] tracking-wider shrink-0">{title}</h3>
            <div className="whitespace-pre-line text-[11px] lg:text-sm leading-relaxed mt-1 text-app-muted h-14 lg:h-17 overflow-hidden shrink-0">{description}</div>
            <p className="uppercase text-[10px] tracking-wider text-app-accent font-bold mt-2 shrink-0">tech stack</p>
            <div className="w-full grid gap-1.5 mt-1 grid-cols-[repeat(auto-fill,24px)] shrink-0">
                {technologies?.map(tech => (
                    <TechIcon key={tech.name} name={tech.name} iconUrl={tech.iconUrl} color={isLight ? tech.lightColor : tech.darkColor} />
                ))}
            </div>
            <div className="flex justify-end gap-2 mt-auto pt-2 shrink-0">
                {demoUrl && (
                    <button onClick={() => { recordProjectClick(id, "demo"); window.open(demoUrl, "_blank", "noopener,noreferrer"); }} className="text-app-muted bg-app-sidebar border border-app-border px-1.75 py-0.5 flex items-center gap-1 hover:text-app-accent hover:border-app-accent">
                        <SquareArrowRightEnter size={16} strokeWidth={1.5} />
                        <span>Demo</span>
                    </button>
                )}
                {githubUrl && (
                    <button onClick={() => { recordProjectClick(id, "github"); window.open(githubUrl, "_blank", "noopener,noreferrer"); }} className="text-app-muted bg-app-sidebar border border-app-border px-1.75 py-0.5 flex items-center gap-1 hover:text-app-accent hover:border-app-accent">
                        <i className="devicon-github-original text-[14px] leading-none" />
                        <span>Source</span>
                    </button>
                )}
            </div>
        </div>
    );
}