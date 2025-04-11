// 内存存储
const store = {
  posts: [
    {
      id: 1,
      title: 'Getting Started with React',
      content:
        "React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called 'components'. In this post, we'll explore the basics of React and how to get started with your first React application.",
      author: 1,
      tags: ['react', 'javascript', 'web development'],
      category: 'Web Development',
      coverImage:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      status: 'published',
      createdAt: '2024-03-15T10:00:00.000Z',
      updatedAt: '2024-03-15T10:00:00.000Z',
    },
    {
      id: 2,
      title: 'The Art of Clean Code',
      content:
        "Writing clean code is an art that takes practice and dedication. In this article, we'll discuss the principles of clean code, why it matters, and how to write better code that's easier to maintain and understand.",
      author: 1,
      tags: ['programming', 'best practices', 'software development'],
      category: 'Software Development',
      coverImage:
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      status: 'published',
      createdAt: '2024-03-14T15:30:00.000Z',
      updatedAt: '2024-03-14T15:30:00.000Z',
    },
    {
      id: 3,
      title: 'Understanding Modern JavaScript',
      content:
        'Modern JavaScript has evolved significantly over the years. From ES6 to the latest features, this post covers everything you need to know about modern JavaScript development, including arrow functions, destructuring, and async/await.',
      author: 1,
      tags: ['javascript', 'es6', 'programming'],
      category: 'JavaScript',
      coverImage:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      status: 'published',
      createdAt: '2024-03-13T09:15:00.000Z',
      updatedAt: '2024-03-13T09:15:00.000Z',
    },
    {
      id: 4,
      title: 'Building RESTful APIs with Node.js',
      content:
        "Learn how to create robust and scalable RESTful APIs using Node.js and Express. We'll cover routing, middleware, authentication, and best practices for API design.",
      author: 1,
      tags: ['node.js', 'api', 'backend'],
      category: 'Backend Development',
      coverImage:
        'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      status: 'published',
      createdAt: '2024-03-12T14:45:00.000Z',
      updatedAt: '2024-03-12T14:45:00.000Z',
    },
    {
      id: 5,
      title: 'CSS Grid vs Flexbox: When to Use Which',
      content:
        'A comprehensive guide to choosing between CSS Grid and Flexbox for your layouts. Learn the strengths and weaknesses of each, and when to use them in your projects.',
      author: 1,
      tags: ['css', 'web design', 'frontend'],
      category: 'Web Design',
      coverImage:
        'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      status: 'published',
      createdAt: '2024-03-11T11:20:00.000Z',
      updatedAt: '2024-03-11T11:20:00.000Z',
    },
  ],
  users: [
    {
      id: 1,
      username: 'demo',
      email: 'demo@example.com',
      password: '$2a$10$X7UrE2J5Q5Q5Q5Q5Q5Q5QO5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', // hashed password
      createdAt: '2024-03-10T00:00:00.000Z',
    },
  ],
  currentId: 6,
}

// 获取所有文章
const getAllPosts = () => {
  return store.posts.filter((post) => post.status === 'published')
}

// 获取单个文章
const getPostById = (id) => {
  return store.posts.find((post) => post.id === id)
}

// 创建文章
const createPost = (postData) => {
  const post = {
    id: store.currentId++,
    ...postData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  store.posts.push(post)
  return post
}

// 更新文章
const updatePost = (id, postData) => {
  const index = store.posts.findIndex((post) => post.id === id)
  if (index === -1) return null

  store.posts[index] = {
    ...store.posts[index],
    ...postData,
    updatedAt: new Date().toISOString(),
  }
  return store.posts[index]
}

// 删除文章
const deletePost = (id) => {
  const index = store.posts.findIndex((post) => post.id === id)
  if (index === -1) return false

  store.posts.splice(index, 1)
  return true
}

// 用户相关操作
const createUser = (userData) => {
  const user = {
    id: store.currentId++,
    ...userData,
    createdAt: new Date().toISOString(),
  }
  store.users.push(user)
  return user
}

const getUserByEmail = (email) => {
  return store.users.find((user) => user.email === email)
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  createUser,
  getUserByEmail,
}
