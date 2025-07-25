// src/pages/EditBlog.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`/post/${id}`);
        setBlog(data);
      } catch (err) {
        toast.error('Failed to fetch blog data');
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (blogData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/post/${id}`, blogData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Blog updated successfully!');
      navigate(`/post/${id}`);
    } catch (err) {
      toast.error('Failed to update blog');
    }
  };

  return blog ? <BlogForm initialData={blog} onSubmit={handleUpdate} isEdit /> : <p>Loading...</p>;
};

export default EditBlog;
