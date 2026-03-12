import { useState } from "react";
import { UserRound, X, FileDown, MapPin, Phone } from "lucide-react";
import { ThemeToggle } from "./components/ui/theme_toggle";
import { TopBarButton } from "./components/ui/top_bar_button";
import { GitHubActivity } from "./components/ui/github_activity";
import { ProjectCard } from "./components/ui/project_card";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-app-bg relative">
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-90 bg-app-sidebar border-r border-app-border 
        transition-transform duration-100 ease-in-out shrink-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0
      `}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex-1">
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-app-muted hover:text-app-accent flex ml-auto">
              <X size={20} />
            </button>
            <div className="border-b border-app-border pb-6">
              <div className="rounded-full bg-app-bg w-50 h-50 border-2 m-auto border-app-border"></div>
              <p className="w-full uppercase mt-4 text-app-text-primary text-center tracking-wider"><b>tomasz jaworski</b></p>
              <p className="w-full uppercase mt-1 text-app-accent text-[12px] text-center"><b>Software Engineer</b></p>
              <div className="whitespace-pre-line text-sm leading-relaxed text-center mt-5 text-app-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              </div>
            </div>
            <div className="border-b border-app-border pb-5">
              <p className="w-full mt-3 text-app-text-primary tracking-wider text-[14px] ml-5"><MapPin size={16} className="inline mr-2 text-app-accent" /> Cracow, Poland (GMT+1/2)</p>
              <p className="w-full mt-2 text-app-text-primary text-[14px] ml-5"><Phone size={16} className="inline mr-2 text-app-accent" /> (+48) 798 412 800</p>
            </div>
            <div>
              <p className="w-full uppercase mt-5 tracking-wider ml-3 text-[10px] text-app-accent"><b>languages</b></p>
              <div className="w-full grid grid-cols-8 gap-2 pl-3 pr-3  mt-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" />  
                <img src="src/assets/rust.svg" />  
              </div>
              <p className="w-full uppercase mt-6 tracking-wider ml-3 text-[10px] text-app-accent"><b>frameworks</b></p>
              <div className="w-full grid grid-cols-8 gap-2 pl-3 pr-3  mt-2"> 
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg" />
              </div>
              <p className="w-full uppercase mt-6 tracking-wider ml-3 text-[10px] text-app-accent"><b>ides & tools</b></p>
              <div className="w-full grid grid-cols-8 gap-2 pl-3 pr-3 mt-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-original.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rider/rider-original.svg" />
                <img src="src/assets/antigravity.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg" />
              </div>
              <p className="w-full uppercase mt-6 tracking-wider ml-3 text-[10px] text-app-accent"><b>devops</b></p>
              <div className="w-full grid grid-cols-8 gap-2 pl-3 pr-3 mt-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />
              </div>
            </div>
          </div>
          <GitHubActivity isLight={isLight}/>
        </div>
      </aside>

      <div className="flex flex-col flex-1 min-w-0">
        <header className="h-16 flex items-center justify-between lg:justify-end px-4 lg:px-10 shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 bg-app-surface text-app-text-primary hover:text-app-accent"
          >
            <UserRound size={26} />
          </button>

          <TopBarButton devicon="devicon-github-original" size={24} className="hover:text-app-github-highlight" onClick={() => {window.open("https://github.com/TomaszJaworski777", "_blank", "noopener,noreferrer")}}/>
          <TopBarButton devicon="devicon-linkedin-plain" size={24} className="hover:text-app-linkedin-highlight"onClick={() => {window.open("https://www.linkedin.com/in/tomasz-jaworski-4217bb176/", "_blank", "noopener,noreferrer")}}/>
          <TopBarButton icon={FileDown} size={24} className="hover:text-app-accent"/>
          <ThemeToggle size={28} className="lg:ml-5" onToggle={(light) => {
            if (light) {
              document.documentElement.classList.add("light");
            } else { 
              document.documentElement.classList.remove("light");
            }

            setIsLight(light);
          }} />
        </header>

        <section className="h-24 px-6 lg:px-10 flex flex-col justify-center shrink-0">
          <p className="text-[10px] uppercase tracking-widest text-white/20">Filter Bar (Search + Toggles)</p>
        </section>

        <main className="flex-1 overflow-y-auto px-6 lg:px-10 pb-0 w-full mask-[linear-gradient(to_bottom,transparent,black_25px)] custom-scrollbar scrollbar-gutter-stable">
          <div className="w-full py-5 px-6">
            <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(350px,1fr))] w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((i) => (
                <ProjectCard 
                  key={i} 
                  id={i} 
                  title="project title" 
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
              ))}
            </div>
          </div>

          <footer className="h-20 flex items-center justify-between shrink-0 mt-10 mb-5 border border-app-border">
            <p className="text-[10px] uppercase tracking-widest text-white/20 px-6">Footer Container</p>
          </footer>
        </main>
      </div>
    </div>
  );
}