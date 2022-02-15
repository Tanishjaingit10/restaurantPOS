import React from "react";
import "./App.css";
import { OrderProvider } from "./context/Cart";
import Router from "./Routes";
import { UserProvider } from "./context/User";
import { PaymentProvider } from "./context/Payment";
import { CustomerProvider } from "./context/Customer";
import { CategoryProvider } from "./context/Category";
import { CustomersProvider } from "./context/Customers";
import { OrdersProvider } from "./context/Orders";
import { ThemeProvider } from "./context/Theme";
import { NotificationProvider } from "./context/Notification";

function App() {
    return (
        <div>
            <UserProvider>
                <CategoryProvider>
                    <CustomersProvider>
                        <OrdersProvider>
                            <CustomerProvider>
                                <OrderProvider>
                                    <PaymentProvider>
                                        <ThemeProvider>
                                            <NotificationProvider>
                                                <Router />
                                            </NotificationProvider>
                                        </ThemeProvider>
                                    </PaymentProvider>
                                </OrderProvider>
                            </CustomerProvider>
                        </OrdersProvider>
                    </CustomersProvider>
                </CategoryProvider>
            </UserProvider>
        </div>
    );
}

export default App;
