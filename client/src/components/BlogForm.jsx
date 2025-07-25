// src/components/BlogForm.jsx
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-hot-toast';

const BlogForm = ({ initialData = {}, onSubmit, isEdit = false }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [tags, setTags] = useState(initialData.tags?.join(', ') || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error('Title and content are required');
      return;
    }

    const tagList = tags.split(',').map(tag => tag.trim());
    onSubmit({ title, content, tags: tagList });
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
      setTags(initialData.tags?.join(', ') || '');
    }
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit Blog' : 'Create Blog'}</h2>

      <input
        type="text"
        placeholder="Blog Title"
        className="w-full p-2 border mb-4 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <ReactQuill
        value={content}
        onChange={setContent}
        className="mb-4"
        placeholder="Write your blog content here..."
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="w-full p-2 border mb-4 rounded"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {isEdit ? 'Update Blog' : 'Publish Blog'}
      </button>
    </form>
  );
};

export default BlogForm;
