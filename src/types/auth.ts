export interface LoginPayload {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface LoginSuccessResponse {
  success: true;
  message: string;
  user: AuthUser;
}

export interface LoginValidationError {
  field: string;
  message: string;
}

export interface LoginErrorResponse {
  success: false;
  error: string;
  details?: LoginValidationError[];
  retryAfterSeconds?: number;
}

export type LoginApiResponse = LoginSuccessResponse | LoginErrorResponse;

export interface RateLimitStatus {
  isAllowed: boolean;
  remainingAttempts: number;
  retryAfterSeconds?: number;
}

export interface FormTouchedState {
  email?: boolean;
  password?: boolean;
}