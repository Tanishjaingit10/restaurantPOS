import React, {useState} from 'react'

const Sidebar = () => {
    const [show, setShow] = useState(false);

    const openDrop = ()=> {
        setShow(!show);
    }
    return (
        
            <div className="flex md:flex-row border-primary border-r-4">

                <div className="bg-white shadow-xl h-16 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-80">

                    <div className="md:mt-20 md:w-80 md:fixed md:left-0 md:top-0 content-center md:content-start justify-between">
                        <ul className="list-reset flex flex-row md:flex-col text-center md:text-left text-2xl">
                            <li className=" border-primary border-t-2 border-l-4 bg-primary text-white text-2xl font-roboto font-semibold pl-2">
                                <a href="#" className="block py-1 md:py-3 pl-1 align-middle  no-underline hover:text-white ">
                                <i className="fas fa-home pr-0 md:pr-3"></i><span className="pb-1 md:pb-0  block md:inline-block ">Dashboard</span>
                                </a>
                            </li>
                            <li className=" flex-1 border-primary border-l-4 border-t-2 text-2xl font-roboto font-semibold text-primary pl-2">
                                <a href="#" className="block py-1 md:py-3 pl-1 align-middle  no-underline  ">
                                    <i className="fas fa-utensils pr-0 md:pr-3"></i><span className="pb-1 md:pb-0   block md:inline-block">Orders</span>
                                </a>
                            </li>
                            <li className=" flex-1 border-primary border-l-4 border-t-4 text-2xl font-roboto font-semibold text-primary pl-2">
                                <a href="/tables" className="block py-1 md:py-3 pl-1 align-middle  no-underline  ">
                                    <i className="fas fa-table pr-0 md:pr-3 "></i><span className="pb-1 md:pb-0 block md:inline-block">Tables</span>
                                </a>
                            </li>
                            <li className=" flex-1 border-primary border-l-4 border-t-4 text-2xl font-roboto font-semibold text-primary pl-2">
                                <a href="#" className="block py-1 md:py-3 pl-1 align-middle  no-underline  ">
                                    <i className="fas fa-concierge-bell pr-0 md:pr-3 "></i><span className="pb-1 md:pb-0 block md:inline-block">Kitchen</span>
                                </a>
                            </li>
                            <li className=" flex-1 border-primary border-l-4 border-t-4 text-2xl font-roboto font-semibold text-primary">
                                <a href="#" className="block py-1 md:py-3 pl-1 align-middle  no-underline ml-2 "  onClick={openDrop}>
                                    <i className="fas fa-bookmark pr-0 md:pr-3 "></i><span className="pb-1 md:pb-0 block md:inline-block">Records</span><i className="fas fa-chevron-down ml-32"></i>
                                </a>
                               {/* <div className={show?"absolute overflow-auto w-80":"hidden"}>
                                <a href="#" class=" bg-primary text-white  block md:py-3 pl-1 align-middle  no-underline"><i class="fas fa-tag"></i> Sale</a>
                                <a href="#" class=" bg-primary text-white  block md:py-3 pl-1 align-middle  no-underline"><i class="fas fa-user-friends"></i>Customers</a>
    </div>*/}
                            </li>
                            <li className= {show?" flex-1 border-primary bg-primary border-l-4 border-t-4 text-2xl font-roboto font-semibold text-white pl-2" : "hidden"}>
                                <a href="#" className="block py-1 md:py-3 pl-0 md:pl-1 align-middle  no-underline  ">
                                    <i className="fas fa-tag pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 block md:inline-block">Sale</span>
                                </a>
                            </li>
                            <li className= {show?" flex-1 border-primary bg-primary border-l-4 border-t-4 text-2xl font-roboto font-semibold text-white pl-2" : "hidden"}>
                                <a href="#" className="block py-1 md:py-3 pl-0 md:pl-1 align-middle  no-underline  ">
                                    <i className="fas fa-user-friends pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 block md:inline-block">Customer</span>
                                </a>
                            </li>
                            <li className=" flex-1 border-primary border-l-4 border-t-4 text-2xl font-roboto font-semibold text-primary pl-2">
                                <a href="/menu" className="block py-1 md:py-3 pl-0 md:pl-1 align-middle  no-underline ">
                                    <i className="fa fa-wallet pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 block md:inline-block">Menu</span>
                                </a>
                            </li>
                            <li className=" flex-1 border-primary border-l-4 border-t-4 text-2xl font-roboto font-semibold text-primary pl-2">
                                <a href="#" className="block py-1 md:py-3 pl-1 align-middle no-underline  ">
                                    <i className="fas fa-address-card pr-0 md:pr-3 "></i><span className="pb-1 md:pb-0 block md:inline-block">Attendance</span>
                                </a>
                            </li>
                            <li className=" flex-1 border-primary border-l-4 border-t-4 border-b-4 text-2xl font-roboto font-semibold text-primary pl-2">
                                <a href="/login" className="block py-1 md:py-3 pl-1 align-middle no-underline  ">
                                    <i className="fas fa-sign-out-alt pr-0 md:pr-3 "></i><span className="pb-1 md:pb-0 block md:inline-block">Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>


                </div>
            </div>
        
    )
}

export default Sidebar
