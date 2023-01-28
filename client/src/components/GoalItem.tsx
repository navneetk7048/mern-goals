import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import Goal from "../types/Goal";

interface GoalItemProps {
  goal: Goal;
}

const GoalItem = ({ goal }: GoalItemProps) => {
  const dispatch = useDispatch();

  function handleDeleteGoal() {
    dispatch(deleteGoal(goal._id));
  }

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString()}</div>
      <h2>{goal.text}</h2>
      <button className="close" onClick={handleDeleteGoal}>
        X
      </button>
    </div>
  );
};
export default GoalItem;
