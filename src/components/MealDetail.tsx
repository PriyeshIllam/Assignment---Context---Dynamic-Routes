import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

type MealDetailType = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  [key: string]: any; // for dynamic ingredient keys
};

const MealDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<MealDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  const { favourites, toggleFavouriteMeal } = useUserContext();

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setMeal(data.meals ? data.meals[0] : null);
      } catch (error) {
        console.error("Error fetching meal:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMeal();
  }, [id]);

  if (loading) return <p>Loading meal details...</p>;
  if (!meal) return <p>Meal not found.</p>;

  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <div className="meal-detail-page">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to {meal.strCategory}
      </button>

      <h1>{meal.strMeal}</h1>

      <div className="meal-header">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div className="meal-info">
          <p>
            <strong>Category:</strong> {meal.strCategory}
          </p>
          <p>
            <strong>Area:</strong> {meal.strArea}
          </p>
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

      <div className="meal-instructions">
        <h2>Instructions</h2>
        <p>{meal.strInstructions}</p>
      </div>

      <div className="meal-ingredients">
        <h2>Ingredients</h2>
        <ul>
          {ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>
      </div>

      {meal.strYoutube && (
        <div className="meal-video">
          <h2>Recipe Video</h2>
          <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
};

export default MealDetail;
