const express = require("express");
const authController = require("../controllers/authController");
const permissionController = require("../controllers/admin/permissionController");
const { permissionAddValidator } = require("../helpers/adminValidator");
const auth = require("../middlewares/authMiddleware");

const router = express();

router.post(
  "/add-permission",
  auth,
  permissionAddValidator,
  permissionController.addPermission
);

module.exports = router;
