// src/pages/CreateBlog.jsx
import React from 'react';
import BlogForm from '../components/BlogForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const CreateBlog = () => {
  const navigate = useNavigate();

  const handleCreate = async (blogData) => {
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/post/newblog`, blogData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success('Blog published!');
    navigate('/');
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to create blog');
  }
};


  return <BlogForm onSubmit={handleCreate} />;
};

export default CreateBlog;
