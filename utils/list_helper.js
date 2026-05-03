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

module.exports = { dummy, totalLikes, favoriteBlog }
