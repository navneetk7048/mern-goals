import { model, Schema } from "mongoose";
import { IUser } from "./User.js";

export interface IGoal {
  user: IUser;
  text: string;
}

const goalSchema = new Schema<IGoal>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  { timestamps: true }
);

const Goal = model<IGoal>("Goal", goalSchema);

export default Goal;
