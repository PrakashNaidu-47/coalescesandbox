export interface LoginPayload {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'auditor';
  lastLoginAt: string;
}

export interface AuthResponse {
  accessToken: string;
  expiresIn: number;
  user: AuthUser;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
  code?: 'INVALID_CREDENTIALS' | 'RATE_LIMITED' | 'VALIDATION_ERROR' | 'ACCOUNT_LOCKED' | 'SERVER_ERROR';
  retryAfterSeconds?: number;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  event: 'LOGIN_SUCCESS' | 'LOGIN_FAILURE' | 'RATE_LIMITED' | 'RECOVERY_REQUESTED' | 'LOGOUT';
  email: string;
  ip: string;
  userAgent: string;
  details?: string;
}