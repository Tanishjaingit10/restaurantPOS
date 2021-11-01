import React, {useState, useContext} from "react";
import { PaymentContext } from "../../context/Payment";

const Cash = () => {
  const [cal,setCal]=useState(0);
  const [payment, setPayment] = useContext(PaymentContext)
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
            Pay By Cash
          </div>
        </div>
      </nav>
      <div className="flex flex-col p-8">
        <div className="flex flex-col p-6 w-96 mx-auto font-roboto">
          <div className="text-center font-semibold">Amount Due</div>
          <div className="text-center mt-2 text-3xl text-primary">${payment.total}</div>
        </div>
        <div className="w-1/3 mx-auto flex flex-col shadow-2xl">
            <div className="bg-white relative py-4 px-2 font-roboto"><p>Amount tendered</p><span className="absolute top-2 right-2 text-4xl font-bold">${cal}<i onClick = {() => { setCal(0) }} className="far fa-times-circle ml-2 text-2xl cursor-pointer"></i></span></div>
            <div className="bg-gray-300 justify-evenly flex flex-row text-3xl py-2 text-primary font-semibold"><div className="text-center">Exact</div><button onClick = {() => { setCal(10) }} className="text-center">$10.00</button><button onClick = {() => { setCal(20) }} className="text-center">$20.00</button></div>
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
  );
};

export default Cash;
