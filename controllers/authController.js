const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");


const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, process.env.SECRET_JWT_CODE, { expiresIn: "24h" });
};

exports.registration = async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    // check usere exists
    const candidate = await User.findOne({ username });
    if (candidate) {
      return res
        .status(400)
        .json({ message: `User with name ${username} already exists` });
    }

    const userRole = await Role.findOne({ value: "USER" });
    const hashPassword = bcrypt.hashSync(password, 7);

    const user = new User({
      username,
      password: hashPassword,
      roles: [userRole.value],
    });

    user.save((err) => {
      if (err) return next(err);
      res.json({ message: "New user created successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Registration error" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: `User ${username} not exists` });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "This password is not valid" });
    }

    const token = generateAccessToken(user._id, user.roles);
    return res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Login error" });
  }
};

exports.get_users = async (req, res, next) => {
  try {
    const users = await User.find()
    res.json(users);
  } catch (error) {}
};
