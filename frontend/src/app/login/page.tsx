"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Login failed');
        return;
      }
      // redirect to control room after successful login
      router.push('/control-room');
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-lg bg-card p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-foreground text-center">AEGIS Demo Login</h1>
        {error && <p className="text-sm text-destructive text-center">{error}</p>}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-foreground">Username</label>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-md border border-input bg-input px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-input bg-input px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
        >
          Login
        </button>
      </form>
    </div>
  );
}
