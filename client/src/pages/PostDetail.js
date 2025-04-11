import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function PostDetail() {
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`)
        setPost(response.data)
      } catch (error) {
        setError('Error fetching post')
      }
    }

    fetchPost()
  }, [id])

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      await axios.post(
        `/api/posts/${id}/comments`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const response = await axios.get(`/api/posts/${id}`)
      setPost(response.data)
      setComment('')
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred')
    }
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>
  }

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className="card">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
        />
      )}
      <h1>{post.title}</h1>
      <div className="post-meta">
        <span>Posted on {new Date(post.createdAt).toLocaleDateString()}</span>
        <span>Category: {post.category}</span>
      </div>
      <div className="post-content">{post.content}</div>
      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="comments-section">
        <h3>Comments</h3>
        {post.comments.map((comment) => (
          <div key={comment._id} className="comment">
            <p>{comment.content}</p>
            <small>
              By {comment.user.username} on{' '}
              {new Date(comment.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))}

        <form onSubmit={handleCommentSubmit}>
          <div className="form-group">
            <textarea
              className="form-control"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Comment
          </button>
        </form>
      </div>
    </div>
  )
}

export default PostDetail
