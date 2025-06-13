// app/add-feed/page.tsx or components/AddFeedForm.tsx
'use client';

import { useState } from 'react';

export default function AddFeedPage() {
  const [rssUrl, setRssUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const userEmail = localStorage.getItem('userEmail'); // Get email from storage

  if (!userEmail) {
    setMessage('You must be logged in to add a feed.');
    return;
  }

  const res = await fetch('/api/addFeed', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rssUrl, userEmail }), // Send email too
  });

  const data = await res.json();
  setMessage(data.message);
  setRssUrl('');
};


  return (
    <main className="max-w-xl mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Add RSS Feed</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={rssUrl}
          onChange={(e) => setRssUrl(e.target.value)}
          placeholder="Enter RSS feed URL"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Feed</button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </main>
  );
}
