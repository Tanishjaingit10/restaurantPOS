import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../actions/CategoryActions";
import { OrderContext } from "../../context/Cart";
import { PaymentContext } from "../../context/Payment";


const CategoryList = () => {
  const categories = useSelector((state) => state.allCategories.categories);
  const [cart, setCart] = useContext(OrderContext);
  const [payment, setPayment] = useContext(PaymentContext);
  const [displayItems, setDisplayItems] = useState();
  const [item, showItem] = useState({ foodItem: "", image: "", orderedVariant: [], price: 0,subtotal:0 });
  const [order, showOrder] = useState([])
  const [varList, setVarList]=useState();
  const [Variant, setVariant] = useState([]);
  const [finalVar, setFinalVariant] = useState([]);
  const [addList, setAddList] = useState();
  const [final, setFinal] = useState([]);
  const [list, showList] = useState(false);
  const [show, setShow] = useState(false)
  const [open, setOpen]=useState(false)
  const showItems = async (e) => {

    await fetch('/app/items').then((res) => res.json())
      .then((json) => {
       
        setDisplayItems(json.map((option) => {
          if (option.category === e.target.value) {
            return (<div className="bg-white m-2 relative rounded-xl shadow-2xl w-40 cursor-pointer" onClick={() => setOrder(option.foodItem)}><img src={option.image} className="w-40 object-fill" alt="" />
              <span className="absolute right-0 top-0 text-center w-20 py-2 bg-white">{option.price}</span>
              <div className="text-center bg-white py-2">{option.foodItem}</div></div>);
          }
          return null
        }))

      })

  }

  useEffect(() => {
    if(Object.keys(Variant).length)
      setFinalVariant(oldArray => {return [...oldArray, Variant]})
  }, [Variant])

  const handleVariant = async (e) => {
    setVariant(e);
    showList(false)
    item.subtotal = item.subtotal + e.price;
  }
  const showVariant = async (e) => {
    showList(true);
    setAddList(
      e.map((obj) => {
       
        return (<li><button className="bg-primary px-10 py-2 w-full relative" onClick={() => handleVariant(obj)} name="category" value={obj}>{obj.variant} / $ {obj.price}<span className="absolute right-4">x</span></button></li>)
      }))
  }
  const removeVar = (e) => {
    setFinalVariant(finalVar.filter(i => i !== e))
    item.subtotal = item.subtotal-e.price;
    console.log(item.subtotal)
}

  const addCart = async (e) => {
    
    // showItem({...item, ['orderedVariant']:finalVar})
    setOpen(false)
    setFinalVariant([])
    setCart(prev =>[...prev,item])
    setPayment((prev) => ({
      ...prev,
      subTotal: payment.subTotal + item.subtotal,
    }));
    showOrder(oldArray => [...oldArray, item])
    // console.log(order)
   
  }
  const setOrder = async (e) => {
    setOpen(true)
    if (e) {
      await fetch(`/app/item/${e}`).then((res) => res.json())
        .then((json) => {
          setVarList(json.finalVariant)
          showItem({
            "foodItem": json.foodItem,
            "image": json.image,
            "orderedVariant": [],
            "price": json.price,
            "subtotal":json.price
          })
        }
      )
    }
  }

  const renderList = categories.map((cat) => {
    const { category, color } = cat;
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
  },[]);
  useEffect(() => {
    showItem({...item, ['orderedVariant']:finalVar})
    setFinal(finalVar.map((obj) => {
      return (<button className="bg-primary px-10 py-2 w-full mb-2 relative">{obj.variant} / $ {obj.price}<span onClick={() => { removeVar(obj) }} className="absolute right-4">x</span></button>)
    }))
  }, [finalVar]);
 
  

  return (

    <div>

      <div className="flex flex-wrap justify-evenly">
        {renderList}
      </div>
      <div>
        {displayItems}
      </div>

      {open? <div className="absolute top-16 right-0 bg-white border-l-2 border-primary w-2/5 h-full">
        <div className="w-72 mt-6 bg-gray-500 mx-auto h-36"><img alt="" src={item.image} /></div>
        <h1 className="text-gray-500 text-left text-xl my-4 font-semibold font-roboto ml-4">Select Quantity and Variant</h1>

        <div className="flex flex-col px-8 space-y-4 text-xl font-roboto py-4">
          {final ? <div className="text-white w-full">{final}</div> : null}


          {list ? <ul className="bg-primary text-center py-2 text-white cursor-pointer" onClick={() => { setShow(!show) }}>{'Select Variant'}
            {show ? <>{addList}</> : null}
          </ul> : null}
          <button className="bg-green text-center text-white py-2 font-bold" onClick={() => showVariant(varList)}>+</button>
        </div>
        <div className="bg-gray-300 w-full relative text-gray-600 px-6 py-8 text-xl font-bold font-roboto">
          <label>Subtotal</label><span className="absolute right-4">{item.subtotal}</span>
        </div>
        <div className="px-8 py-4">
          <button className="bg-green text-white text-center text-lg font-bold w-full py-2" onClick={addCart}>Add to Cart</button>
        </div>
      </div> : null}

    </div>
  );
};

export default CategoryList;
