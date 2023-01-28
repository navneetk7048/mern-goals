import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { RootState } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  function handleLogout() {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">GoalSetter</Link>
      </div>
      <ul>
        {auth.user && (
          <li>
            <button className="btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        )}
        {!auth.user && (
          <li>
            <Link to="/login">
              <FaSignInAlt /> Login
            </Link>
          </li>
        )}
        {!auth.user && (
          <li>
            <Link to="/register">
              <FaUser /> Register
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
