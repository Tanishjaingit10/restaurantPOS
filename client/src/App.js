import React from "react";
import "./App.css";
import { OrderProvider } from "./context/Cart";
import Router from "./Routes";
import { UserProvider } from "./context/User";
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
                                    <ThemeProvider>
                                        <NotificationProvider>
                                            <Router />
                                        </NotificationProvider>
                                    </ThemeProvider>
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
