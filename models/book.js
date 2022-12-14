const { Schema, model } = require('mongoose')

const BookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: Schema.ObjectId, ref: 'Author', required: true},
    summary: {type: String, required: true},
    isbn: {type: String, required: true},
    genre: [{type: Schema.ObjectId, ref: 'Genre'}],
    edition: [{type: Schema.ObjectId, ref: 'Edition'}],
  })

// Virtual for book's URL
BookSchema
  .virtual('url')
  .get(function () {
    return '/catalog/book/' + this._id;
  })

module.exports = model('Book', BookSchema)
