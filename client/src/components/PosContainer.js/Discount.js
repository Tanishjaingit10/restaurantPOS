import React from 'react'

const Discount = () => {
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
            <div className="bg-white relative px-2 font-roboto py-4"><div className="absolute top-2 right-2 text-4xl font-bold">$0.00<i className="far fa-times-circle ml-2 text-2xl"></i></div></div>
            <div className="bg-gray-300 justify-evenly flex flex-row text-3xl py-2 text-primary font-semibold"><div className="text-center">Exact</div><div className="text-center">$10.00</div><div className="text-center">$10.00</div></div>
            <div className="grid grid-cols-3 bg-white font-roboto font-semibold text-2xl">
                <div className="text-center border-2 py-2">1</div>
                <div className="text-center border-2 py-2">2</div>
                <div className="text-center border-2 py-2">3</div>
                <div className="text-center border-2 py-2">4</div>
                <div className="text-center border-2 py-2">5</div>
                <div className="text-center border-2 py-2">6</div>
                <div className="text-center border-2 py-2">7</div>
                <div className="text-center border-2 py-2">8</div>
                <div className="text-center border-2 py-2">9</div>
                <div className="text-center border-2 py-2">0</div>
                <div className="text-center border-2 py-2">00</div>
                <div className="text-center border-2 py-2"><i class="fas fa-backspace"></i></div>
            </div>
        </div>
        <div className="w-96 bg-green mt-10 mx-auto py-4 text-white text-center text-2xl font-roboto font-bold">Proceed</div>
      </div>
    </div>
    )
}

export default Discount
