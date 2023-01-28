import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";
import Store from "../types/Store";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state: Store) => state.auth);
  const goals = useSelector((state: Store) => state.goals);

  useEffect(() => {
    if (auth.isError) {
      console.log(auth.message);
    }

    if (!auth.user) {
      navigate("/login");
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, auth]);

  if (auth.isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {auth.user && auth.user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {goals.goals.length > 0 ? (
          <div className="goals">
            {goals.goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
}
