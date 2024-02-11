const { model, Schema } = require('mongoose')


const bookmarkSchema = new Schema ({
    title: { required: true, type: String },
    url: { required: true, type: String }
}, {
    timestamps: true
})

const Bookmark = model('Bookmark', bookmarkSchema)

module.exports = Bookmark
