import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

// Navigation bar component
const Navbar = () => {
  const { logout } = useUserContext();

  return (
    <nav className="navbar">
      {/* Navigation links */}
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/categories">Categories</Link>

      {/* Logout button */}
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
