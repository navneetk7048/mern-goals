import Goal from "./Goal";
import Slice from "./Slice";

export default interface SliceGoal extends Slice {
  goals: Goal[];
}
