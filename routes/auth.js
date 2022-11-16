const express = require("express");
const router = express.Router();

const auth_controller = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post("/registration", auth_controller.registration);
router.post("/login", auth_controller.login);
router.get("/users", roleMiddleware, auth_controller.get_users);

module.exports = router;
