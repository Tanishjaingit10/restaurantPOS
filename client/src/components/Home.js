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
        </div>
    )
}

export default Home
