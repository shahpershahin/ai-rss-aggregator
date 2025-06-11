'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout'); // Calls the logout API
    router.push('/login');           // Redirects to login
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow">
      <h1 className="text-xl font-bold">
        <Link href="/">AI Blog Aggregator</Link>
      </h1>
      <nav className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/categories">Categories</Link>
        <Link href="/about">About</Link>
        <Link href="/add-feed">Add RSS Feed</Link>
        <button className="text-red-500" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}
