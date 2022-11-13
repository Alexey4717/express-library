const { Schema, model } = require('mongoose')

const GenreSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    max: 100,
    min: 3
  }
})

GenreSchema
  // .virtual('name')
  .get(function () {
    return this.name;
  })

// Virtual for genre's URL
GenreSchema
  .virtual('url')
  .get(function() {
    return '/catalog/genre/' + this._id;
  })

module.exports = model('Genre', GenreSchema)
