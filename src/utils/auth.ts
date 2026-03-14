/**
 * Authentication utility functions for managing user session
 */

const USER_KEY = "stayvista-user";

export const getLoggedInUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setLoggedInUser = (user: { name: string; email: string } | null) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
  window.dispatchEvent(new Event("stayvista-auth-change"));
};
