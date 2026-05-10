const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require("../utils/logger");

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.patch('/:title', async (request, response) => {
    if (!request.body) {
        return response.status(400).json({ error: 'content missing' })
    }

    const { likes } = request.body

    if (likes === undefined) {
        return response.status(400).send({ error: 'likes field is required' }).end()
    }

    const updatedBlog = await Blog.findOneAndUpdate(
        { title: request.params.title },
        { likes: likes },
        { new: true, runValidators: true }
    )

    if (!updatedBlog) {
        return response.status(404).end()
    }

    response.json(updatedBlog)
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
        return response.status(400).send({ error: "field title is required" }).end()
    } else if (blog.url === undefined) {
        return response.status(400).send({ error: "field url is required" }).end()
    } else if (blog.likes === undefined) {
        blog = new Blog({...blog, likes: 0})
    } else {
        blog = new Blog(blog)
    }

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter
