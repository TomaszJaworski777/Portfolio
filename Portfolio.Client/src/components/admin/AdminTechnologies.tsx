import { useState, useEffect } from "react";
import { fetchTechnologies, addTechnology, updateTechnology, deleteTechnology, type TechData } from "../../services/api";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Plus, Trash, Edit2, X } from "lucide-react";

export default function AdminTechnologies() {
  const [techs, setTechs] = useState<TechData[]>([]);
  const [editingTech, setEditingTech] = useState<TechData | null>(null);
  const [originalName, setOriginalName] = useState<string>("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchTechnologies().then(data => {
      setTechs(data);
    });
  }, []);

  const handleEdit = (tech: TechData) => {
    setEditingTech({ ...tech });
    setOriginalName(tech.name);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setEditingTech({
      name: "",
      iconUrl: "",
      category: "language",
      lightColor: "#000000",
      darkColor: "#ffffff"
    });
    setOriginalName("");
    setIsAdding(true);
  };

  const handleDelete = async (name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      await deleteTechnology(name);
      setTechs(techs.filter(t => t.name !== name));
    } catch (error) {
      console.error(error);
      alert("Failed to delete technology.");
    }
  };

  const handleSave = async () => {
    if (!editingTech) return;
    try {
      if (isAdding) {
        await addTechnology(editingTech);
        alert("Technology added successfully!");
      } else {
        await updateTechnology(originalName, editingTech);
        alert("Technology updated successfully!");
      }
      setEditingTech(null);
      fetchTechnologies().then(setTechs);
    } catch (error) {
      console.error(error);
      alert("Failed to save technology.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end mb-4 px-0">
        <button onClick={handleAdd} className="text-app-muted hover:text-app-accent transition-all uppercase text-[10px] font-bold tracking-widest flex items-center gap-2 h-full px-2">
          <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Add Technology
        </button>
      </div>

      {editingTech && (
        <Card className="bg-transparent border border-app-border ring-0 text-app-text-primary rounded-none shadow-none px-0 pt-0 pb-4 gap-0">
          <div className="flex items-center justify-between border-b border-app-border px-4 h-10 mb-4">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-app-muted font-bold leading-none">
              {isAdding ? "New Technology" : `Edit: ${editingTech.name}`}
            </h3>
            <button onClick={() => setEditingTech(null)} className="text-app-muted hover:text-app-accent transition-all ring-0 flex items-center justify-center">
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
          <CardContent className="space-y-8">
            <div className="space-y-6 max-w-2xl">
              <div className="space-y-4">
                <div className="flex items-start gap-8">
                  <div className="flex flex-col gap-4 shrink-0">
                    <div className="relative mt-5 group w-24 h-24 border border-app-border bg-app-bg flex items-center justify-center overflow-hidden shadow-inner ring-offset-4 ring-offset-app-bg group-hover:ring-1 ring-app-accent/20 transition-all">
                      {editingTech.iconUrl ? (
                        <>
                          {editingTech.iconUrl.startsWith('devicon-')
                            ? <i className={`${editingTech.iconUrl} text-5xl transition-transform group-hover:scale-110`} style={{ color: editingTech.darkColor }}></i>
                            : <img src={editingTech.iconUrl} className="w-16 h-16 object-contain transition-transform group-hover:scale-110" />
                          }
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button
                              onClick={() => document.getElementById('icon-upload')?.click()}
                              className="p-2 bg-app-accent/20 border border-app-accent text-app-accent hover:bg-app-accent/30 transition-all rounded-none"
                              title="Change Icon"
                            >
                              <Plus size={18} strokeWidth={2} />
                            </button>
                            <button
                              onClick={() => setEditingTech({ ...editingTech, iconUrl: "" })}
                              className="p-2 bg-red-500/10 border border-red-500 text-red-500 hover:bg-red-500/20 transition-all rounded-none"
                              title="Remove Icon"
                            >
                              <Trash size={18} strokeWidth={2} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <button
                          onClick={() => document.getElementById('icon-upload')?.click()}
                          className="flex flex-col items-center gap-1.5 text-app-muted hover:text-app-accent transition-all group-hover:scale-110"
                        >
                          <Plus size={28} strokeWidth={1} />
                          <span className="text-[9px] uppercase tracking-widest font-bold text-center">Icon</span>
                        </button>
                      )}
                    </div>
                    <input id="icon-upload" type="file" accept="image/*" className="hidden" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const localUrl = URL.createObjectURL(file);
                        setEditingTech({ ...editingTech, iconUrl: localUrl });
                      }
                    }} />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-app-muted uppercase text-[10px] font-bold tracking-widest block mb-1.5">Tech Name</Label>
                        <Input value={editingTech.name} onChange={e => setEditingTech({ ...editingTech, name: e.target.value })} className="h-10 bg-app-bg border-app-border rounded-none text-app-text-primary ring-0 focus-visible:ring-0 focus-visible:border-app-accent px-3 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-app-muted uppercase text-[10px] font-bold tracking-widest block mb-1.5">Category</Label>
                        <select
                          value={editingTech.category}
                          onChange={e => setEditingTech({ ...editingTech, category: e.target.value })}
                          className="w-full h-10 bg-app-bg border border-app-border px-3 text-sm text-app-text-primary outline-none focus:border-app-accent rounded-none appearance-none transition-all"
                        >
                          <option value="language">Languages</option>
                          <option value="framework">Frameworks</option>
                          <option value="ides & tools">Tools</option>
                          <option value="database">Databases</option>
                          <option value="devops">DevOps</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[9px] text-app-muted uppercase tracking-tighter block mb-1">Manual Icon URL / Devicon Class</Label>
                      <Input
                        value={editingTech.iconUrl}
                        onChange={e => setEditingTech({ ...editingTech, iconUrl: e.target.value })}
                        placeholder="devicon-react-original or https://..."
                        className="h-10 bg-app-bg border-app-border rounded-none text-app-text-primary ring-0 focus-visible:ring-0 focus-visible:border-app-accent px-3 transition-all font-mono text-xs w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <Label className="text-app-muted uppercase text-[10px] font-bold tracking-widest block mb-1.5">Brand Identity Colors</Label>
                <div className="grid grid-cols-2 gap-8 max-w-lg">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-app-border shrink-0 shadow-inner group relative overflow-hidden">
                        <input type="color" value={editingTech.lightColor} onChange={e => setEditingTech({ ...editingTech, lightColor: e.target.value })} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10" />
                        <div className="absolute inset-0" style={{ backgroundColor: editingTech.lightColor }}></div>
                      </div>
                      <div className="flex-1 space-y-1">
                        <span className="text-[9px] uppercase text-app-muted font-bold tracking-tighter block">Light Theme</span>
                        <Input value={editingTech.lightColor} onChange={e => setEditingTech({ ...editingTech, lightColor: e.target.value })} className="h-8 bg-app-bg border-app-border rounded-none text-[11px] font-mono ring-0 focus-visible:ring-0 focus-visible:border-app-accent px-2 transition-all w-full" placeholder="#HEX" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-app-border shrink-0 shadow-inner group relative overflow-hidden">
                        <input type="color" value={editingTech.darkColor} onChange={e => setEditingTech({ ...editingTech, darkColor: e.target.value })} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10" />
                        <div className="absolute inset-0" style={{ backgroundColor: editingTech.darkColor }}></div>
                      </div>
                      <div className="flex-1 space-y-1">
                        <span className="text-[9px] uppercase text-app-muted font-bold tracking-tighter block">Dark Theme</span>
                        <Input value={editingTech.darkColor} onChange={e => setEditingTech({ ...editingTech, darkColor: e.target.value })} className="h-8 bg-app-bg border-app-border rounded-none text-[11px] font-mono ring-0 focus-visible:ring-0 focus-visible:border-app-accent px-2 transition-all w-full" placeholder="#HEX" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-app-border/30">
              <button onClick={handleSave} className="w-fit px-12 h-10 text-app-muted border border-app-border hover:text-app-accent hover:border-app-accent transition-all uppercase tracking-[0.2em] font-bold text-[10px] rounded-none shadow-lg hover:shadow-app-accent/5">
                Save Changes
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      <Table className="border border-app-border text-app-text-primary">
        <TableHeader>
          <TableRow className="border-app-border hover:bg-transparent">
            <TableHead className="text-app-muted uppercase text-[10px] tracking-widest pl-4 font-bold">Preview</TableHead>
            <TableHead className="text-app-muted uppercase text-[10px] tracking-widest font-bold">Name</TableHead>
            <TableHead className="text-app-muted uppercase text-[10px] tracking-widest font-bold">Category</TableHead>
            <TableHead className="text-app-muted uppercase text-[10px] tracking-widest font-bold">Colors</TableHead>
            <TableHead className="text-right text-app-muted uppercase text-[10px] tracking-widest pr-4 font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {techs.map(tech => (
            <TableRow key={tech.name} className="border-app-border hover:bg-transparent">
              <TableCell className="pl-4 py-1">
                <div className="w-10 h-10 flex items-center justify-center" style={{ color: tech.darkColor }}>
                  {tech.iconUrl.startsWith('devicon-')
                    ? <i className={`${tech.iconUrl} text-2xl`}></i>
                    : <img src={tech.iconUrl} className="w-8 h-8 object-contain" />
                  }
                </div>
              </TableCell>
              <TableCell className="font-medium text-app-text-primary text-sm uppercase tracking-wider py-1">{tech.name}</TableCell>
              <TableCell className="text-app-muted text-[10px] uppercase font-bold tracking-tighter py-1">{tech.category}</TableCell>
              <TableCell className="py-1">
                <div className="flex gap-1.5">
                  <div className="w-4 h-4 border border-app-border" style={{ backgroundColor: tech.lightColor }} title={`Light: ${tech.lightColor}`}></div>
                  <div className="w-4 h-4 border border-app-border" style={{ backgroundColor: tech.darkColor }} title={`Dark: ${tech.darkColor}`}></div>
                </div>
              </TableCell>
              <TableCell className="text-right space-x-2 pr-4 py-1">
                <button onClick={() => handleEdit(tech)} className="text-app-muted border border-app-muted p-1.5 hover:text-app-accent hover:border-app-accent transition-all rounded-none">
                  <Edit2 className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button onClick={() => handleDelete(tech.name)} className="text-app-muted border border-app-muted p-1.5 hover:text-red-500 hover:border-red-500 transition-all rounded-none">
                  <Trash className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
