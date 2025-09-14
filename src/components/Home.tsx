import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

type MealType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const Home = () => {
  const { user, favourites, favouriteCategories } = useUserContext();
  const [recentMeals, setRecentMeals] = useState<MealType[]>([]);
  const [randomMeal, setRandomMeal] = useState<MealType | null>(null);

  // Fetch recently saved meals (limit 3)
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealPromises = favourites.slice(0, 3).map((id) =>
          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((res) =>
            res.json()
          )
        );
        const results = await Promise.all(mealPromises);
        const mealsData = results.map((r) => r.meals?.[0]).filter(Boolean);
        setRecentMeals(mealsData);
      } catch (error) {
        console.error("Error fetching saved meals:", error);
      }
    };

    if (favourites.length > 0) {
      fetchMeals();
    } else {
      setRecentMeals([]);
    }
  }, [favourites]);

  // Fetch a random meal for inspiration
  useEffect(() => {
    const fetchRandomMeal = async () => {
      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await res.json();
        setRandomMeal(data.meals[0]);
      } catch (error) {
        console.error("Error fetching random meal:", error);
      }
    };
    fetchRandomMeal();
  }, []);

  return (
    <div className="home-page">
      {!user ? (
        <>
          <h1>Welcome to Meal Explorer</h1>
          <p>
            Discover delicious meals from all around the world. Log in to save your favourites
            and explore curated categories!
          </p>

          <section className="random-meal-section">
            <h2>Get Inspired</h2>
            {randomMeal && (
              <div className="meal-card">
                <img src={randomMeal.strMealThumb} alt={randomMeal.strMeal} />
                <h3>{randomMeal.strMeal}</h3>
                <Link to={`/meal/${randomMeal.idMeal}`} className="view-btn">
                  View Recipe
                </Link>
              </div>
            )}
          </section>

          <section className="login-section">
            <h2>Log In</h2>
            <p>Use your username to log in and access personalised content.</p>
            {/* Your existing login form goes here */}
          </section>
        </>
      ) : (
        <>
          <h1>Welcome back, {user.name}!</h1>
          <p>Your personal food journey awaits 🍴</p>

          {/* Favourite Categories */}
          {favouriteCategories.length > 0 && (
            <section className="fav-section">
              <h2>Your Favourite Categories</h2>
              <div className="fav-list">
                {favouriteCategories.map((cat) => (
                  <Link key={cat} to={`/category/${cat}`} className="fav-chip">
                    {cat}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Recently Saved Meals */}
          {recentMeals.length > 0 && (
            <section className="recent-section">
              <h2>Recently Saved Meals</h2>
              <div className="meals-grid">
                {recentMeals.map((meal) => (
                  <div key={meal.idMeal} className="meal-card">
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                    <h3>{meal.strMeal}</h3>
                    <Link to={`/meal/${meal.idMeal}`} className="view-btn">
                      View Recipe
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Random Meal Suggestion */}
          {randomMeal && (
            <section className="random-meal-section">
              <h2>Get Inspired</h2>
              <div className="meal-card">
                <img src={randomMeal.strMealThumb} alt={randomMeal.strMeal} />
                <h3>{randomMeal.strMeal}</h3>
                <Link to={`/meal/${randomMeal.idMeal}`} className="view-btn">
                  Try This!
                </Link>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
