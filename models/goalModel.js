import mongoose from "mongoose";

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

const goalModel = mongoose.model("goal", goalSchema);

export default goalModel;
