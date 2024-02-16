require('dotenv').config()
const Bookmark = require('../../models/bookmark')
const User = require('../../models/user')

/****** C - Create *******/
// async function create(req, res, next){
//     try {
//         const bookmark = await Bookmark.create(req.body)
//         console.log(bookmark)
//         res.locals.data.bookmark = bookmark
//         next()
//     } catch (error) {
//         res.status(400).json({ msg: error.message })
//     }
// }

const createBookmark = async (req, res, next) => {
    try {
        const createdBookmark = await Bookmark.create(req.body)
        const user = await User.findOne({ email: res.locals.data.email })
        user.bookmarks.addToSet(createdBookmark)
        await user.save()
        res.locals.data.bookmark = createdBookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

/****** R - Read *****/

async function index(_, res ,next) {
    try {
        const bookmarks = await Bookmark.find({})
        res.locals.data.bookmarks = bookmarks
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

/****** U - Update *****/

// async function update(req ,res,next) {
//     try {
//         const bookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         res.locals.data.bookmark = bookmark
//         next()
//     } catch (error) {
//         res.status(400).json({ msg: error.message })
//     }
// }

const updateBookmark = async (req, res, next) => {
    try {
       const updatedBookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
       res.locals.data.bookmark = updatedBookmark
       next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

/***** D - destroy/delete *****/

const destroyBookmark = async (req, res, next) => {
    try {
       const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id)
       res.locals.data.bookmark = deletedBookmark
       next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const respondWithBookmark = (req, res) => {
    res.json(res.locals.data.bookmark)
}

const respondWithBookmarks = (req, res) => {
    res.json(res.locals.data.bookmarks)
}

module.exports = {
    createBookmark,
    index,
    updateBookmark,
    destroyBookmark,
    respondWithBookmarks,
    respondWithBookmark
}

// async function destroy(req ,res,next) {
//     try {
//         const bookmark = await Bookmark.findByIdAndDelete(req.params.id)
//         res.locals.data.bookmark = bookmark
//         next()
//     } catch (error) {
//         res.status(400).json({ msg: error.message })
//     }
// }
