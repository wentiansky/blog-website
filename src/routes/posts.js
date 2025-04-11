const express = require('express')
const router = express.Router()
const store = require('../store/memoryStore')
const auth = require('../middleware/auth')

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = store.getAllPosts()
    res.json(posts)
  } catch (error) {
    console.error('Error getting posts:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = store.getPostById(parseInt(req.params.id))

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    res.json(post)
  } catch (error) {
    console.error('Error getting post:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create post
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, tags, category, coverImage } = req.body

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' })
    }

    const post = store.createPost({
      title,
      content,
      tags: tags || [],
      category: category || 'uncategorized',
      coverImage: coverImage || '',
      author: req.user.id,
      status: 'published',
    })

    res.status(201).json(post)
  } catch (error) {
    console.error('Error creating post:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update post
router.put('/:id', auth, async (req, res) => {
  try {
    const post = store.getPostById(parseInt(req.params.id))

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    // Check if user is the author
    if (post.author !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    const { title, content, tags, category, coverImage, status } = req.body

    const updatedPost = store.updatePost(parseInt(req.params.id), {
      title: title || post.title,
      content: content || post.content,
      tags: tags || post.tags,
      category: category || post.category,
      coverImage: coverImage || post.coverImage,
      status: status || post.status,
    })

    res.json(updatedPost)
  } catch (error) {
    console.error('Error updating post:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = store.getPostById(parseInt(req.params.id))

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    // Check if user is the author
    if (post.author !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    store.deletePost(parseInt(req.params.id))
    res.json({ message: 'Post removed' })
  } catch (error) {
    console.error('Error deleting post:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Add comment
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const post = store.getPostById(parseInt(req.params.id))

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const newComment = {
      user: req.user.id,
      content: req.body.content,
    }

    post.comments.unshift(newComment)
    res.json(post.comments)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
