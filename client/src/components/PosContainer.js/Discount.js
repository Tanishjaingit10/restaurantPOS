import React, {useState} from 'react'

const Discount = () => {
  const [cal,setCal]=useState(0)
  const calculate = async (e) => {
    if(e===11)
      setCal(100*cal)
    else if(e===12)
      setCal(Math.floor(cal/10))
    else
    setCal(10*cal+e)
  }
    return (
        <div className="h-screen justify-items-conter">
      <nav className="bg-gray-400 py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
        <div className="flex flex-wrap items-center">
          <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4">
            <a href="/pos">
              <i class="fas fa-arrow-left mr-4"></i>Back
            </a>
          </div>
          <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 ml-8 font-semibold">
            Add Discount
          </div>
        </div>
      </nav>
      <div className="flex flex-col p-8">
      
        <div className="w-1/3 mx-auto flex flex-col shadow-2xl mt-10">
            <div className="bg-white px-2 font-roboto py-4"><div className=" text-right text-4xl font-bold">{cal}%<i onClick = {() => { setCal(0) }} className="far fa-times-circle ml-4 text-2xl cursor-pointer"></i></div></div>
            <div className="bg-gray-300 justify-evenly flex flex-row text-2xl py-4 text-primary font-bold border-2"><button className="text-center w-full" onClick = {() => { setCal(10) }} >10%</button><button className="text-center w-full" onClick = {() => { setCal(15) }}>15%</button><button className="text-center w-full" onClick = {() => { setCal(20) }}>20%</button></div>
            <div className="grid grid-cols-3 bg-white font-roboto font-semibold text-2xl">
            <button onClick = {() => { calculate(1) }} className="text-center border-2 py-2">1</button>
                <button onClick = {() => { calculate(2) }} className="text-center border-2 py-2">2</button>
                <button onClick = {() => { calculate(3) }} className="text-center border-2 py-2">3</button>
                <button onClick = {() => { calculate(4) }} className="text-center border-2 py-2">4</button>
                <button onClick = {() => { calculate(5) }} className="text-center border-2 py-2">5</button>
                <button onClick = {() => { calculate(6) }} className="text-center border-2 py-2">6</button>
                <button onClick = {() => { calculate(7) }} className="text-center border-2 py-2">7</button>
                <button onClick = {() => { calculate(8) }} className="text-center border-2 py-2">8</button>
                <button onClick = {() => { calculate(9) }} className="text-center border-2 py-2">9</button>
                <button onClick = {() => { calculate(0) }} className="text-center border-2 py-2">0</button>
                <button onClick = {() => { calculate(11) }} className="text-center border-2 py-2">00</button>
                <div className="text-center border-2 py-2"><i onClick= {() => { calculate(12) }} className="fas fa-backspace cursor-pointer"></i></div>
            </div>
        </div>
        <div className="w-96 bg-green mt-10 mx-auto py-4 text-white text-center text-2xl font-roboto font-bold">Proceed</div>
      </div>
    </div>
    )
}

export default Discount
