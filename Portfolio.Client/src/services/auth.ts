// src/services/auth.ts

const TOKEN_KEY = "admin_auth_token";

export const setAuthToken = (token: string, expiresAt: string) => {
  // Convert expiration date from server to Date object
  const expirationDate = new Date(expiresAt);
  // Set cookie with expiration date and strict path for security
  document.cookie = `${TOKEN_KEY}=${token}; expires=${expirationDate.toUTCString()}; path=/`;
};

export const getAuthToken = (): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + TOKEN_KEY + '=([^;]+)'));
  if (match) return match[2];
  return null;
};

export const clearAuthToken = () => {
  document.cookie = `${TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const login = async (password: string): Promise<{ token: string; expiresAt: string } | null> => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Login failed:", err);
    return null;
  }
};
