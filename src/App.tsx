import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUserContext } from "./context/UserContext";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";

// Simple Home page
const Home = () => {
  const { user } = useUserContext();
  return <h1>Welcome {user?.name || "Guest"}!</h1>;
};

// Profile page showing user's favourites
const Profile = () => {
  const { user, favourites } = useUserContext();
  return (
    <div>
      <h2>{user?.name}'s Profile</h2>
      <p>Saved items: {favourites.length ? favourites.join(", ") : "None"}</p>
    </div>
  );
};

// Placeholder Categories page
const Categories = () => <h2>Categories Page (coming soon)</h2>;

// Main App component
const App = () => {
  const { user } = useUserContext();

  return (
    <Router>
      {user ? (
        <div>
          <Header />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </main>
        </div>
      ) : (
        <LoginForm />
      )}
    </Router>
  );
};

export default App;
