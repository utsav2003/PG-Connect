const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
});

const pgSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  TenantType: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  furnishing: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: [imageSchema],
  services: {
    type: [String],
    required: true,
  },
  security: {
    type: [String],
    required: false,
  },
  rules: {
    type: [String],
    required: false,
  },
  availableShope: {
    //under progress
    type: Boolean,
  }, //for the PG data
  mealTypes: {
    type: [String],
    required: true,
  },
  mealOffering: {
    type: [String],
    required: true,
  },
  verify: {
    type: Boolean,
    default: false, // Set the default value to false
  },
});

const pgModel = new mongoose.model("pgSchema", pgSchema);
module.exports = pgModel;
