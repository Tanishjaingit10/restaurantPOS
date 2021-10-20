import React from 'react'
import { useParams } from 'react-router'


const ItemDisplay = () => {
    const cat = useParams();
    console.log(1)
    console.log(cat)
    const showItems= async (e)=>{
        console.log(cat)

        const result = await fetch('/app/items').then((res) => res.json())
        .then((json) => {
            console.log(json)
            json.map((option) => {
                if(option.category===cat)
                {
                    return(<div className="bg-gray-200 w-1/3 border-primary border-2 img-holder"><img src={option.image} className="image" alt="" id="img" className="img" /></div>)
                }
            })

        })
    
    }
    return (
        <div>
            {showItems}
        </div>
    )
}

export default ItemDisplay
