const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Blog API is running' })
})

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/posts', require('./routes/posts'))

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something broke!' })
})

const PORT = process.env.PORT || 8888

// Create server and handle errors
const server = app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.error('Error starting server:', err)
    process.exit(1)
  }
  console.log(`Server is running on port ${PORT}`)
})

server.on('error', (err) => {
  console.error('Server error:', err)
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err)
})

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err)
})
