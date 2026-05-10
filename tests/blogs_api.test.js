const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog).save())
    await Promise.all(blogObjects)
})

describe('get', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test(`there ${helper.initialBlogs.length} blogs`, async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test(`a specific blog is within the returned blogs`, async () => {
        const response = await api.get('/api/blogs')

        const titles = response.body.map(blog => blog.title)
        expect(titles).toContain(helper.initialBlogs[2].title)
    })

    test(`blogs has property id, not _id`, async () => {
        const response = await api.get('/api/blogs')

        response.body.forEach(blog => {
            expect(blog.id).toBeDefined()
            expect(blog._id).toBeUndefined()
        })
    })
})

describe('post', () => {
    test('new blog is created', async () => {
        const newBlog = {
            title: "Some title",
            author: "Chris P. Bacon",
            url: "https://www.google.com",
            likes: 1
        }

        await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        const titles = response.body.map(blog => blog.title)
        expect(titles).toContain(newBlog.title)
    })

    test('likes should be defined or will be 0', async () => {
        const newBlog = {
            title: "Some title",
            author: "Chris P. Bacon",
            url: "https://www.google.com",
        }

        await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)

        const response = await api.get('/api/blogs')
        response.body.map(blog => {
            if (blog.title === newBlog.title) {
                expect(blog.likes).toEqual(0)
            }
        })
    })

    test('request should fail if blog dont have a title', async () => {
        const newBlog = {
            author: "Chris P. Bacon",
            likes: 20,
            url: 'https://www.google.com'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('request should fail if blog dont have a url', async () => {
        const newBlog = {
            author: "Chris P. Bacon",
            likes: 20,
            title: "Some title"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('delete', () => {
    test('delete a blog', async () => {
        let response = await api.get('/api/blogs')
        const blogToDelete = response.body.get(0)
        await api
            .delete('/api/blogs', blogToDelete.title)
            .expect(204)

        blogsInDb = await api.get('api/blogs')
        blogsInDb.forEach(blog => {
            expect(blog).not.toEqual(blogToDelete)
        })
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
