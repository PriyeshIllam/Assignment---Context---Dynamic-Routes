import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

type CategoryType = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

const Categories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const { favouriteCategories, toggleFavouriteCategory } = useUserContext();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await res.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="categories-page">
      <h1>Meal Categories</h1>

      {favouriteCategories.length > 0 && (
        <p className="fav-category">
          ⭐ Your favourite categories:{" "}
          <strong>{favouriteCategories.join(", ")}</strong>
        </p>
      )}

      <div className="categories-grid">
        {categories.map((cat) => {
          const isFavourite = favouriteCategories.includes(cat.strCategory);

          return (
            <div key={cat.idCategory} className="category-card">
              <img src={cat.strCategoryThumb} alt={cat.strCategory} />
              <h2>{cat.strCategory}</h2>
              <p>{cat.strCategoryDescription.substring(0, 100)}...</p>

              <div className="category-actions">
                <Link to={`/category/${cat.strCategory}`} className="view-btn">
                  View items
                </Link>
                <button
                  className={`fav-btn ${isFavourite ? "active" : ""}`}
                  onClick={() => toggleFavouriteCategory(cat.strCategory)}
                >
                  {isFavourite ? "❤️ Favourite" : "♡ Set Favourite"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
