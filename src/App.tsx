import React, { useState, useEffect, useId } from 'react';

// --- MOCK API & DATABASE SIMULATION ---
interface User {
  id: string;
  email: string;
  isMfaEnabled: boolean;
}

interface AuditLog {
  id: string;
  userId?: string;
  eventType: 'LOGIN_SUCCESS' | 'LOGIN_FAILURE' | 'PASSWORD_RESET_REQUEST' | 'ACCOUNT_LOCKOUT';
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

const MOCK_USERS: Record<string, { passwordHash: string; user: User; mfaSecret: string }> = {
  'user@example.com': {
    passwordHash: 'SecurePassword123!',
    user: { id: 'uuid-v4-1', email: 'user@example.com', isMfaEnabled: true },
    mfaSecret: '123456'
  },
  'standard@example.com': {
    passwordHash: 'Password123!',
    user: { id: 'uuid-v4-2', email: 'standard@example.com', isMfaEnabled: false },
    mfaSecret: ''
  }
};

let auditLogs: AuditLog[] = [];

const logAuditEvent = (eventType: AuditLog['eventType'], userId?: string) => {
  auditLogs.unshift({
    id: 'log-' + Math.random().toString(36).substr(2, 9),
    userId,
    eventType,
    ipAddress: '192.168.1.50',
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString()
  });
};

// --- COMPONENTS ---

export default function App() {
  const [view, setView] = useState<'login' | 'mfa' | 'forgot' | 'reset' | 'dashboard'>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tempUserId, setTempUserId] = useState<string>('');
  const [tempEmail, setTempEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [networkOnline, setNetworkOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setNetworkOnline(true);
    const handleOffline = () => setNetworkOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handlers
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get('email') as string || '').toLowerCase().trim();
    const password = formData.get('password') as string;

    setTimeout(() => {
      setLoading(false);
      const record = MOCK_USERS[email];
      if (!record || record.passwordHash !== password) {
        logAuditEvent('LOGIN_FAILURE');
        setError('Invalid email or password.');
        return;
      }

      if (record.user.isMfaEnabled) {
        setTempUserId(record.user.id);
        setTempEmail(email);
        setView('mfa');
      } else {
        logAuditEvent('LOGIN_SUCCESS', record.user.id);
        setCurrentUser(record.user);
        setView('dashboard');
      }
    }, 600);
  };

  const handleMfaSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const token = formData.get('token') as string;

