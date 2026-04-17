import { useEffect, useState } from "react";
import { UserRound, X, FileDown, MapPin, Mail, Phone } from "lucide-react";
import { ThemeToggle } from "../components/ui/theme_toggle";
import { TopBarButton } from "../components/ui/top_bar_button";
import { GitHubActivity } from "../components/ui/github_activity";
import { ProjectCard } from "../components/ui/project_card";
import { FilterButton } from "../components/ui/filter_button";
import { TechIcon } from "../components/ui/tech_icon";
import type { ProfileData, TechData, ProjectData } from "../services/api";
import { fetchProfile, fetchFilters, fetchProjects, recordSiteVisit } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [filters, setFilters] = useState<TechData[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasFiltered, setHasFiltered] = useState(false);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        document.title = "Loading...";
        recordSiteVisit();

        const [profileData, filtersData, projectsData] = await Promise.all([
          fetchProfile(),
          fetchFilters(),
          fetchProjects(),
        ]);

        setProfile(profileData);
        if (profileData?.name) {
          document.title = profileData.name + " - Portfolio";
        }
        setFilters(filtersData);
        setProjects(projectsData);
        setIsLoaded(true);
      } catch (err) {
        console.error(err);
        document.title = "Portfolio";
      }
    };

    loadAllData();
  }, []);

  const toggleFilter = (filterName: string, active: boolean) => {
    setHasFiltered(true);
    setActiveFilters(prev =>
      active
        ? [...prev, filterName]
        : prev.filter(f => f !== filterName)
    );
  };

  if (!isLoaded) {
    return <div className="flex h-screen w-screen bg-app-bg"></div>;
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchQuery === "" ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags = activeFilters.length === 0 ||
      project.technologies.some(tech => activeFilters.includes(tech.name));

    return matchesSearch && matchesTags;
  });

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-app-bg relative">

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[min(90vw,22.5rem)] lg:w-90 bg-app-sidebar border-r border-app-border
        transition-transform duration-100 ease-in-out shrink-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0
      `}>
        <div className="p-[clamp(0.5rem,1.5vh,1.5rem)] lg:p-6 flex flex-col h-full overflow-y-auto overflow-x-hidden overscroll-contain scrollbar-none relative">
          <div className="flex-none lg:sticky lg:top-0 bg-app-sidebar z-20">
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-app-muted hover:text-app-accent flex ml-auto">
              <X size={20} />
            </button>
            <div className="border-b border-app-border pb-[clamp(0.5rem,1.5vh,1.5rem)] animate-fade-in-up">
              <img src={profile?.photoUrl} className="rounded-full bg-app-bg w-[clamp(4rem,14vh,12.5rem)] h-[clamp(4rem,14vh,12.5rem)] lg:w-50 lg:h-50 border-2 m-auto border-app-border object-cover" title={`${profile?.name} - ${profile?.title}`} />
              <h1 className="w-full uppercase mt-[clamp(0.375rem,1vh,1rem)] text-app-text-primary text-center tracking-wider font-bold text-[clamp(0.75rem,1.5vh,1rem)] lg:text-base">{profile?.name}</h1>
              <h2 className="w-full uppercase mt-1 text-app-accent text-[clamp(0.5rem,1vh,0.75rem)] lg:text-[12px] text-center font-bold">{profile?.title}</h2>
              <div className="whitespace-pre-line leading-relaxed text-center mt-[clamp(0.5rem,1.2vh,1.25rem)] text-app-muted text-[clamp(0.625rem,1.2vh,0.875rem)] lg:text-sm">
                {profile?.description}
              </div>
            </div>
            <div className="border-b border-app-border pb-[clamp(0.375rem,1.2vh,1.25rem)]">
              <p className="w-full mt-[clamp(0.375rem,1vh,0.75rem)] text-app-text-primary tracking-wider text-[clamp(0.625rem,1.2vh,0.875rem)] lg:text-[14px] ml-5"><MapPin size={16} className="inline mr-2 text-app-accent" />{profile?.location}</p>
              <p className="w-full mt-[clamp(0.25rem,0.8vh,0.5rem)] text-app-text-primary text-[clamp(0.625rem,1.2vh,0.875rem)] lg:text-[14px] ml-5"><Mail size={16} className="inline mr-2 text-app-accent" />{profile?.email}</p>
              <p className="w-full mt-[clamp(0.25rem,0.8vh,0.5rem)] text-app-text-primary text-[clamp(0.625rem,1.2vh,0.875rem)] lg:text-[14px] ml-5"><Phone size={16} className="inline mr-2 text-app-accent" />{profile?.phone}</p>
            </div>
          </div>
          <div className="flex-1 pb-[clamp(0.375rem,1vh,1rem)] pt-[clamp(0.375rem,1vh,1rem)] mb-1 lg:mb-0">
            <h3 className="w-full uppercase mt-2 tracking-wider ml-3 text-[10px] text-app-accent animate-fade-in-left delay-50"><b>languages</b></h3>
            <div className="w-full grid grid-cols-8 gap-2 pl-3 pr-3 mt-2">
              {profile?.languages?.map((tech, i) => <div key={tech.name} className="animate-fade-in-left" style={{ animationDelay: `${50 + (i * 30)}ms` }}><TechIcon name={tech.name} iconUrl={tech.iconUrl} color={isLight ? tech.lightColor : tech.darkColor} /></div>)}
            </div>
            <h3 className="w-full uppercase mt-[clamp(0.75rem,2.5vh,1.5rem)] tracking-wider ml-3 text-[10px] text-app-accent animate-fade-in-left delay-100"><b>frameworks</b></h3>
            <div className="w-full grid grid-cols-8 gap-2 pl-3 pr-3 mt-2">
              {profile?.frameworks?.map((tech, i) => <div key={tech.name} className="animate-fade-in-left" style={{ animationDelay: `${100 + (i * 30)}ms` }}><TechIcon name={tech.name} iconUrl={tech.iconUrl} color={isLight ? tech.lightColor : tech.darkColor} /></div>)}
            </div>
            <h3 className="w-full uppercase mt-[clamp(0.75rem,2.5vh,1.5rem)] tracking-wider ml-3 text-[10px] text-app-accent animate-fade-in-left delay-150"><b>ides & tools</b></h3>
            <div className="w-full grid grid-cols-8 gap-2 pl-3 pr-3 mt-2">
              {profile?.tools?.map((tech, i) => <div key={tech.name} className="animate-fade-in-left" style={{ animationDelay: `${150 + (i * 30)}ms` }}><TechIcon name={tech.name} iconUrl={tech.iconUrl} color={isLight ? tech.lightColor : tech.darkColor} /></div>)}
            </div>
            <h3 className="w-full uppercase mt-[clamp(0.75rem,2.5vh,1.5rem)] tracking-wider ml-3 text-[10px] text-app-accent animate-fade-in-left delay-200"><b>databases</b></h3>
            <div className="w-full grid grid-cols-8 gap-2 pl-3 pr-3 mt-2">
              {profile?.databases?.map((tech, i) => <div key={tech.name} className="animate-fade-in-left" style={{ animationDelay: `${200 + (i * 30)}ms` }}><TechIcon name={tech.name} iconUrl={tech.iconUrl} color={isLight ? tech.lightColor : tech.darkColor} /></div>)}
            </div>
            <h3 className="w-full uppercase mt-[clamp(0.75rem,2.5vh,1.5rem)] tracking-wider ml-3 text-[10px] text-app-accent animate-fade-in-left delay-250"><b>devops</b></h3>
            <div className="w-full grid grid-cols-8 gap-2 pl-3 pr-3 mt-2">
              {profile?.devOps?.map((tech, i) => <div key={tech.name} className="animate-fade-in-left" style={{ animationDelay: `${250 + (i * 30)}ms` }}><TechIcon name={tech.name} iconUrl={tech.iconUrl} color={isLight ? tech.lightColor : tech.darkColor} /></div>)}
            </div>
          </div>
          <div className="flex-none lg:sticky lg:bottom-0 bg-app-sidebar pt-[clamp(0.5rem,1.5vh,1rem)] pl-3 lg:pl-0 border-t border-app-border z-20">
            {profile?.githubUsername && <GitHubActivity isLight={isLight} username={profile.githubUsername} />}
          </div>
        </div>
      </aside>

      <div className="flex flex-col flex-1 min-w-0">
        <header className="h-16 flex items-center justify-between lg:justify-end px-4 lg:px-10 shrink-0 relative z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 bg-app-surface text-app-text-primary hover:text-app-accent"
          >
            <UserRound size={26} />
          </button>

          <TopBarButton title="GitHub" devicon="devicon-github-original" size={24} className="hover:text-app-github-highlight" onClick={() => { window.open(`https://github.com/${profile?.githubUsername}`, "_blank", "noopener,noreferrer") }} />
          <TopBarButton title="LinkedIn" devicon="devicon-linkedin-plain" size={24} className="hover:text-app-linkedin-highlight" onClick={() => { window.open(`https://www.linkedin.com/in/${profile?.linkedinProfile}`, "_blank", "noopener,noreferrer") }} />
          <TopBarButton title="Download CV" icon={FileDown} size={24} className="hover:text-app-accent" onClick={() => {
            if (!profile?.cvUrl) return;
            const link = document.createElement("a");
            link.href = profile.cvUrl;
            link.download = `${profile?.name} - CV.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }} />
          <ThemeToggle size={28} className="lg:ml-5" onToggle={(light) => {
            if (light) {
              document.documentElement.classList.add("light");
            } else {
              document.documentElement.classList.remove("light");
            }

            setIsLight(light);
          }} />
        </header>

        <section className="w-full px-4 lg:px-15 py-6 flex flex-col justify-center shrink-0 bg-app-bg sticky top-0 z-10">
          <h2 className="uppercase text-[10px] tracking-wider mb-1.5 text-app-accent font-bold">filter</h2>
          <div className="relative group mb-3">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-app-accent font-mono text-xs opacity-50 group-focus-within:opacity-100">
              &gt;
            </div>
            <input
              type="text"
              placeholder="SEARCH..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setHasFiltered(true); }}
              className="w-full bg-app-surface border border-app-border py-2 pl-8 pr-4 text-[11px] font-mono text-app-text-primary placeholder:text-app-text-primary/50 focus:outline-none focus:border-app-accent focus:ring-1 focus:ring-app-accent/30 transition-all uppercase tracking-widest"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full">
            {isLoaded && filters.map((tag, i) => (
              <div key={tag.name} className="animate-fade-in-left" style={{ animationDelay: `${i * 30}ms`, animationFillMode: 'both' }}>
                <FilterButton
                  name={tag.name}
                  icon={tag.iconUrl}
                  color={isLight ? tag.lightColor : tag.darkColor}
                  onToggle={(active) => toggleFilter(tag.name, active)}
                />
              </div>
            ))}
          </div>
        </section>

        <main className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-2 lg:px-10 pb-0 w-full mask-[linear-gradient(to_bottom,transparent,black_25px)] custom-scrollbar scrollbar-gutter-stable">
          <section className="w-full py-5 px-2 lg:px-6">
            <motion.div layout className="grid gap-4 lg:gap-6 grid-cols-[repeat(auto-fill,minmax(260px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] w-full">
              <AnimatePresence mode="popLayout">
                {isLoaded && filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0 }
                    }}
                    transition={{
                      opacity: {
                        duration: 0.3,
                        delay: hasFiltered ? 0 : i * 0.04
                      },
                      layout: {
                        duration: 0.3,
                        type: "spring",
                        bounce: 0.15
                      }
                    }}
                  >
                    <ProjectCard
                      id={project.id}
                      title={project.name}
                      description={project.description}
                      thumbnailUrl={project.thumbnailUrl}
                      githubUrl={project.githubUrl}
                      demoUrl={project.demoUrl}
                      technologies={project.technologies}
                      isLight={isLight}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </section>

          <footer className="flex flex-col items-start justify-center shrink-0 mt-10 mb-5 px-2 lg:px-6 gap-2">
            <p className="text-[10px] uppercase tracking-widest text-app-muted opacity-60">
              © {new Date().getFullYear()} Tomasz Jaworski
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
