import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

type CategoryType = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type MealType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const Profile = () => {
  const {
    user,
    favourites,
    favouriteCategories,
    toggleFavouriteCategory,
    toggleFavouriteMeal,
  } = useUserContext();

  const [savedMeals, setSavedMeals] = useState<MealType[]>([]);
  const [allCategories, setAllCategories] = useState<CategoryType[]>([]);

  // Fetch saved meals
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealPromises = favourites.map((id) =>
          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((res) =>
            res.json()
          )
        );
        const results = await Promise.all(mealPromises);
        const mealsData = results.map((r) => r.meals?.[0]).filter(Boolean);
        setSavedMeals(mealsData);
      } catch (error) {
        console.error("Error fetching saved meals:", error);
      }
    };

    if (favourites.length > 0) {
      fetchMeals();
    } else {
      setSavedMeals([]);
    }
  }, [favourites]);

  // Fetch all categories for details
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await res.json();
        setAllCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Filter only user's favourites
  const favouriteCategoryObjects = allCategories.filter((cat) =>
    favouriteCategories.includes(cat.strCategory)
  );

  return (
    <div className="profile-page">
      <h1>{user?.name}'s Profile</h1>
      <p>
        <strong>Username:</strong> {user?.username}
      </p>

      {/* Favourite Categories */}
      <section className="profile-section">
        <h2>Favourite Categories</h2>
        {favouriteCategoryObjects.length > 0 ? (
          <div className="categories-grid">
            {favouriteCategoryObjects.map((cat) => (
              <div key={cat.idCategory} className="category-card">
                <img src={cat.strCategoryThumb} alt={cat.strCategory} />
                <h2>{cat.strCategory}</h2>
                <p>{cat.strCategoryDescription.substring(0, 100)}...</p>
                <div className="category-actions">
                  <Link to={`/category/${cat.strCategory}`} className="view-btn">
                    View Items
                  </Link>
                  <button
                    className="fav-btn active"
                    onClick={() => toggleFavouriteCategory(cat.strCategory)}
                  >
                    ❌ Remove Favourite
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No favourite categories yet.</p>
        )}
      </section>

      {/* Saved Meals */}
      <section className="profile-section">
        <h2>Saved Meals</h2>
        {savedMeals.length > 0 ? (
          <div className="meals-grid">
            {savedMeals.map((meal) => (
              <div key={meal.idMeal} className="meal-card">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <h3>{meal.strMeal}</h3>
                <div className="meal-actions">
                  <Link to={`/meal/${meal.idMeal}`} className="view-btn">
                    View Details
                  </Link>
                  <button
                    className="fav-btn active"
                    onClick={() => toggleFavouriteMeal(meal.idMeal)}
                  >
                    ❌ Remove Favourite
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No saved meals yet.</p>
        )}
      </section>
    </div>
  );
};

export default Profile;
