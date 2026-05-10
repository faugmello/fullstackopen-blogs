const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require("../utils/logger");

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    let blog = request.body
    logger.info(blog)

    if (blog.likes === undefined) {
        blog = new Blog({...blog, likes: 0})
    } else {
        blog = new Blog(blog)
    }

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter
