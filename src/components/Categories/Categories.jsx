import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./Categories.css";
import Sort_icon from "/Categories_icons/sort_icon.svg";

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [categoryWiseData, setCategoryWiseData] = useState([]);

  const allCategories = [
    "Home necessities",
    "Food and drinks",
    "Investments",
    "Entertainment",
    "Transportation",
    "Rent",
    "Utilities",
    "Emergency",
    "Loans",
    "Vacation",
    "Other",
  ];

  const totalExpensesByCategory = categoryWiseData.reduce((acc, category) => {
    acc[category._id] = category.totalExpense;
    return acc;
  }, {});

  useEffect(() => {
    const getCategorywiseExpense = () => {
      fetch(
        `${import.meta.env.VITE_API_BASE_URL}/transaction/categoryWiseExpense`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
            method: "GET",
          },
        }
      )
        .then((data) => data.json())
        .then((response) => {
          setCategoryWiseData(response);
          setLoading(false);
        });
    };
    getCategorywiseExpense();
  }, []);

  // Sort categories by totalExpense from high to low
  allCategories.sort(
    (a, b) =>
      (totalExpensesByCategory[b.toLowerCase()] || 0) -
      (totalExpensesByCategory[a.toLowerCase()] || 0)
  );

  return (
    <div className="categories">
      <div className="heading">
        <p>Categories</p>
        <img src={Sort_icon} alt="" />
      </div>
      {loading ? (
        <ClipLoader
          color={"#37689A"}
          loading={loading}
          cssOverride={{
            display: "flex",
            margin: "50px auto",
          }}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className="category-body">
          {allCategories.map((category, index) => (
            <div className="category" key={index}>
              <div className="category-name">
                <img src={`/Categories_icons/${category}.svg`} alt="" />
                <p>{category}</p>
              </div>
              <p className="amount">
                {" "}
                &#8377;{totalExpensesByCategory[category.toLowerCase()] || 0}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
