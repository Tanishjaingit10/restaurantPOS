import React, { useContext } from "react";
import { useParams } from "react-router";
import { CategoryContext } from "../context/Category";

const ItemDisplay = () => {
  const cat = useParams();
  const [foodItems] = useContext(CategoryContext);
  foodItems.map((option) => {
    if (option.category === cat) {
      return (
        <div className="bg-gray-200 img-holder">
          <img src={option.image} className="image" alt="" id="img" />
        </div>
      );
    }
    return null;
  });
};

export default ItemDisplay;
