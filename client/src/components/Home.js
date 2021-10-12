import React from 'react'
import Content from './Content'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Home = () => {
    return (
        <div className="flex overflow-hidden h-screen">
             <Sidebar />
             <Navbar />
           
          <Content />
           {/* <body class="bg-gray-100 flex">

                <aside class="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
                    
                    <nav class="text-white text-base font-semibold pt-8">
                        <a href="" class="flex items-center active-nav-link text-white py-4 pl-6 nav-item">
                            <i class="fas fa-tachometer-alt mr-3"></i>
                            Dashboard
                        </a>
                        <a href="blank.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                            <i class="fas fa-sticky-note mr-3"></i>
                            Blank Page
                        </a>
                        <a href="tables.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                            <i class="fas fa-table mr-3"></i>
                            Tables
                        </a>
                        <a href="forms.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                            <i class="fas fa-align-left mr-3"></i>
                            Forms
                        </a>
                        <a href="tabs.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                            <i class="fas fa-tablet-alt mr-3"></i>
                            Tabbed Content
                        </a>
                        <a href="calendar.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                            <i class="fas fa-calendar mr-3"></i>
                            Calendar
                        </a>
                    </nav>
                    <a href="#" class="absolute w-full upgrade-btn bottom-0 active-nav-link text-white flex items-center justify-center py-4">
                        <i class="fas fa-arrow-circle-up mr-3"></i>
                        Upgrade to Pro!
                    </a>
                </aside>

                <div class="w-full flex flex-col h-screen overflow-y-hidden">

                    <header class="w-full items-center bg-white py-8 px-6 hidden sm:flex">
                        <div class="w-1/2"></div>
                        
                    </header>


                    <header x-data="{ isOpen: false }" class="w-full bg-sidebar py-5 px-6 sm:hidden">
                        <div class="flex items-center justify-between">
                            <a href="index.html" class="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</a>
                            <button onClick="isOpen = !isOpen" class="text-white text-3xl focus:outline-none">
                                <i x-show="!isOpen" class="fas fa-bars"></i>
                                <i x-show="isOpen" class="fas fa-times"></i>
                            </button>
                        </div>


                        <nav class="isOpen ? 'flex': 'hidden'" class="flex flex-col pt-4">
                            <a href="index.html" class="flex items-center active-nav-link text-white py-2 pl-4 nav-item">
                                <i class="fas fa-tachometer-alt mr-3"></i>
                                Dashboard
                            </a>
                            <a href="blank.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                                <i class="fas fa-sticky-note mr-3"></i>
                                Blank Page
                            </a>
                            <a href="tables.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                                <i class="fas fa-table mr-3"></i>
                                Tables
                            </a>
                            <a href="forms.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                                <i class="fas fa-align-left mr-3"></i>
                                Forms
                            </a>
                            <a href="tabs.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                                <i class="fas fa-tablet-alt mr-3"></i>
                                Tabbed Content
                            </a>
                            <a href="calendar.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                                <i class="fas fa-calendar mr-3"></i>
                                Calendar
                            </a>
                            <a href="#" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                                <i class="fas fa-cogs mr-3"></i>
                                Support
                            </a>
                            <a href="#" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                                <i class="fas fa-user mr-3"></i>
                                My Account
                            </a>
                            <a href="#" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                                <i class="fas fa-sign-out-alt mr-3"></i>
                                Sign Out
                            </a>
                            <button class="w-full bg-white cta-btn font-semibold py-2 mt-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                                <i class="fas fa-arrow-circle-up mr-3"></i> Upgrade to Pro!
                            </button>
                        </nav>
                        <button class="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                            <i class="fas fa-plus mr-3"></i> New Report
                        </button>
                    </header >

                    <div class="w-full overflow-x-hidden border-t flex flex-col">
                        <main class="w-full flex-grow p-6">
                            <h1 class="text-3xl text-black pb-6">Dashboard</h1>

                            <div class="flex flex-wrap mt-6">
                                <div class="w-full lg:w-1/2 pr-0 lg:pr-2">
                                    <p class="text-xl pb-3 flex items-center">
                                        <i class="fas fa-plus mr-3"></i> Monthly Reports
                                    </p>
                                    <div class="p-6 bg-white">
                                        <canvas id="chartOne" width="400" height="200"></canvas>
                                    </div>
                                </div>
                                <div class="w-full lg:w-1/2 pl-0 lg:pl-2 mt-12 lg:mt-0">
                                    <p class="text-xl pb-3 flex items-center">
                                        <i class="fas fa-check mr-3"></i> Resolved Reports
                                    </p>
                                    <div class="p-6 bg-white">
                                        <canvas id="chartTwo" width="400" height="200"></canvas>
                                    </div>
                                </div>
                            </div>

                           
                               
                           
                        </main>

                      
                    </div>

                </div >
    </body >*/}
    </div>
    )
}

export default Home
