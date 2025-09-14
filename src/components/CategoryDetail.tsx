import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

type MealType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const CategoryDetail = () => {
  const { name } = useParams<{ name: string }>();
  const [meals, setMeals] = useState<MealType[]>([]);
  const [loading, setLoading] = useState(true);

  const { favourites, toggleFavouriteMeal } = useUserContext();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
        );
        const data = await res.json();
        setMeals(data.meals || []);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };

    if (name) fetchMeals();
  }, [name]);

  if (loading) return <p>Loading meals...</p>;

  // Get favourite meal names for this category
  const favouriteMealNames = meals
    .filter((meal) => favourites.includes(meal.idMeal))
    .map((meal) => meal.strMeal);

  return (
    <div className="category-detail-page">
      <h1>{name} Meals</h1>

      {/* Favourite Meals Line */}
      {favouriteMealNames.length > 0 && (
        <p className="favourite-categories">
          ⭐ Your favourite meals: {favouriteMealNames.join(", ")}
        </p>
      )}

      <div className="meals-grid">
        {meals.map((meal) => (
          <div key={meal.idMeal} className="meal-card">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h2>{meal.strMeal}</h2>
            <div className="meal-actions">
              <Link to={`/meal/${meal.idMeal}`} className="view-btn">
                View Details
              </Link>
              <button
                className={`fav-btn ${
                  favourites.includes(meal.idMeal) ? "active" : ""
                }`}
                onClick={() => toggleFavouriteMeal(meal.idMeal)}
              >
                {favourites.includes(meal.idMeal)
                  ? "❤️ Remove Favourite"
                  : "♡ Add Favourite"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetail;
