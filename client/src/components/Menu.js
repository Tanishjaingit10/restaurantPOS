import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CustomNavBar from "../items/CustomNavBar";

const Menu = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [displayCategory, setDisplayCategory] = useState(false);
  const [category, setCategory] = useState();
  const openCategory = (id) => (e) => {
    console.log(id);
    history.push(`/categorydisplay/${id}`);
  };
  const loadCategory = async () => {
    await fetch("/app/category")
      .then((res) => res.json())
      .then((json) => setCategory(json));
  };
  const openMenu = async (e) => {
    e.preventDefault();
    setShow(!show);
    setDisplayCategory(
      category.map((option) => {
        return (
          <button
            value={option.category}
            name="color"
            onClick={openCategory(option.category)}
            className="hover:bg-gray-300 block align-middle py-4 px-6 w-44 no-underline m-2 "
            style={{ backgroundColor: option.color }}
          >
            {option.category}
          </button>
        );
      })
    );
  };

  useEffect(() => {
    loadCategory();
  });
  return (
    <div className=" text-white font-roboto">
      <CustomNavBar />
      <div className="flex flex-col w-96 justify-center mx-auto h-auto top-36 mt-44 text-xl">
        <button
          className=" bg-primary text-white font-bold py-4 my-4"
          onClick={openMenu}
        >
          View Menu
        </button>
        <button className="bg-primary text-white font-bold py-4  my-4">
          <a href="/addcategory">Add new category</a>
        </button>
        <button className="bg-primary text-white font-bold py-4  my-4">
          <a href="/additem">Add new food item</a>
        </button>
      </div>

      {show && (
        <div className="popup-box">
          <div className=" w-96 mx-auto font-roboto font-bold mt-52 bg-white relative">
            <div
              className="text-gray-400 text-center cursor-pointer rounded-full w-8 h-8 absolute -top-2 -right-4 bg-white"
              onClick={() => {
                setShow(!show);
              }}
            >
              <span className="text-lg">x</span>
            </div>
            <div className="flex flex-wrap">{displayCategory}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