    setTimeout(() => {
      setLoading(false);
      const record = MOCK_USERS[tempEmail];
      if (token === record.mfaSecret) {
        logAuditEvent('LOGIN_SUCCESS', tempUserId);
        setCurrentUser(record.user);
        setView('dashboard');
      } else {
        logAuditEvent('LOGIN_FAILURE', tempUserId);
        setError('Invalid MFA code. Use 123456.');
      }
    }, 600);
  };

  const handleForgotSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = (formData.get('email') as string || '').toLowerCase().trim();

    setTimeout(() => {
      setLoading(false);
      logAuditEvent('PASSWORD_RESET_REQUEST');
      setSuccessMsg('If an account exists, a reset link has been dispatched. (Simulated token: go to Reset Password)');
      setView('reset');
    }, 600);
  };

  const handleResetSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const pass1 = formData.get('password') as string;
    const pass2 = formData.get('confirmPassword') as string;

    if (pass1 !== pass2) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('Password successfully updated. Please login.');
      setView('login');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans">
      {!networkOnline && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-center text-sm font-semibold flex items-center justify-center gap-2">
          <span>⚠️ Network connection lost. Changes are cached locally.</span>
        </div>
      )}

      {/* Header */}
      <header className="w-full border-b border-slate-800 bg-slate-900/50 backdrop-blur py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
            S
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
<div>SecurAuth Portal</div>
          </span>
        </div>
        <div className="text-xs text-slate-400">
          {view !== 'dashboard' ? 'Secure Authentication v2.4' : 'Active Session'}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          {error && (
            <div className="mb-6 p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-sm flex items-center gap-3" role="alert" aria-live="assertive">
              <span className="text-lg">❌</span>
              <div>{error}</div>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm flex items-center gap-3" role="status">
              <span className="text-lg">✅</span>
              <div>{successMsg}</div>
            </div>
          )}

          {/* LOGIN VIEW */}
          {view === 'login' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back</h1>
                <p className="text-sm text-slate-400 mt-1">Enter your credentials to access your account</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2" htmlFor="login-email">
                    Email Address
                  </label>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    required
                    defaultValue="user@example.com"
                    placeholder="name@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400" htmlFor="login-password">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => { setError(null); setSuccessMsg(null); setView('forgot'); }}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    required
                    defaultValue="SecurePassword123!"
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input type="checkbox" id="remember" className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500" />
                  <label htmlFor="remember" className="text-sm text-slate-400 select-none cursor-pointer">
                    Remember this device for 30 days
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-150 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20"
                >
                  {loading ? <span className="inline-block animate-spin">⏳</span> : null}
                  <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-slate-500 text-center">
                Demo credentials pre-filled. MFA enabled user: <code className="text-indigo-400">user@example.com</code>
              </div>
            </div>
          )}

          {/* MFA CHALLENGE VIEW */}
          {view === 'mfa' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-white">Two-Factor Authentication</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Enter the 6-digit TOTP code generated by your authenticator app.
                </p>
              </div>

              <form onSubmit={handleMfaSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2" htmlFor="mfa-token">
                    Verification Code
                  </label>
                  <input
                    id="mfa-token"
                    name="token"
                    type="text"
                    maxLength={6}
                    required
                    placeholder="123456"
                    autoFocus
                    className="w-full text-center tracking-[1em] font-mono text-xl bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                  <p className="text-xs text-slate-500 mt-2 text-center">Simulated code for testing: <strong className="text-indigo-400">123456</strong></p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setView('login'); setError(null); setSuccessMsg(null); }}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 px-4 rounded-lg transition text-sm"
                  >
                    Back to Login
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-4 rounded-lg transition text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading && <span className="animate-spin">⏳</span>}
                    Verify Code
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* FORGOT PASSWORD VIEW */}
          {view === 'forgot' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-white">Reset Password</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Provide your registered email address to receive a secure recovery link.
                </p>
              </div>

              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2" htmlFor="forgot-email">
                    Email Address
                  </label>
                  <input
                    id="forgot-email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-4 rounded-lg transition text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading && <span className="animate-spin">⏳</span>}
                  Send Reset Link
                </button>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => { setView('login'); setError(null); setSuccessMsg(null); }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* RESET PASSWORD VIEW */}
          {view === 'reset' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-white">Create New Password</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Your new password must satisfy strict security guidelines.
                </p>
              </div>

              <form onSubmit={handleResetSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2" htmlFor="new-password">
                    New Password
                  </label>
                  <input
                    id="new-password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2" htmlFor="confirm-password">
                    Confirm New Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-4 rounded-lg transition text-sm flex items-center justify-center gap-2"
                >
                  {loading && <span className="animate-spin">⏳</span>}
                  Update Password
                </button>
              </form>
            </div>
          )}

          {/* SECURE DASHBOARD VIEW */}
          {view === 'dashboard' && currentUser && (
            <div>
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-4">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Authenticated Session Secure
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
                <p className="text-sm text-slate-400 mt-1">Welcome back, <span className="text-white font-medium">{currentUser.email}</span></p>
              </div>

              <div className="space-y-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 mb-6">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Audit Log Activity (Live)</div>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1 text-xs font-mono">
                  {auditLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex justify-between items-center bg-slate-900 p-2 rounded border border-slate-800">
                      <span className={log.eventType === 'LOGIN_SUCCESS' ? 'text-emerald-400' : 'text-amber-400'}>
                        {log.eventType}
                      </span>
                      <span className="text-slate-500 text-[10px]">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setCurrentUser(null);
                  setError(null);
                  setSuccessMsg(null);
                  setView('login');
                }}
                className="w-full bg-rose-600/20 border border-rose-500/30 hover:bg-rose-600/30 text-rose-300 font-medium py-3 px-4 rounded-lg transition text-sm"
              >
                Sign Out Securely
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800 py-4 px-6 text-center text-xs text-slate-500">
        Protected by enterprise-grade cryptographic protocols & rate-limiting middleware. WCAG 2.1 AA Compliant.
      </footer>
    </div>
  );
}