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

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const likesPerAuthor = new Map()

    blogs.forEach(blog => {
        const author = blog.author

        let likesSoFar
        if (likesPerAuthor.has(author)) {
            likesSoFar = likesPerAuthor.get(author) + blog.likes
        } else {
            likesSoFar = blog.likes
        }

        likesPerAuthor.set(author, likesSoFar)
    })

    let mostLikedAuthor
    let mostLikes = 0

    likesPerAuthor.entries().forEach(lpa => {
        if (lpa[1] > mostLikes) {
            mostLikedAuthor = lpa[0]
            mostLikes = lpa[1]
        }
    })

    return {
        author: mostLikedAuthor,
        likes: mostLikes
    }
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
