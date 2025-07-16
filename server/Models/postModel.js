const mongoose = require("mongoose");

const postschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: String, 
      default: "",
    },
    author: {
      type: String,
      required: true,
    },
    visibility: {
      type: String,
      enum: ["public", "private", "unlisted"], 
      default: "public",
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("postModel", postschema);
