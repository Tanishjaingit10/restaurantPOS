import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../context/Theme";
import CustomNavBar from "../items/CustomNavBar";
import AddCategoryButton from "./Menu/AddCategoryButton";
import AddFoodItemButton from "./Menu/AddFoodItemButton";
import CategoryButton from "./Menu/CategoryButton";
import ItemInfoButton from "./Menu/ItemInfoButton";

const Menu = () => {
  // const history = useHistory();
  // const [show, setShow] = useState(false);
  // const [displayCategory, setDisplayCategory] = useState(false);
  // const [category, setCategory] = useState();
  // const openCategory = (id) => (e) => {
  //   console.log(id);
  //   history.push(`/categorydisplay/${id}`);
  // };
  // const loadCategory = async () => {
  //   await fetch("/app/category")
  //     .then((res) => res.json())
  //     .then((json) => setCategory(json));
  // };
  // const openMenu = async (e) => {
  //   e.preventDefault();
  //   setShow(!show);
  //   setDisplayCategory(
  //     category.map((option) => {
  //       return (
  //         <button
  //           value={option.category}
  //           name="color"
  //           onClick={openCategory(option.category)}
  //           className="hover:bg-gray-300 block align-middle py-4 px-6 w-44 no-underline m-2 "
  //           style={{ backgroundColor: option.color }}
  //         >
  //           {option.category}
  //         </button>
  //       );
  //     })
  //   );
  // };

  // useEffect(() => {
  //   loadCategory();
  // });



  const theme = useContext(ThemeContext)
  
  return (
    <>
    <div className="font-roboto h-screen">
      <CustomNavBar />
      <div className="flex h-24 items-center justify-between border-b-2 border-gray-300">
        <p className="text-2xl text-gray-500 ml-6 font-bold ">Menu</p>
        <div>
          <button className="fas fa-sync-alt bg-red mr-6 p-4 text-white rounded-md" style={{backgroundColor:theme.backgroundColor}}></button>
          <button className="mr-6 p-4 text-white rounded-md leading-4" style={{backgroundColor:theme.backgroundColor}}>- Delete Food Item</button>
          <AddFoodItemButton/>
          <button className="mr-6 p-4 text-white rounded-md leading-4" style={{backgroundColor:theme.backgroundColor}}>- Delete Category</button>
          <AddCategoryButton/>
        </div>
      </div>
      <div className="p-6">
        <div><CategoryButton/></div>
        <div className="grid grid-rows-2 grid-cols-6 py-2">
          <ItemInfoButton/>
          <ItemInfoButton/>
          <ItemInfoButton/>
          <ItemInfoButton/>
          <ItemInfoButton/>
          <ItemInfoButton/>
          <ItemInfoButton/>
          <ItemInfoButton/>
          <ItemInfoButton/>
          <ItemInfoButton/>
          <ItemInfoButton/>
          <ItemInfoButton/>
        </div>
      </div>
    </div>





      {/* <div className="font-roboto">
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
      </div> */}
    </>
  );
};

export default Menu;
