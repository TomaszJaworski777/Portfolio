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

export const fetchFilters = async (): Promise<TechData[]> => {
  const response = await fetch(`/api/filters`);
  return response.json();
};

export const fetchProjects = async (): Promise<ProjectData[]> => {
  const response = await fetch(`/api/projects`);
  return response.json();
};