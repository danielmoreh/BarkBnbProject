const express = require("express");
const dogController = require("./../controllers/dogController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, dogController.getAllDogs)
  .post(dogController.createDog);

router
  .route("/:id")
  .get(dogController.getDog)
  .patch(dogController.updateDog)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    dogController.deleteDog
  );

module.exports = router;
