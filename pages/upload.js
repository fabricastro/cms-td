import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Upload() {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState('');
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return null; // Return null to avoid rendering the form while redirecting
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('categories', categories);
    if (image) {
      formData.append('file', image);
    }

    const res = await fetch('/api/blogs', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('Blog uploaded successfully!');
      setTitle('');
      setContent('');
      setCategories('');
      setImage(null);
    } else {
      alert('Failed to upload blog');
    }
  };

  const handleEdit = async (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setCategories(blog.categories);
    setImage(blog.image);
  };

  const handleDelete = async (id) => {
    const res = await fetch('/api/blogs', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      alert('Blog deleted successfully!');
      setBlogs(blogs.filter(blog => blog.id !== id));
    } else {
      alert('Failed to delete blog');
    }
  };

  return (
    <div className="p-4 flex justify-center flex-col">
      <form onSubmit={handleSubmit} className="p-4 flex justify-center flex-col">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content (HTML)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Categories (comma separated)</label>
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Upload Image</label>
          <input type="file" onChange={handleImageUpload} className="mt-2" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Upload Blog
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Existing Blogs</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <li key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">{blog.title}</h2>
              <div className="prose" dangerouslySetInnerHTML={{ __html: blog.content }} />
              <p className="mt-4 text-gray-600">Categoría: {blog.categories}</p>
              {blog.image && (
                <div className="mt-4">
                  <img src={`data:image/jpeg;base64,${Buffer.from(blog.image).toString('base64')}`} alt={blog.title} className="h-[200px] rounded-lg" />
                </div>
              )}
              <small className="block mt-4 text-gray-500">{new Date(blog.date).toLocaleDateString()}</small>
              <button
                onClick={() => handleEdit(blog)}
                className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}