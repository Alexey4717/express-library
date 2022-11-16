const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    max: 30,
    min: 3,
  },
  password: {
    type: String,
    required: true,
    max: 30,
    min: 3,
  },
  roles: [{ type: String, ref: "Role"}]
});

module.exports = model("User", UserSchema);
