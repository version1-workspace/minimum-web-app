const mysql = require('mysql2/promise');

let connection
(async function() {
  require('dotenv').config()
  console.log('connecting database: ', process.env.DB_NAME)
  connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
})();

class Post {
  constructor(params) {
    this.id = params.id;
    this.title = params.title;
    this.content = params.content;
    this.thumbnailURL = params.thumbnailURL;

    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  async save() {
    const item = this.find(this.id);
    if (item) {
      await this.update();
      return true;
    } else {
      await connection.query(
        'INSERT INTO posts (title, content, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [this.title, this.content, this.createdAt, this.updatedAt]
      )
      return true
    }
  }

  async update() {
    this.updatedAt = new Date();

    await connection.query(
      'UPDATE posts SET title = ?, content = ?, updated_at = ? WHERE id = ?',
      [this.title, this.content, this.createdAt, this.updatedAt]
    )
  }

  static async findAll() {
    const [results] = await connection.query('SELECT * FROM posts', )
    const list = []
    results.forEach((row) => {
      list.push(Post.scan(row))
    })

    return list
  }

  static async find(id) {
    const [results] = await connection.query('SELECT * FROM posts WHERE id = ?', [id])
    const list = []
    results.forEach((row) => {
      list.push(Post.scan(row))
    })

    if (list.length === 0) {
      return
    }

    return Post.scan(list[0])
  }

  static scan(row) {
    return new Post({
      id: row.id,
      title: row.title,
      content: row.content,
      thumbnailURL: row.thumbnail_url,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })
  }

  get json() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      thumbnailURL: this.thumbnail_url,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}

module.exports = {
  Post
}
