import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts')
        setPosts(response.data || [])
      } catch (error) {
        console.error('Error fetching posts:', error)
        setError('Failed to load posts. Please try again later.')
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  if (posts.length === 0) {
    return (
      <div className="no-posts">
        <h2>No posts yet</h2>
        <p>Be the first to create a blog post!</p>
        <Link to="/create-post" className="btn btn-primary">
          Create Post
        </Link>
      </div>
    )
  }

  return (
    <div className="post-grid">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          {post.coverImage && <img src={post.coverImage} alt={post.title} />}
          <div className="post-card-content">
            <h2>{post.title}</h2>
            <p>{post.content.substring(0, 150)}...</p>
            <div className="post-meta">
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <Link to={`/post/${post.id}`}>Read more</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
