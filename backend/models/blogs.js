const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},
{
    timestamps: true
});

const blogSchema = new Schema({
    header: {
        type: String,
        required: true,
        unique: true
    },
    article: {
        type: String,
        required: true,
    },
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    label: {
        type: String,
        required: false
    },
    comments: [ commentSchema ]
}, 
{
    timestamps: true
});

var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;