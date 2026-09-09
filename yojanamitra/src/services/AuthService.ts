/**
 * AuthService.ts — localStorage-based authentication.
 *
 * NO Firebase. NO external dependency.
 * Users stored in localStorage. Session in sessionStorage.
 *
 * SECURITY NOTE: This is a local-only prototype. In production, use a real backend.
 */

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface StoredUser extends AuthUser {
  passwordHash: string;
}

const USERS_KEY = 'ym_users';
const SESSION_KEY = 'ym_session';

// ─── Simple hash (not cryptographic — prototype only) ─────────────────────────
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
}

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface RegisterResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

export interface LoginResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

export function register(name: string, email: string, password: string): RegisterResult {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedName = name.trim();

  // Validation
  if (!trimmedName) return { success: false, error: 'Full name is required.' };
  if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }
  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  const users = getStoredUsers();
  const exists = users.some((u) => u.email === trimmedEmail);
  if (exists) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  const newUser: StoredUser = {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: trimmedName,
    email: trimmedEmail,
    passwordHash: simpleHash(password),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveStoredUsers(users);

  const authUser: AuthUser = { id: newUser.id, name: newUser.name, email: newUser.email, createdAt: newUser.createdAt };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(authUser));

  return { success: true, user: authUser };
}

export function login(email: string, password: string): LoginResult {
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedEmail || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  const users = getStoredUsers();
  const user = users.find((u) => u.email === trimmedEmail);

  if (!user) {
    return { success: false, error: 'No account found with this email.' };
  }

  if (user.passwordHash !== simpleHash(password)) {
    return { success: false, error: 'Incorrect password. Please try again.' };
  }

  const authUser: AuthUser = { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(authUser));

  return { success: true, user: authUser };
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): AuthUser | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
