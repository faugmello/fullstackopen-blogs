const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const favoriteBlog = blogs.reduce((previous, current) => {
        if (current.likes > previous.likes) {
            return current
        } else {
            return previous
        }
    }, blogs[0])

    if (favoriteBlog.likes === 0) {
        return null
    } else {
        return {
            title: favoriteBlog.title,
            author: favoriteBlog.author,
            likes: favoriteBlog.likes
        }
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const blogsPerAuthor = new Map()

    blogs.forEach(blog => {
        const author = blog.author
        let blogsSoFar
        if (blogsPerAuthor.has(author)) {
            blogsSoFar = blogsPerAuthor.get(author) + 1
        } else {
            blogsSoFar = 1
        }

        blogsPerAuthor.set(author, blogsSoFar)
    })

    let authorWithMostBlogs
    let highestBlogsCount = 0

    blogsPerAuthor.entries().forEach(bpa => {
        if (bpa[1] > highestBlogsCount) {
            authorWithMostBlogs = bpa[0]
            highestBlogsCount = bpa[1]
        }
    })

    return {
        author: authorWithMostBlogs,
        blogs: highestBlogsCount
    }
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs}
