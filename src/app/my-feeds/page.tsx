// app/my-feeds/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function MyFeeds() {
  const [feeds, setFeeds] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/api/getFeeds')
      .then(res => res.json())
      .then(data => setFeeds(data.feeds));
  }, []);

  const handleFeedClick = async (url: string) => {
    const res = await fetch(`/api/fetchArticles?url=${encodeURIComponent(url)}`);
    const data = await res.json();
    setArticles(data.articles);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Your RSS Feeds</h1>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {feeds.map((feed: any) => (
          <div key={feed._id} className="p-4 border rounded cursor-pointer hover:bg-gray-100" onClick={() => handleFeedClick(feed.url)}>
            <h2 className="font-semibold">{feed.url}</h2>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl mb-2">Articles</h2>
        {articles.map((article: any, i) => (
          <div key={i} className="mb-4 border-b pb-2">
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold">
              {article.title}
            </a>
            <p className="text-sm text-gray-600">{article.pubDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
