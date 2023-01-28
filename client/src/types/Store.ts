import AuthSlice from "./SliceAuth";
import GoalSlice from "./SliceGoal";

export default interface Store {
  auth: AuthSlice;
  goals: GoalSlice;
}
