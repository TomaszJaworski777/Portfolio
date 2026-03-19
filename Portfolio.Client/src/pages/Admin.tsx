import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { User, Briefcase, Cpu, Home, LogOut } from "lucide-react";
import AdminProfile from "../components/admin/AdminProfile";
import AdminProjects from "../components/admin/AdminProjects";
import AdminTechnologies from "../components/admin/AdminTechnologies";
import { ThemeToggle } from "../components/ui/theme_toggle";
import { fetchProfile, type ProfileData } from "../services/api";

export default function Admin() {
  const location = useLocation();

  const [profile, setProfile] = useState<ProfileData | null>(null);

  const loadAllData = async () => {
    try {
      const [profileData] = await Promise.all([
        fetchProfile(),
      ]);

      setProfile(profileData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const navItems = [
    { name: "Profile", path: "/admin/profile", icon: User },
    { name: "Projects", path: "/admin/projects", icon: Briefcase },
    { name: "Technologies", path: "/admin/tech", icon: Cpu },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-app-bg relative">
      <aside className="fixed inset-y-0 left-0 z-50 w-90 bg-app-sidebar border-r border-app-border transition-transform duration-100 ease-in-out shrink-0 lg:relative lg:translate-x-0">
        <div className="p-6 flex flex-col h-full">
          <div className="flex-1">
            <div className="border-b border-app-border pb-6 animate-fade-in-up">
              <img src={profile?.photoUrl} className="rounded-full bg-app-bg w-32 h-32 border-2 m-auto border-app-border object-cover" alt="Admin Profile" />
              <p className="w-full uppercase mt-4 text-app-text-primary text-center tracking-widest font-bold">Admin Panel</p>
              <p className="w-full uppercase mt-1 text-app-accent text-[12px] text-center font-bold">authenticated</p>
            </div>

            <nav className="mt-8 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 transition-all uppercase text-[11px] font-bold tracking-[0.2em] border-l-2 ${isActive
                      ? "bg-app-accent/10 text-app-accent border-app-accent rounded-none"
                      : "text-app-muted border-transparent hover:text-app-accent hover:bg-app-accent/5 rounded-none"
                      }`}
                  >

                    <item.icon size={16} strokeWidth={1.5} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto pt-3 border-t border-app-border space-y-0">
            <Link to="/" className="flex items-center gap-3 px-4 py-2 text-app-muted hover:text-app-accent transition-all uppercase text-[11px] font-bold tracking-[0.2em] rounded-none">
              <Home size={16} strokeWidth={1.5} />
              Back to Site
            </Link>
            <button
              onClick={() => alert("Logout clicked")}
              className="w-full flex items-center gap-3 px-4 py-2 text-app-muted hover:text-red-500 transition-all uppercase text-[11px] font-bold tracking-[0.2em] rounded-none"
            >
              <LogOut size={16} strokeWidth={1.5} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="flex flex-col flex-1 min-w-0">
        <header className="h-16 flex items-center justify-between lg:justify-end px-4 lg:px-10 shrink-0">
          <ThemeToggle size={28} onToggle={(light) => {
            if (light) document.documentElement.classList.add("light");
            else document.documentElement.classList.remove("light");
          }} />
        </header>

        <main className="flex-1 overflow-hidden px-10 pb-10">
          <div className="h-full border border-app-border bg-app-sidebar flex flex-col shadow-2xl animate-fade-in rounded-none">
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <Routes>
                <Route path="profile" element={<AdminProfile onUpdate={loadAllData} />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="tech" element={<AdminTechnologies />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
