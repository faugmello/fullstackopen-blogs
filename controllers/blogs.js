const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require("../utils/logger");

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.delete('/:title', async (request, response) => {
    const deletedBlog = await Blog.findOneAndDelete({ title: request.params.title })

    if (!deletedBlog) {
        return response.status(404).end()
    }

    response.status(204).end()
})


blogsRouter.post('/', async (request, response) => {
    let blog = request.body
    logger.info(blog)

    if (blog.title === undefined) {
        response.status(400).send({ error: "field title is required" }).end()
        return
    } else if (blog.url === undefined) {
        response.status(400).send({ error: "field url is required" }).end()
        return
    } else if (blog.likes === undefined) {
        blog = new Blog({...blog, likes: 0})
    } else {
        blog = new Blog(blog)
    }

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter
