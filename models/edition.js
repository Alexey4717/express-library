const { Schema, model } = require("mongoose");

const EditionSchema = new Schema({
  name: { type: String, required: true, max: 100, min: 3 },
  date_of_edition: { type: Date },
});

EditionSchema
  .virtual("url")
  .get(() => "/catalog/edition/" + this._id);

module.exports = model("Edition", EditionSchema);
