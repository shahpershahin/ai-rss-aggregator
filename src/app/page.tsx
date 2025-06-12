'use client';

import { useEffect, useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';

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
    <main className="p-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center bg-orange-100 rounded-xl p-6 mb-10">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">Technology</h2>
          <p className="text-gray-700">
            Explore the latest trends and insights in the world of technology. Stay informed with AI-curated blog posts.
          </p>
        </div>
        <img
          src="https://placehold.co/400x250?text=Hero+Banner"
          alt="Hero Banner"
          className="rounded-lg mt-6 md:mt-0 md:ml-6 object-cover"
        />
      </section>

      {/* Category Filter */}
      <CategoryFilter
        categories={['All', 'Technology', 'Science', 'Finance', 'Health', 'Education', 'Lifestyle']}
        selected={categoryFilter}
        onSelect={setCategoryFilter}
      />

      {/* Blog Posts */}
      {loading ? (
        <p className="text-center mt-10">Loading blogs...</p>
      ) : filteredBlogs.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">No blogs found in this category.</p>
      ) : (
        <section className="space-y-6 mt-8">
          {filteredBlogs.map((blog, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white border p-4 rounded shadow-sm"
            >
              <div className="flex-1 mb-4 md:mb-0">
                <h4 className="text-lg font-semibold text-blue-700">{blog.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{blog.summary}</p>
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded text-sm"
                >
                  Read More
                </a>
              </div>
              <img
                src={blog.image || `https://placehold.co/150x100?text=${encodeURIComponent(blog.category || 'Blog')}`}
                alt={blog.title}
                className="w-[150px] h-[100px] rounded object-cover ml-4"
              />
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
