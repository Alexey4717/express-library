const { Schema, model } = require('mongoose')
const moment = require('moment')

const AuthorSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  })

// Виртуальное свойство для полного имени автора
AuthorSchema
  .virtual('name')
  .get(function () {
    return this.family_name + ', ' + this.first_name;
  })

// Виртуальное свойство - URL автора
AuthorSchema
  .virtual('url')
  .get(function () {
    return '/catalog/author/' + this._id;
  })

// Виртуальное свойство для форматированной даты рождения
AuthorSchema
  .virtual('date_of_birth_formatted')
  .get(function () {
    return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
  })

// Виртуальное свойство для форматированной даты смерти
AuthorSchema
  .virtual('date_of_death_formatted')
  .get(function () {
    return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
  })

module.exports = model('Author', AuthorSchema)
