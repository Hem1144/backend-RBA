const { validationResult } = require("express-validator");
const Permission = require("../../models/permissionModel");

const addPermission = async (req, res) => {
  console.log(req.body);
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Errors",
        errors: errors.array(),
      });
    }

    const { permission_name } = req.body;
    const isExistsPermission = await Permission.findOne({ permission_name });
    if (isExistsPermission) {
      return res.status(400).json({
        success: false,
        message: "Permission Name already exists!",
      });
    }

    let obj = {
      permission_name,
    };

    if (req.body.default) {
      obj.is_default = parseInt(req.body.default);
    }

    const permission = new Permission(obj);
    const newPermission = await permission.save();

    return res.status(201).json({
      success: true,
      message: "Permission Added successfully!",
      data: newPermission,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addPermission };
