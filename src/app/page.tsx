'use client';

import { useEffect, useState } from 'react';

type BlogItem = {
  title: string;
  link: string;
  summary: string;
  category: string;
};

export default function Home() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/fetchBlogs')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch blogs:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🧠 AI Blog Aggregator</h1>
      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        blogs.map((blog, i) => (
          <div key={i} className="border p-4 mb-4 rounded shadow">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-sm italic text-gray-600">Category: {blog.category}</p>
            <p className="mt-2">{blog.summary}</p>
            <a href={blog.link} target="_blank" className="text-blue-500 mt-2 block" rel="noopener noreferrer">
              Read full post →
            </a>
          </div>
        ))
      )}
    </main>
  );
}
