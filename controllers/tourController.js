const Tour = require("../models/tourModel");
const mongoose = require("mongoose");

// get all tour

const getTours = async (req, res) => {
  const tours = await Tour.find({}).sort({});

  res.status(200).json(tours); // res.status 200 means ok
};

//  get a single tour

const getTour = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such tour" });
  }

  const tour = await Tour.findById(id);

  if (!tour) {
    return res.status(404).json({ error: "No such tour" });
  }

  res.status(200).json(tour);
};

// for admin //

// create new item
const createTour_post = async (req, res) => {
  const { name, price, image } = req.body;

  // here we are using de-structing assigning name and email and password to , from the request body we got.

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!price) {
    emptyFields.push("email");
  }
  if (!image) {
    emptyFields.push("password");
  }

  if (emptyFields > 0) {
    return res
      .status(400)
      .json({ error: "please send all the needs components", emptyFields });
  }

  try {
    const tour = await Tour.create({ name, price, image });
    res.status(200).json(tour);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a item
const deleteTour_post = async (req, res) => {
  const { id } = req.params;

  // so avoid  id } = req.params.id ?!

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such tour" });
  }

  const tour = await Tour.findOneAndDelete({ _id: id });

  if (!tour) {
    return res.status(400).json({ error: "No such tour" });
  }

  res.status(200).json(tour);
};

// update a item

const updateTour_post = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such tour" });
  }

  const tour = await Tour.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!tour) {
    return res.status(400).json({ error: "No such tour" });
  }

  res.status(200).json(tour);
};

module.exports = {
  getTours,
  getTour,
  createTour_post,
  deleteTour_post,
  updateTour_post,
};
