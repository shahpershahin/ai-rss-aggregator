import { BlogItem } from '../app/api/fetchBlogs/route';

export default function BlogCard({ blog }: { blog: BlogItem }) {
  return (
    <div className="border p-4 mb-4 rounded-md shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{blog.title}</h2>
      <p className="text-sm italic text-gray-600">Category: {blog.category}</p>
      <p className="mt-2">{blog.summary}</p>
      <a href={blog.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-3 inline-block">
        Read Full Post →
      </a>
    </div>
  );
}
