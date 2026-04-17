export interface ProfileData {
  name: string;
  title: string;
  photoUrl: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  githubUsername: string;
  linkedinProfile: string;
  cvUrl?: string;
  cvName?: string;
  languages: TechData[];
  frameworks: TechData[];
  tools: TechData[];
  databases: TechData[];
  devOps: TechData[];
}

export interface ProjectData {
  id: number;
  order: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  githubUrl: string;
  demoUrl: string;
  technologies: TechData[];
  uniqueDemoVisits?: number;
  uniqueGithubVisits?: number;
}

export interface TechData {
  id: number;
  name: string;
  iconUrl: string;
  category: string;
  lightColor: string;
  darkColor: string;
}

import { getAuthToken, clearAuthToken } from "./auth";

const fetchWithAuth = async (input: RequestInfo | URL, init?: RequestInit) => {
  const token = getAuthToken();
  const headers = new Headers(init?.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let body = init?.body;
  const method = init?.method?.toUpperCase() || "GET";

  if (token && ["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    if (headers.get("Content-Type")?.includes("application/json")) {
      try {
        const parsedBody = body && typeof body === "string" ? JSON.parse(body) : {};
        if (typeof parsedBody === "object" && parsedBody !== null) {
          parsedBody.token = token;
          body = JSON.stringify(parsedBody);
        }
      } catch (e) { }
    }
  }

  const response = await fetch(input, { ...init, headers, body });

  if (response.status === 401 || response.status === 403) {
    clearAuthToken();
    window.location.href = "/admin/login";
  }

  return response;
};

export const verifyToken = async (): Promise<void> => {
  await fetchWithAuth(`/api/auth/verify`);
};

export const fetchProfile = async (): Promise<ProfileData> => {
  const response = await fetchWithAuth(`/api/profile`);
  return response.json();
};

export const updateProfile = async (profile: ProfileData): Promise<void> => {
  await fetchWithAuth(`/api/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
};

export const fetchFilters = async (): Promise<TechData[]> => {
  const response = await fetchWithAuth(`/api/filters`);
  return response.json();
};

export const fetchTechnologies = async (): Promise<TechData[]> => {
  const response = await fetchWithAuth(`/api/technologies`);
  return response.json();
};

export const addTechnology = async (tech: TechData): Promise<void> => {
  await fetchWithAuth(`/api/technologies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tech),
  });
};

export const updateTechnology = async (id: number, tech: TechData): Promise<void> => {
  await fetchWithAuth(`/api/technologies/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tech),
  });
};

export const deleteTechnology = async (id: number): Promise<void> => {
  await fetchWithAuth(`/api/technologies/${id}`, {
    method: "DELETE",
  });
};

export const fetchProjects = async (): Promise<ProjectData[]> => {
  const response = await fetchWithAuth(`/api/projects`);
  return response.json();
};

export const addProject = async (project: ProjectData): Promise<void> => {
  await fetchWithAuth(`/api/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
};

export const updateProject = async (id: number, project: ProjectData): Promise<void> => {
  await fetchWithAuth(`/api/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
};

export const deleteProject = async (id: number): Promise<void> => {
  await fetchWithAuth(`/api/projects/${id}`, {
    method: "DELETE",
  });
};

export const recordSiteVisit = async (): Promise<void> => {
  await fetch(`/api/analytics/visit`, { method: "POST" });
};

export const recordProjectClick = async (id: number, type: "demo" | "github"): Promise<void> => {
  await fetch(`/api/analytics/project/${id}/click`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type }),
  });
};

export const fetchTotalVisits = async (): Promise<number> => {
  try {
    const response = await fetch('/api/analytics/visits');
    if (!response.ok) return 0;
    const data = await response.json();
    return data.count || 0;
  } catch {
    return 0;
  }
};
