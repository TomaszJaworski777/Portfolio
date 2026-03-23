const TOKEN_KEY = "admin_auth_token";

export const setAuthToken = (token: string, expiresAt: string) => {
  const expirationDate = new Date(expiresAt);
  document.cookie = `${TOKEN_KEY}=${token}; expires=${expirationDate.toUTCString()}; path=/`;
};

export const getAuthToken = (): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + TOKEN_KEY + '=([^;]+)'));
  if (match) return match[2];
  return null;
};

export const clearAuthToken = () => {
  document.cookie = `${TOKEN_KEY}=; Max-Age=0; path=/;`;
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

    return await response.json();
  } catch (err) {
    console.error("Login failed:", err);
    return null;
  }
};
