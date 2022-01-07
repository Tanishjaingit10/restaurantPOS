import React from "react";
import "./App.css";
import { OrderProvider } from "./context/Cart";
import Routes from "./Routes";
import { PaymentProvider } from "./context/Payment";
import { CustomerProvider } from "./context/Customer";
import { CategoryProvider } from "./context/Category";
import { CustomersProvider } from "./context/Customers";
import { OrdersProvider } from "./context/Orders";
import { ThemeProvider } from "./context/Theme";

function App() {
  return (
    <div>
      <CategoryProvider>
        <CustomersProvider>
          <OrdersProvider>
            <CustomerProvider>
              <OrderProvider>
                <PaymentProvider>
                  <ThemeProvider>
                    <Routes />
                  </ThemeProvider>
                </PaymentProvider>
              </OrderProvider>
            </CustomerProvider>
          </OrdersProvider>
        </CustomersProvider>
      </CategoryProvider>
    </div>
  );
}

export default App;
