const TOKEN_KEY = "lume_system_token";

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY) ?? "";
}

export function setAuthToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function fetchJson(url: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers ?? {});
  if (!headers.has("Content-Type") && options.method !== "GET" && options.method !== "HEAD") {
    headers.set("Content-Type", "application/json");
  }

  const token = getAuthToken();
  if (token) {
    headers.set("Authorization", token);
  }

  const response = await fetch(url.startsWith("http") ? url : url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      clearAuthToken();
    }

    const text = await response.text();
    throw new Error(text || `HTTP ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function loginApi(email: string, senha: string) {
  return fetchJson("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });
}

export async function verifyToken() {
  return fetchJson("/auth/token", {
    method: "POST",
  });
}

export async function getApi<T>(path: string) {
  return fetchJson(path, { method: "GET" }) as Promise<T>;
}

export async function postApi<T>(path: string, body: unknown) {
  return fetchJson(path, { method: "POST", body: JSON.stringify(body) }) as Promise<T>;
}

export async function patchApi<T>(path: string, body: unknown) {
  return fetchJson(path, { method: "PATCH", body: JSON.stringify(body) }) as Promise<T>;
}

export async function deleteApi<T>(path: string) {
  return fetchJson(path, { method: "DELETE" }) as Promise<T>;
}
