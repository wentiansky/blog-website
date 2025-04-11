const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const store = require('../store/memoryStore')

// Register user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Check if user exists
    let user = store.getUserByEmail(email)
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Create new user
    user = store.createUser({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    })

    // Create token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = store.getUserByEmail(email)
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Create token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
