import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    coverImage: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      const postData = {
        ...formData,
        tags: formData.tags.split(',').map((tag) => tag.trim()),
      }

      await axios.post('/api/posts', postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      navigate('/')
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred')
    }
  }

  return (
    <div className="card">
      <h2>Create Post</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            className="form-control"
            value={formData.content}
            onChange={handleChange}
            required
            rows="10"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="form-control"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="coverImage">Cover Image URL</label>
          <input
            type="url"
            id="coverImage"
            name="coverImage"
            className="form-control"
            value={formData.coverImage}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Post
        </button>
      </form>
    </div>
  )
}

export default CreatePost
