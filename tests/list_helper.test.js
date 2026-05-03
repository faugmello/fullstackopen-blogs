const listHelper = require('../utils/list_helper')

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

describe('dummy', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})

describe('totalLikes', () => {

    test('totalLikes returns 0 when list is empty', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('totalLikes should sum likes for all blogs in a list', () => {
        expect(listHelper.totalLikes(blogs)).toBe(36)
    })
})

describe('favoriteBlogs', () => {
    test('favoriteBlogs returns null if list is empty', () => {
        expect(listHelper.favoriteBlog([])).toBe(null)
    })

    test('favoriteBlogs returns null if all blogs have 0 likes', () => {
        expect(listHelper.favoriteBlog([].concat(blogs[4]))).toBe(null)
    })

    test('favoriteBlog finds the blog with most likes', () => {
        expect(listHelper.favoriteBlog(blogs)).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        })
    })
})

describe('mostBlogs', () => {
    test('mostBlogs returns the author with most posts', () => {
        expect(listHelper.mostBlogs(blogs)).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        })
    })

    test('mostBlogs returns null if list is empty', () => {
        expect(listHelper.mostBlogs([])).toBe(null)
    })
})

describe('mostLikes', () => {
    test('mostLikes returns the author with most likes', () => {
        expect(listHelper.mostLikes(blogs)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })

    test('mostLikes returns null if list is empty', () => {
        expect(listHelper.mostLikes([])).toBe(null)
    })
})
