import React, { useEffect} from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../actions/CategoryActions";

const CategoryList = () => {
  const categories = useSelector((state) => state.allCategories.categories);
  
  const renderList = categories.map((cat)=>{
             const {category, description, color} = cat;
              return (
                <div>
                  <Link to={`/category/${category}`}>
                <button value={category} name="color" className="hover:bg-gray-300 block align-middle py-4 px-6 w-44 no-underline m-2 " style={{ backgroundColor: color }}>{category}</button>
              </Link>
              </div>
              )
  })
  const dispatch = useDispatch();
  const fetchCategories = async()=> {
      const response = await fetch(
        "/app/category")
         .then((res) => res.json())
        .catch((err)=> {
            console.log("Error", err);
        });
        dispatch(setCategories(response));  
  };
  console.log(categories);
  useEffect (()=> {
      fetchCategories();
  }, []);
  console.log("Categories:" ,categories);

  return (
    <div>
      
          <div className="flex flex-wrap justify-evenly">
           {renderList}
          </div>
      
    </div>
  );
};

export default CategoryList;
