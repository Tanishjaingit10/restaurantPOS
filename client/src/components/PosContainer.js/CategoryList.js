import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../actions/CategoryActions";

const CategoryList = () => {
  const categories = useSelector((state) => state.allCategories.categories);
  const [displayItems, setDisplayItems] = useState();
  const [order, showOrder] = useState({image: "", variant: [],price: 0});
    const [Variant, setVariant] = useState();
    const [finalVar, setFinalVariant]=useState([]);
    const [addList, setAddList] = useState();
    const [list, showList] = useState(false);
  const showItems = async (e) => {

    const result = await fetch('/app/items').then((res) => res.json())
      .then((json) => {
        console.log(json)
        setDisplayItems(json.map((option) => {
          if (option.category === e.target.value) {
            return (<div className="bg-white m-2 relative rounded-xl shadow-2xl w-40 cursor-pointer" onClick={()=>setOrder(option.foodItem)}><img src={option.image} className="w-40 object-fill" alt="" />
              <span className="absolute right-0 top-0 text-center w-20 py-2 bg-white">{option.price}</span>
              <div className="text-center bg-white py-2">{option.foodItem}</div></div>)
          }
        }))

      })

  }
  const showVariant = async(e)=>{
    console.log(e)
    setFinalVariant(oldArray => [...oldArray, Variant])
    showList(!list);
    setAddList(
        e.map((obj)=>{
        return (<button className="bg-primary px-10 py-2 w-full mb-2 relative"><a>{obj.variant} / $ {obj.price}</a><span className="absolute right-4">x</span></button>)
        }))
    setOrder("chowmein");


}
  const setOrder = async (e) => {
    if(e){
    const result = await fetch(`/app/item/${e}`).then((res) => res.json())
      .then((json) => {
        showOrder({
          "image": json.image,
          "variant": json.finalVariant,
          "price": json.price
        }
          // <div className="absolute top-16 right-0 bg-white border-l-2 border-primary w-2/5 h-full">
          //   <div className="w-72 mt-6 bg-gray-500 mx-auto h-36"><img src={json.image} /></div>
          //   <h1 className="text-gray-500 text-left text-xl my-4 font-semibold font-roboto ml-4">Select Quantity</h1>
           
          //   <div className="flex flex-col px-8 space-y-4 text-xl font-roboto py-4">
          //     {list ? <div>{addList}</div>:null}
          //     <button className="bg-green text-center text-white py-2 font-bold" onClick={() => showVariant(json.finalVariant)}>+</button>
          //   </div>
          //   <div className="bg-gray-300 w-full relative text-gray-600 px-6 py-8 text-xl font-bold font-roboto">
          //     <label>Subtotal</label><span className="absolute right-4">{json.price}</span>
          //   </div>
          //   <div className="px-8 py-4">
          //     <button className="bg-green text-white text-center text-lg font-bold w-full py-2">Add to Cart</button>
          //   </div>
          // </div>
        )
      }

      )
    }

  }

  

  const renderList = categories.map((cat) => {
    const { category, description, color } = cat;
    return (
      <div>
        <button value={category} name="color" className="hover:bg-gray-300 block align-middle py-4 px-6 w-44 no-underline m-2 " onClick={showItems} style={{ backgroundColor: color }}>{category}</button>
      </div>
    )
  })
  const dispatch = useDispatch();
  const fetchCategories = async () => {
    const response = await fetch(
      "/app/category")
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error", err);
      });
    dispatch(setCategories(response));
  };
  useEffect(() => {
    fetchCategories();
    
  }, []);

 
  console.log("Categories:", categories);

  return (
  
    <div>

      <div className="flex flex-wrap justify-evenly">
        {renderList}
      </div>
      <div>
        {displayItems}
      </div>
      {/* <div>
        {order}
      </div> */}
    
      {order.image?<div className="absolute top-16 right-0 bg-white border-l-2 border-primary w-2/5 h-full">
            <div className="w-72 mt-6 bg-gray-500 mx-auto h-36"><img src={order.image} /></div>
            <h1 className="text-gray-500 text-left text-xl my-4 font-semibold font-roboto ml-4">Select Quantity</h1>
           
            <div className="flex flex-col px-8 space-y-4 text-xl font-roboto py-4">
              {list ? <div>{addList}</div>:null}
              <button className="bg-green text-center text-white py-2 font-bold" onClick={() => showVariant(order.finalVariant)}>+</button>
            </div>
            <div className="bg-gray-300 w-full relative text-gray-600 px-6 py-8 text-xl font-bold font-roboto">
              <label>Subtotal</label><span className="absolute right-4">{order.price}</span>
            </div>
            <div className="px-8 py-4">
              <button className="bg-green text-white text-center text-lg font-bold w-full py-2">Add to Cart</button>
            </div>
          </div>:null}

    </div>
  );
};

export default CategoryList;
