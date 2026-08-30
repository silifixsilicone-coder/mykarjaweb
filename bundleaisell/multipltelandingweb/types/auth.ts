export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthState {
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
