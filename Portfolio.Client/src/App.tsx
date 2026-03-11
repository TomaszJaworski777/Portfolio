import { useState } from "react";
import { UserRound, X, FileDown } from "lucide-react";
import { ThemeToggle } from "./components/ui/theme_toggle";
import { TopBarButton } from "./components/ui/top_bar_button";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <div className="p-6 flex justify-between items-center">
          <p className="text-[10px] uppercase tracking-widest text-white/20">Sidebar Container</p>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-app-muted hover:text-app-accent">
            <X size={20} />
          </button>
        </div>
      </aside>

      <div className="flex flex-col flex-1 min-w-0">
        <header className="h-16 flex items-center justify-between lg:justify-end px-4 lg:px-10 shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 border border-app-border bg-app-surface text-app-muted hover:text-app-accent"
          >
            <UserRound size={20} />
          </button>

          <TopBarButton devicon="devicon-github-original" size={24} className="hover:text-app-github-highlight" onClick={() => {window.open("https://github.com/TomaszJaworski777", "_blank", "noopener,noreferrer")}}/>
          <TopBarButton devicon="devicon-linkedin-plain" size={24} className="hover:text-app-linkedin-highlight"onClick={() => {window.open("https://www.linkedin.com/in/tomasz-jaworski-4217bb176/", "_blank", "noopener,noreferrer")}}/>
          <TopBarButton icon={FileDown} size={24} className="hover:text-app-accent"/>
          <ThemeToggle size={28} className="ml-5" onToggle={(light) => {
              if (light) {
                document.documentElement.classList.add("light");
              } else { 
                document.documentElement.classList.remove("light");
              }
          }} />
        </header>

        <section className="h-24 px-6 lg:px-10 flex flex-col justify-center shrink-0">
          <p className="text-[10px] uppercase tracking-widest text-white/20">Filter Bar (Search + Toggles)</p>
        </section>

        <main className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10">
          <div className="h-500 w-full border border-dashed border-app-border flex items-start justify-center pt-20">
            <p className="text-[10px] uppercase tracking-widest text-white/20">Main Content (Scrollable Area)</p>
          </div>
        </main>

        <footer className="h-10 border-t border-app-border flex items-center justify-between px-6 lg:px-10 shrink-0">
          <p className="text-[10px] uppercase tracking-widest text-white/20">Footer Container</p>
        </footer>
      </div>
    </div>
  );
}