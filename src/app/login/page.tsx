'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('userEmail', data.email);
      router.push('/');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/' }); // redirect after login
  };

  return (
    <main className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {/* Manual Login Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button className="w-full bg-blue-600 text-white p-2 rounded" type="submit">
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="text-center my-4 text-gray-500">OR</div>

      {/* Google OAuth Login Button */}
      <button
        onClick={handleGoogleLogin}
        className="w-full bg-red-500 text-white p-2 rounded"
      >
        Login with Google
      </button>
    </main>
  );
}
