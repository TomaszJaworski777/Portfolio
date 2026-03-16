import { SquareArrowRightEnter } from "lucide-react";
import { TechIcon } from "./tech_icon";
import type { TechData } from "../../services/api";

interface ProjectCardProps {
    id: number;
    title: string;
    description: string;
    technologies: TechData[];
    isLight: boolean;
}

export function ProjectCard({ title, description, technologies, isLight }: ProjectCardProps) {
    return (
        <div className="group relative bg-app-sidebar border border-app-border p-3 h-100">
            <div className="bg-app-bg w-full h-45" />
            <p className="text-app-text-primary font-bold uppercase mt-2 text-[21px] tracking-wider">{title}</p>
            <div className="whitespace-pre-line text-sm leading-relaxed mt-1 text-app-muted h-17">{description}</div>
            <p className="uppercase text-[10px] tracking-wider text-app-accent font-bold mt-2">tech stack</p>
            <div className="w-full grid gap-1.5 mt-2 grid-cols-[repeat(auto-fill,24px)]">
                {technologies?.map(tech => (
                    <TechIcon key={tech.name} name={tech.name} iconUrl={tech.iconUrl} color={isLight ? tech.lightColor : tech.darkColor} />
                ))}
            </div>
            <div className="flex mt-1 h-7.25">
                <button className="text-app-muted ml-auto border border-app-border pl-1.75 pr-1.75 pb-0.5 flex hover:text-app-accent hover:border-app-accent">
                    <SquareArrowRightEnter size={16} strokeWidth={1.5} className="mt-[5.5px] mr-1" /> Demo
                </button>
                <button className="text-app-muted ml-2 border border-app-border pl-1.75 pr-1.75 pb-0.5 hover:text-app-accent hover:border-app-accent">
                    <i className={`devicon-github-original text-[14px]`} /> Source
                </button>
            </div>
        </div>
    );
}