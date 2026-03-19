export interface ProfileData {
  name: string;
  title: string;
  description: string;
  location: string;
  phone: string;
  languages: TechData[];
  frameworks: TechData[];
  tools: TechData[];
  databases: TechData[];
  devOps: TechData[];
}

export interface ProjectData {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  githubUrl: string;
  demoUrl: string;
  technologies: TechData[];
}

export interface TechData {
  name: string;
  iconUrl: string;
  category: string;
  lightColor: string;
  darkColor: string;
}

export const fetchProfile = async (): Promise<ProfileData> => {
  const response = await fetch(`/api/profile`);
  return response.json();
};

export const updateProfile = async (profile: ProfileData): Promise<void> => {
  await fetch(`/api/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
};

export const fetchFilters = async (): Promise<TechData[]> => {
  const response = await fetch(`/api/filters`);
  return response.json();
};

export const addTech = async (tech: TechData): Promise<void> => {
  await fetch(`/api/filters`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tech),
  });
};

export const updateTech = async (name: string, tech: TechData): Promise<void> => {
  await fetch(`/api/filters/${name}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tech),
  });
};

export const deleteTech = async (name: string): Promise<void> => {
  await fetch(`/api/filters/${name}`, {
    method: "DELETE",
  });
};

export const fetchProjects = async (): Promise<ProjectData[]> => {
  const response = await fetch(`/api/projects`);
  return response.json();
};

export const addProject = async (project: ProjectData): Promise<void> => {
  await fetch(`/api/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
};

export const updateProject = async (id: number, project: ProjectData): Promise<void> => {
  await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
};

export const deleteProject = async (id: number): Promise<void> => {
  await fetch(`/api/projects/${id}`, {
    method: "DELETE",
  });
};