import { useState, useEffect } from "react";
import { fetchProfile, updateProfile, type ProfileData } from "../../services/api";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";

export default function AdminProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile().then(data => {
      setProfile(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!profile) return;
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      await updateProfile(profile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile data found.</div>;

  return (
    <Card className="bg-transparent border-none ring-0 text-app-text-primary rounded-none shadow-none px-0 pt-0 pb-4 gap-0">
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-app-muted uppercase text-[10px] tracking-widest font-bold">Name</Label>
          <Input id="name" name="name" value={profile.name} onChange={handleChange} className="bg-app-bg border-app-border rounded-none text-app-text-primary ring-0 focus-visible:ring-0 focus-visible:border-app-accent" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title" className="text-app-muted uppercase text-[10px] tracking-widest font-bold">Title</Label>
          <Input id="title" name="title" value={profile.title} onChange={handleChange} className="bg-app-bg border-app-border rounded-none text-app-text-primary ring-0 focus-visible:ring-0 focus-visible:border-app-accent" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-app-muted uppercase text-[10px] tracking-widest font-bold">Description</Label>
          <Textarea id="description" name="description" value={profile.description} onChange={handleChange} className="bg-app-bg border-app-border min-h-[100px] rounded-none text-app-text-primary ring-0 focus-visible:ring-0 focus-visible:border-app-accent" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-app-muted uppercase text-[10px] tracking-widest font-bold">Location</Label>
            <Input id="location" name="location" value={profile.location} onChange={handleChange} className="bg-app-bg border-app-border rounded-none text-app-text-primary ring-0 focus-visible:ring-0 focus-visible:border-app-accent" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-app-muted uppercase text-[10px] tracking-widest font-bold">Phone</Label>
            <Input id="phone" name="phone" value={profile.phone} onChange={handleChange} className="bg-app-bg border-app-border rounded-none text-app-text-primary ring-0 focus-visible:ring-0 focus-visible:border-app-accent" />
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-fit px-10 text-app-muted border border-app-border py-2.5 hover:text-app-accent hover:border-app-accent disabled:opacity-50 transition-all uppercase tracking-[0.2em] font-bold text-[10px] rounded-none"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
