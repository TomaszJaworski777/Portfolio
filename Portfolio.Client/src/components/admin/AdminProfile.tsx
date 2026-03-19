import { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";
import { fetchProfile, updateProfile, type ProfileData, type TechData, fetchTechnologies } from "../../services/api";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";

export default function AdminProfile({ onUpdate }: { onUpdate?: () => void }) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [allTech, setAllTech] = useState<TechData[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([fetchProfile(), fetchTechnologies()]).then(([profileData, techData]) => {
      setProfile(profileData);
      setAllTech(techData);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!profile) return;
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const getProfileCollectionForCategory = (category: string): keyof ProfileData => {
    switch (category.toLowerCase()) {
      case "language": return "languages";
      case "framework": return "frameworks";
      case "ides & tools": return "tools";
      case "database": return "databases";
      case "devops": return "devOps";
      default: return "languages";
    }
  };

  const toggleTech = (tech: TechData) => {
    if (!profile) return;
    const collectionKey = getProfileCollectionForCategory(tech.category);
    const collection = profile[collectionKey] as TechData[];

    const isSelected = collection.some(t => t.name === tech.name);
    const newCollection = isSelected
      ? collection.filter(t => t.name !== tech.name)
      : [...collection, tech];

    setProfile({ ...profile, [collectionKey]: newCollection });
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      await updateProfile(profile);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const categories = ["language", "framework", "ides & tools", "database", "devops"];

  return (
    <Card className="bg-transparent border-none ring-0 text-app-text-primary rounded-none shadow-none px-0 pt-0 pb-4 gap-0">
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-12 xl:col-span-7 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-10">
                <div className="flex flex-col gap-4 shrink-0">
                  <div className="relative mt-3 group w-32 h-32 rounded-full border border-app-border bg-app-bg flex items-center justify-center overflow-hidden shadow-inner ring-offset-4 ring-offset-app-bg group-hover:ring-1 ring-app-accent/20 transition-all">
                    {profile?.photoUrl ? (
                      <>
                        <img src={profile.photoUrl} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                          <button
                            onClick={() => document.getElementById('photo-upload')?.click()}
                            className="p-2 bg-app-accent/20 border border-app-accent text-app-accent hover:bg-app-accent/30 transition-all rounded-none"
                            title="Edit Image"
                          >
                            <Plus size={20} strokeWidth={1.5} />
                          </button>
                          <button
                            onClick={() => setProfile({ ...profile, photoUrl: "" })}
                            className="p-2 bg-red-500/10 border border-red-500 text-red-500 hover:bg-red-500/20 transition-all rounded-none"
                            title="Remove Image"
                          >
                            <Trash size={20} strokeWidth={1.5} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={() => document.getElementById('photo-upload')?.click()}
                        className="flex flex-col items-center gap-2 text-app-muted hover:text-app-accent transition-all group-hover:scale-110"
                      >
                        <Plus size={32} strokeWidth={1} />
                        <span className="text-[10px] uppercase tracking-widest font-bold text-center">Upload Photo</span>
                      </button>
                    )}
                  </div>
                  <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const localUrl = URL.createObjectURL(file);
                      if (profile) {
                        setProfile({ ...profile, photoUrl: localUrl });
                      }
                    }
                  }} />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-app-muted uppercase text-[10px] tracking-widest font-bold block mb-1.5">Full Name</Label>
                    <Input id="name" name="name" value={profile?.name} onChange={handleChange} className="bg-app-bg border-app-border rounded-none text-app-text-primary ring-0 focus-visible:ring-0 focus-visible:border-app-accent h-10 px-3 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-app-muted uppercase text-[10px] tracking-widest font-bold block mb-1.5">Professional Title</Label>
                    <Input id="title" name="title" value={profile?.title} onChange={handleChange} className="bg-app-bg border-app-border rounded-none text-app-text-primary ring-0 focus-visible:ring-0 focus-visible:border-app-accent h-10 px-3 transition-all" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[9px] text-app-muted uppercase tracking-tighter block mb-1">Manual Photo URL</Label>
              <Input
                name="photoUrl"
                value={profile?.photoUrl}
                onChange={handleChange}
                className="h-7 bg-app-bg border border-app-border text-[11px] font-mono rounded-none ring-0 focus-visible:ring-0 focus-visible:border-app-accent transition-all max-w-lg px-2"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="space-y-2 pt-2">
              <Label htmlFor="description" className="text-app-muted uppercase text-[10px] tracking-widest font-bold block mb-1.5">Bio / Description</Label>
              <Textarea id="description" name="description" value={profile?.description} onChange={handleChange} className="bg-app-bg border-app-border min-h-37.5 rounded-none text-app-text-primary ring-0 focus-visible:ring-0 focus-visible:border-app-accent p-3 transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-app-muted uppercase text-[10px] tracking-widest font-bold block mb-1.5">Location</Label>
                <Input id="location" name="location" value={profile?.location} onChange={handleChange} className="bg-app-bg border-app-border rounded-none text-app-text-primary ring-0 focus-visible:ring-0 focus-visible:border-app-accent h-10 px-3 transition-all" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-app-muted uppercase text-[10px] tracking-widest font-bold block mb-1.5">Phone Number</Label>
                <Input id="phone" name="phone" value={profile?.phone} onChange={handleChange} className="bg-app-bg border-app-border rounded-none text-app-text-primary ring-0 focus-visible:ring-0 focus-visible:border-app-accent h-10 px-3 transition-all" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-5 space-y-8">
            <div className="space-y-8">
              {categories.map(category => {
                const techsInCategory = allTech.filter(t => t.category.toLowerCase() === category.toLowerCase());
                if (techsInCategory.length === 0) return null;

                const collectionKey = getProfileCollectionForCategory(category);
                const selectedInProfile = profile?.[collectionKey] as TechData[];

                return (
                  <div key={category} className="space-y-3">
                    <Label className="text-app-muted uppercase text-[9px] font-bold tracking-[0.2em] opacity-80">{category}</Label>
                    <div className="flex flex-wrap gap-2">
                      {techsInCategory.map(tech => {
                        const isActive = selectedInProfile?.some(t => t.name === tech.name);
                        return (
                          <button
                            key={tech.name}
                            onClick={() => toggleTech(tech)}
                            style={{
                              "--tag-color": tech.darkColor,
                              "--active-bg": `color-mix(in srgb, ${tech.darkColor}, transparent 80%)`
                            } as React.CSSProperties}
                            className={`
                              group flex items-center gap-1 pr-1.5 pl-1 py-1 border transition-all duration-200
                              text-[14px] uppercase tracking-wide cursor-pointer rounded-none
                              hover:border-(--tag-color) hover:text-(--tag-color)
                              hover:shadow-[0_0_15px_color-mix(in_srgb,var(--tag-color),transparent_85%)]
                              ${isActive
                                ? "bg-(--active-bg) border-(--tag-color) text-(--tag-color)"
                                : "bg-app-surface border-app-border text-app-muted"
                              }
                            `}
                          >
                            <div className="flex items-center justify-center w-5 h-5 shrink-0">
                              {tech.iconUrl.startsWith('devicon-')
                                ? <i className={`${tech.iconUrl} text-[16px]`}></i>
                                : <img src={tech.iconUrl} className="w-4 h-4 object-contain" />
                              }
                            </div>
                            <span>{tech.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-app-border/30">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-fit px-12 h-10 text-app-muted border border-app-border hover:text-app-accent hover:border-app-accent disabled:opacity-50 transition-all uppercase tracking-[0.2em] font-bold text-[10px] rounded-none"
          >
            {saving ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
