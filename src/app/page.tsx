'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogCard from '../components/BlogCard';
import CategoryFilter from '../components/CategoryFilter';
import '../app/globals.css';

interface BlogItem {
  _id?: string;
  title: string;
  link: string;
  summary: string;
  category: string;
  image?: string;
  publishedAt?: string;
  source?: string;
}

export default function HomePage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/fetchBlogs')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching blogs:', err);
        setLoading(false);
      });
  }, []);

  const filteredBlogs = categoryFilter === 'All'
    ? blogs
    : blogs.filter((b) => b.category === categoryFilter);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700">AI Blog Aggregator</h1>

      <p className="text-center text-gray-600 mb-8">
        Explore summarized blogs from across the internet. Stay updated with AI-powered summaries across categories.
      </p>

      <CategoryFilter
        categories={['All', 'Technology', 'Science', 'Finance', 'Health', 'Education', 'Lifestyle']}
        selected={categoryFilter}
        onSelect={setCategoryFilter}
      />

      {loading ? (
        <p className="text-center mt-10">Loading blogs...</p>
      ) : filteredBlogs.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">No blogs found in this category.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {filteredBlogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      )}
    </main>
  );
}
