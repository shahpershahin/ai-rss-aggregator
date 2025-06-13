'use client';

import { useEffect, useState } from 'react';

type Feed = {
  _id: string;
  url: string;
  title: string;
};

export default function MyFeedsPage() {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      const res = await fetch('/api/myFeeds');
      if (res.ok) {
        const data = await res.json();
        setFeeds(data);
      }
    };

    fetchFeeds();
  }, []);

  const handleCardClick = async (feed: Feed) => {
    setSelectedFeed(feed);
    const res = await fetch(`/api/fetchFeedContent?url=${encodeURIComponent(feed.url)}`);
    if (res.ok) {
      const data = await res.json();
      setBlogs(data.items);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your RSS Feeds</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {feeds.map((feed) => (
          <div
            key={feed._id}
            onClick={() => handleCardClick(feed)}
            className="cursor-pointer border p-4 rounded shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{feed.title || 'Unnamed Feed'}</h2>
            <p className="text-sm text-gray-500 truncate">{feed.url}</p>
          </div>
        ))}
      </div>

      {selectedFeed && (
        <>
          <h2 className="text-xl font-bold mb-2">{selectedFeed.title}</h2>
          <div className="space-y-4">
            {blogs.map((item, i) => (
              <div key={i} className="border p-4 rounded shadow">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.contentSnippet || item.content}</p>
                <a href={item.link} target="_blank" className="text-blue-500 underline">Read more</a>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
