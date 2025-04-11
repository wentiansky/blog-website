class MemoryStore {
  constructor() {
    this.users = new Map()
    this.posts = new Map()
    this.counter = 0
  }

  // User methods
  async findUserByEmail(email) {
    return Array.from(this.users.values()).find((user) => user.email === email)
  }

  async createUser(userData) {
    const id = String(++this.counter)
    const user = { _id: id, ...userData }
    this.users.set(id, user)
    return user
  }

  // Post methods
  async findAllPosts() {
    return Array.from(this.posts.values())
  }

  async findPostById(id) {
    return this.posts.get(id)
  }

  async createPost(postData) {
    const id = String(++this.counter)
    const post = {
      _id: id,
      ...postData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.posts.set(id, post)
    return post
  }

  async updatePost(id, postData) {
    const post = this.posts.get(id)
    if (!post) return null

    const updatedPost = {
      ...post,
      ...postData,
      _id: id,
      updatedAt: new Date(),
    }
    this.posts.set(id, updatedPost)
    return updatedPost
  }

  async deletePost(id) {
    const post = this.posts.get(id)
    if (!post) return false

    this.posts.delete(id)
    return true
  }
}

// Create a singleton instance
const store = new MemoryStore()
module.exports = store
