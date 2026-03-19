import { useState, useEffect } from "react";
import { fetchProjects, addProject, updateProject, deleteProject, fetchFilters, type ProjectData, type TechData } from "../../services/api";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Plus, Trash, Edit2, X } from "lucide-react";

export default function AdminProjects() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [allTech, setAllTech] = useState<TechData[]>([]);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Promise.all([fetchProjects(), fetchFilters()]).then(([projectsData, techData]) => {
      setProjects(projectsData);
      setAllTech(techData);
    });
  }, []);

  const handleEdit = (project: ProjectData) => {
    setEditingProject({ ...project });
    setIsAdding(false);
  };

  const handleAdd = () => {
    setEditingProject({
      id: 0,
      name: "",
      description: "",
      thumbnailUrl: "",
      githubUrl: "",
      demoUrl: "",
      technologies: []
    });
    setIsAdding(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete project.");
    }
  };

  const handleSave = async () => {
    if (!editingProject) return;
    try {
      if (isAdding) {
        await addProject(editingProject);
        alert("Project added successfully!");
      } else {
        await updateProject(editingProject.id, editingProject);
        alert("Project updated successfully!");
      }
      setEditingProject(null);
      fetchProjects().then(setProjects);
    } catch (error) {
      console.error(error);
      alert("Failed to save project.");
    }
  };

  const toggleTech = (tech: TechData) => {
    if (!editingProject) return;
    const isSelected = editingProject.technologies.some(t => t.name === tech.name);
    const newTechs = isSelected
      ? editingProject.technologies.filter(t => t.name !== tech.name)
      : [...editingProject.technologies, tech];
    setEditingProject({ ...editingProject, technologies: newTechs });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end mb-4 px-0">
        <button onClick={handleAdd} className="text-app-muted hover:text-app-accent transition-all uppercase text-[10px] font-bold tracking-widest flex items-center gap-2 h-full px-2">
          <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Add Project
        </button>
      </div>

      {editingProject && (
        <Card className="bg-transparent border border-app-border ring-0 text-app-text-primary rounded-none shadow-none px-0 pt-0 pb-4 gap-0">
          <div className="flex items-center justify-between border-b border-app-border px-4 h-10 mb-4">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-app-muted font-bold leading-none">
              {isAdding ? "New Project" : `Edit: ${editingProject.name}`}
            </h3>
            <button onClick={() => setEditingProject(null)} className="text-app-muted hover:text-app-accent transition-all ring-0 flex items-center justify-center">
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <Label className="text-app-muted uppercase text-[10px] font-bold tracking-widest block mb-1.5">Project Thumbnail</Label>
                  <div className="flex flex-col gap-4">
                    <div className="relative group w-full aspect-video border border-app-border bg-app-bg flex items-center justify-center overflow-hidden shadow-inner uppercase">
                      {editingProject.thumbnailUrl ? (
                        <>
                          <img src={editingProject.thumbnailUrl} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <button
                              onClick={() => document.getElementById('thumbnail-upload')?.click()}
                              className="p-2 bg-app-accent/20 border border-app-accent text-app-accent hover:bg-app-accent/30 transition-all rounded-none"
                              title="Edit Image"
                            >
                              <Plus size={20} strokeWidth={1.5} />
                            </button>
                            <button
                              onClick={() => setEditingProject({ ...editingProject, thumbnailUrl: "" })}
                              className="p-2 bg-red-500/10 border border-red-500 text-red-500 hover:bg-red-500/20 transition-all rounded-none"
                              title="Remove Image"
                            >
                              <Trash size={20} strokeWidth={1.5} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <button
                          onClick={() => document.getElementById('thumbnail-upload')?.click()}
                          className="flex flex-col items-center gap-2 text-app-muted hover:text-app-accent transition-all group-hover:scale-110"
                        >
                          <Plus size={32} strokeWidth={1} />
                          <span className="text-[10px] uppercase tracking-widest font-bold text-center">Upload Image</span>
                        </button>
                      )}
                    </div>

                    <input
                      id="thumbnail-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const localUrl = URL.createObjectURL(file);
                          setEditingProject({ ...editingProject, thumbnailUrl: localUrl });
                        }
                      }}
                    />

                    <div className="space-y-2">
                      <Label className="text-[9px] text-app-muted uppercase tracking-tighter block mb-1">Manual URL</Label>
                      <Input
                        value={editingProject.thumbnailUrl}
                        onChange={e => setEditingProject({ ...editingProject, thumbnailUrl: e.target.value })}
                        className="h-7 bg-app-bg border border-app-border text-[11px] font-mono rounded-none ring-0 focus-visible:ring-0 focus-visible:border-app-accent transition-all px-2"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <Label className="text-app-muted uppercase text-[10px] font-bold tracking-widest block mb-1.5">Project Name</Label>
                  <Input value={editingProject.name} onChange={e => setEditingProject({ ...editingProject, name: e.target.value })} className="h-10 bg-app-bg border-app-border rounded-none text-app-text-primary ring-0 focus-visible:ring-0 focus-visible:border-app-accent px-3 transition-all" />
                </div>

                <div className="space-y-2">
                  <Label className="text-app-muted uppercase text-[10px] font-bold tracking-widest block mb-1.5">Project Description</Label>
                  <Textarea value={editingProject.description} onChange={e => setEditingProject({ ...editingProject, description: e.target.value })} className="bg-app-bg border-app-border min-h-[120px] rounded-none text-app-text-primary ring-0 focus-visible:ring-0 focus-visible:border-app-accent p-3 transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-app-muted uppercase text-[10px] font-bold tracking-widest block mb-1.5">GitHub Source</Label>
                    <Input value={editingProject.githubUrl} onChange={e => setEditingProject({ ...editingProject, githubUrl: e.target.value })} className="h-10 bg-app-bg border-app-border rounded-none text-app-text-primary ring-0 focus-visible:ring-0 focus-visible:border-app-accent px-3 transition-all" placeholder="https://github.com/..." />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-app-muted uppercase text-[10px] font-bold tracking-widest block mb-1.5">Live Demo</Label>
                    <Input value={editingProject.demoUrl} onChange={e => setEditingProject({ ...editingProject, demoUrl: e.target.value })} className="h-10 bg-app-bg border-app-border rounded-none text-app-text-primary ring-0 focus-visible:ring-0 focus-visible:border-app-accent px-3 transition-all" placeholder="https://..." />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label className="text-app-muted uppercase text-[10px] font-bold tracking-widest block mb-1.5">Assign Technologies</Label>
                  <div className="flex flex-wrap gap-2">
                    {allTech.map(tech => {
                      const isActive = editingProject.technologies.some(t => t.name === tech.name);
                      return (
                        <button
                          key={tech.name}
                          onClick={() => toggleTech(tech)}
                          style={{
                            "--tag-color": tech.darkColor,
                            "--active-bg": `color-mix(in srgb, ${tech.darkColor}, transparent 80%)`
                          } as React.CSSProperties}
                          className={`
                            group flex items-center gap-1.5 pr-2 pl-1 py-1 border transition-all duration-200
                            text-[14px] uppercase tracking-wide cursor-pointer rounded-none
                            hover:border-[var(--tag-color)] hover:text-[var(--tag-color)]
                            ${isActive
                              ? "bg-[var(--active-bg)] border-[var(--tag-color)] text-[var(--tag-color)]"
                              : "bg-transparent border-app-border text-app-muted"
                            }
                          `}
                        >
                          {tech.iconUrl.startsWith('devicon-')
                            ? <i className={`${tech.iconUrl} text-[18px]`}></i>
                            : <img src={tech.iconUrl} className="w-5 h-5 object-contain" />
                          }
                          <span>{tech.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-app-border/30">
              <button
                onClick={handleSave}
                className="w-fit px-12 h-10 text-app-muted border border-app-border hover:text-app-accent hover:border-app-accent transition-all uppercase tracking-[0.2em] font-bold text-[10px] rounded-none"
              >
                Save
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      <Table className="border border-app-border text-app-text-primary">
        <TableHeader>
          <TableRow className="border-app-border hover:bg-transparent">
            <TableHead className="text-app-muted uppercase text-[10px] tracking-widest pl-4 font-bold">Project</TableHead>
            <TableHead className="text-app-muted uppercase text-[10px] tracking-widest font-bold">Technologies</TableHead>
            <TableHead className="text-right text-app-muted uppercase text-[10px] tracking-widest pr-4 font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map(project => (
            <TableRow key={project.id} className="border-app-border hover:bg-transparent">
              <TableCell className="font-medium pl-4 py-1.5">{project.name}</TableCell>
              <TableCell className="py-1.5">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map(t => (
                    <span
                      key={t.name}
                      className="text-[9px] uppercase font-bold px-1.5 py-0.5 border border-app-border text-app-muted"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right space-x-2 pr-4 py-1.5">
                <button onClick={() => handleEdit(project)} className="text-app-muted border border-app-muted p-1.5 hover:text-app-accent hover:border-app-accent transition-all rounded-none">
                  <Edit2 className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button onClick={() => handleDelete(project.id)} className="text-app-muted border border-app-muted p-1.5 hover:text-red-500 hover:border-red-500 transition-all rounded-none">
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
