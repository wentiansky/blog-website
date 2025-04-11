const jwt = require('jsonwebtoken')
const store = require('../store/memoryStore')

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token')

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Get user from store
    const user = store.users.find((u) => u.id === decoded.id)
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' })
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    }
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' })
  }
}
