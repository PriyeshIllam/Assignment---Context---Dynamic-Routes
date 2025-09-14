import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUserContext } from "./context/UserContext";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import Categories from "./components/Categories";
import CategoryDetail from "./components/CategoryDetail";
import MealDetail from "./components/MealDetail";
import Profile from "./components/Profile";
import Home from "./components/Home"


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
              <Route path="/category/:name" element={<CategoryDetail />} />
              <Route path="/meal/:id" element={<MealDetail />} />
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
