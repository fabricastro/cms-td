const formidable = require('formidable');
const fs = require('fs');
const Blog = require('../../models/Blog');

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } else if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Error parsing form data' });
        return;
      }

      const { title, content, categories } = fields;
      let image = null;

      if (files.file) {
        image = fs.readFileSync(files.file.filepath);
      }

      const newBlog = await Blog.create({
        title,
        content,
        categories,
        image,
      });

      res.status(201).json(newBlog);
    });
  } else if (req.method === 'PUT') {
    const { id, title, content, categories, image } = req.body;
    const blog = await Blog.findByPk(id);
    if (blog) {
      blog.title = title;
      blog.content = content;
      blog.categories = categories;
      if (image) {
        blog.image = image;
      }
      await blog.save();
      res.status(200).json(blog);
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    const blog = await Blog.findByPk(id);
    if (blog) {
      await blog.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}