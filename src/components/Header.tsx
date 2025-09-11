import { useUserContext } from "../context/UserContext";
import Navbar from "./Navbar";

// App Header Component
const Header = () => {
  const { user } = useUserContext();

  return (
    <header className="app-header">
      {/* Logo */}
      <div className="logo">🍴 Recipe Finder</div>

      {/* Show navigation only if user is logged in */}
      {user && <Navbar />}
    </header>
  );
};

export default Header;
