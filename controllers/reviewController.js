const Review = require("../models/reviewModel");
const mongoose = require("mongoose");

// create new review
const reviewPush_post = async (req, res) => {
  // console.log(req.body.reviewdetails);

  const { review, tour } = req.body.reviewdetails; // from the req.body sent from the frontend
  const user = res.locals.user.email;

  // console.log(review, tour);
  // console.log(res.locals.user);

  const reviewMade = await Review.create({
    review,
    tour,
    user,
  });

  if (reviewMade) {
    res.status(200).json({ message: "review added" });
  } else {
    // console.log(order);
    res.status(400).json({ error: "there was an error" });
  }
};

// get user orders
const getUsersReviews_post = async (req, res) => {
  const allUserReviews = await Review.find({});
  // console.log(allUserReviews);

  // try {
  res.status(200).json({ message: "all reviews sent", Review: allUserReviews });
  // } catch (error) {
  //   res.status(400).json({ error: "there was an error" });
  // }
};

module.exports = {
  reviewPush_post,
  getUsersReviews_post,
};
