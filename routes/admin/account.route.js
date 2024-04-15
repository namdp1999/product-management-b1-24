const express = require("express");
const multer  = require('multer');
const router = express.Router();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const controller = require("../../controllers/admin/account.controller");

const validate = require("../../validates/admin/account.validate");

const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single('avatar'),
  uploadCloud.uploadSingle,
  validate.createPost,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.single('avatar'),
  uploadCloud.uploadSingle,
  validate.editPatch,
  controller.editPatch
);

module.exports = router;