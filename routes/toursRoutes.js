const express = require("express");
const authController = require("./../controllers/authController");
const tourController = require("./../controllers/tourController");

const router = express.Router();

// GET all tours
router.get("/", tourController.getTours);

// //GET a single tour
router.get("/:id", tourController.getTour);

// for admin  //

// POST a new tour //
router.post(
  "/",
  authController.requireAuth,
  authController.restrictTo,
  tourController.createTour_post
);

// DELETE a tour //
router.delete(
  "/:id",
  authController.requireAuth,
  authController.restrictTo,
  tourController.deleteTour_post
);

// UPDATE a tour //
router.patch(
  "/:id",
  authController.requireAuth,
  authController.restrictTo,
  tourController.updateTour_post
);

module.exports = router;
