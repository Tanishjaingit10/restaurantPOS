import React from 'react'
import './App.css';
import { OrderProvider } from './context/Cart';
import Routes from './Routes';
import { PaymentProvider } from './context/Payment';
import { CustomerProvider } from './context/Customer';
import { CategoryProvider } from './context/Category';

function App() {
  return (
    <div>
      <CategoryProvider>
      <CustomerProvider>
      <OrderProvider>
        <PaymentProvider>
        <Routes />
        </PaymentProvider>
      </OrderProvider>
      </CustomerProvider>
      </CategoryProvider>
    </div>
  )
}

export default App

