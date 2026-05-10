const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog).save())
    await Promise.all(blogObjects)
})


describe('get', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test(`there ${initialBlogs.length} blogs`, async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test(`a specific blog is within the returned blogs`, async () => {
        const response = await api.get('/api/blogs')

        const titles = response.body.map(blog => blog.title)
        expect(titles).toContain(initialBlogs[2].title)
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

        expect(response.body).toHaveLength(initialBlogs.length + 1)
        const titles = response.body.map(blog => blog.title)
        expect(titles).toContain(newBlog.title)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
