# Blog Website

A modern blog website built with Node.js, Express, and MongoDB.

## Features

- User authentication (register/login)
- Create, read, update, and delete blog posts
- Comment system
- Like posts
- User profiles
- Categories and tags
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd blog-website
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory and add the following:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-website
JWT_SECRET=your-super-secret-key-change-this-in-production
```

4. Start the server:

```bash
npm start
```

## API Endpoints

### Authentication

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Posts

- GET /api/posts - Get all published posts
- GET /api/posts/:id - Get a single post
- POST /api/posts - Create a new post
- PUT /api/posts/:id - Update a post
- DELETE /api/posts/:id - Delete a post
- POST /api/posts/:id/comments - Add a comment to a post

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
