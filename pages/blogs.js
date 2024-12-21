// pages/blogs.js
import { useEffect, useState } from 'react';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Blogs</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <li key={index} className="bg-white p-6 rounded-lg shadow-md align-middle items-center flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">{blog.title}</h2>
            <div className="prose" dangerouslySetInnerHTML={{ __html: blog.content }} />
            <p className="mt-4 text-gray-600">Categoría: {blog.categories?.join(', ')}</p>
            {blog.imageUrl && (
              <div className="mt-4">
                <img src={blog.imageUrl} alt={blog.title} className="h-[200px] rounded-lg" />
              </div>
            )}
            <small className="block mt-4 text-gray-500">{new Date(blog.date).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}