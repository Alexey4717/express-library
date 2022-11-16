const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") next();

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "User is not authorized" });
    }
    const { roles: userRoles } = jwt.verify(
      token,
      process.env.SECRET_JWT_CODE
    );
    let hasRoles = false;
    userRoles.forEach((role) => {
      if (role === "ADMIN") {
        hasRoles = true;
      }
    });

    if (!hasRoles) {
      return res
        .status(403)
        .json({ message: "You do not have access to data" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "You do not have access to data" });
  }
};
