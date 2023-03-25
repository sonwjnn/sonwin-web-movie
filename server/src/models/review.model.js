import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.option.js";

const reviewScheme = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      require: true,
    },
    mediaType: {
      type: String,
      enum: ["tv", "movie"],
      require: true,
    },
    mediaId: {
      type: String,
      require: true,
    },
    mediaTitle: {
      type: String,
      require: true,
    },
    mediaPoster: {
      type: String,
      require: true,
    },
  },
  modelOptions
);

export default reviewModel = mongoose.model("Review", reviewScheme);
