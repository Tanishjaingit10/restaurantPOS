/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
    nonVegIconImageBase64,
    UncategorizedBgImageBase64,
    vegIconImageBase64,
} from "../../constants";
import { CategoryContext } from "../../context/Category";
import { NotificationContext } from "../../context/Notification";
import { deepClone } from "../../Utils";
import SpinLoader from "../SpinLoader";
import AuthenticateOverlayButton from "./AuthenticateOverlayButton";
import ChooseVariantOverlayButton from "./ChooseVariantOverlayButton";
import CommentsOverlayButton from "./CommentsOverlayButton";
import CustomerInfoOverlayButton from "./CustomerInfoOverlayButton";
import DiscountOverlayButton from "./DiscountOverlayButton";
import SingleSelectedItem from "./SingleSelectedItem";

export default function Pos() {
    const location = useLocation();
    const { categories, foodItems } = useContext(CategoryContext);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [orderType, setOrderType] = useState("Dine In");
    const [paymentMode, setPaymentMode] = useState("cash");
    const [seeBillDetails, setSeeBillDetails] = useState(false);
    const [addServiceTax, setAddServiceTax] = useState(false);
    const [chargeNoPayment, setChargeNoPayment] = useState(false);
    const [filteredFoodItem, setFilteredFoodItem] = useState([]);
    const [categoryFilteredItem, setCategoryFilteredItem] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [order_id, setOrder_id] = useState();
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        contact: "",
    });
    const [comments, setComments] = useState("");
    const [table, setTable] = useState();
    const notify = useContext(NotificationContext);
    const subTotal = selectedItems.reduce(
        (sum, item) =>
            sum +
            (item.price +
                item.finalVariant.reduce(
                    (sum, variant) =>
                        sum +
                        (variant.isSelected
                            ? variant.price * variant.quantity
                            : 0),
                    0
                )) *
                item.quantity,
        0
    );
    const discount = selectedItems.reduce(
        (sum, item) => sum + item.discount * item.quantity,
        0
    );
    const serviceTax = 0;
    const tip = 0;
    const total = subTotal + (addServiceTax ? serviceTax : 0) - discount + tip;

    const applyCategoryFilter = () => {
        setCategoryFilteredItem(() => {
            if (!categoryFilter) return foodItems;
            if (categoryFilter === "uncategorised")
                return foodItems.filter(
                    (e) => !categories.some((x) => e.category === x.category)
                );
            return foodItems.filter((item) => item.category === categoryFilter);
        });
    };

    const searchFoodItem = () => {
        if (!searchQuery) return setFilteredFoodItem(categoryFilteredItem);
        let result = [];
        categoryFilteredItem.forEach((item) => {
            if (item.foodItem.toLowerCase().includes(searchQuery.toLowerCase()))
                result.push(item);
        });
        setFilteredFoodItem(result);
    };

    useEffect(() => {
        if (location.state) {
            setTable(location.state);
            axios
                .get(`/app/order/${location.state}`)
                .then((res) => {
                    setCustomer(res.data.customer);
                    let temp = [];
                    res.data.order.forEach((item) => {
                        foodItems.forEach((it) => {
                            if (it.foodItem === item.foodItem){
                                let itm = {
                                    ...it,
                                    ...item,
                                    _id: it._id,
                                    key: item._id,
                                }
                                itm = deepClone(itm)
                                itm.finalVariant.forEach(va=>{
                                    itm.orderedVariant.forEach(v=>{
                                        if(va._id===v._id)
                                            va.isSelected=true
                                            va.quantity=v.quantity
                                    })
                                })
                                temp.push(itm);
                            }
                        });
                    });
                    setSelectedItems(temp);
                    setComments(res.data.comments);
                    setOrder_id(res.data.order_id);
                })
                .catch((err) => notify("error"));
        }
    }, [foodItems]);

    useEffect(() => {
        applyCategoryFilter();
    }, [categoryFilter, foodItems]);

    useEffect(() => {
        searchFoodItem();
    }, [searchQuery, categoryFilteredItem]);

    const handleSearch = (e) => {
        e.preventDefault();
        searchFoodItem();
    };

    const generateKOT = () => {
        setLoading(true);
        let dataToPost = {
            customer,
            order: selectedItems.map((item) => ({
                _id:item.key,
                foodItem: item.foodItem,
                orderedVariant: item.finalVariant.filter(
                    (variant) => variant.isSelected
                ),
                price: item.price,
                quantity: item.quantity,
                subtotal:
                    item.finalVariant.reduce(
                        (sum, variant) =>
                            sum +
                            (variant.isSelected
                                ? variant.price * variant.quantity
                                : 0),
                        0
                    ) + item.price,
                timeToCook:
                    parseInt(item.time.split(":")[0]) * 3600 +
                    parseInt(item.time.split(":")[1]) * 60 +
                    parseInt(item.time.split(":")[2]),
            })),
            payment: {
                subTotal,
                tax: serviceTax,
                discount,
                total,
                mode: paymentMode,
                orderType,
                orderStatus: "Processing",
                table,
            },
            comments,
        };
        if (order_id) dataToPost["order_id"] = order_id
        // axios
        //     .post("app/addOrder", dataToPost)
        //     .then(() => history.push("/kitchen"))
        //     .catch((err) => console.log(err.response.data))
        //     .finally(() => setLoading(false));
        axios
            .post("/app/generatekot", dataToPost)
            .then((res) => console.log(res))
            .catch((err) => console.log(err.response.data))
            .finally((res) => {
                setLoading(false);
            });
    };

    return (
        <div className="flex flex-col" style={{ height: "calc(100vh - 56px)" }}>
            {loading && <SpinLoader />}
            <div className="grid grid-cols-5 h-full">
                <div className="py-6 overflow-auto">
                    <div className="col-span-1 h-full flex flex-col items-center pr-4 pl-2 overflow-auto">
                        <button
                            onClick={() => setCategoryFilter("")}
                            style={{
                                backgroundImage: `url(${UncategorizedBgImageBase64})`,
                            }}
                            className="rounded-md text-gray-600 bg-cover bg-center mb-3 w-full"
                        >
                            <div
                                className={`${
                                    categoryFilter === ""
                                        ? "text-red border-red bg-opacity-90"
                                        : "text-gray-600 border-black bg-opacity-80"
                                } bg-white px-8 py-3 font-bold text-xl border shadow-md rounded-md`}
                            >
                                All Items
                            </div>
                        </button>
                        {categories.map((item) => (
                            <button
                                onClick={() => setCategoryFilter(item.category)}
                                key={item._id}
                                style={{
                                    backgroundImage: `url(${item?.image})`,
                                }}
                                className="rounded-md bg-center mb-3 w-full"
                            >
                                <div
                                    className={`${
                                        categoryFilter === item.category
                                            ? "text-red border-red bg-opacity-90"
                                            : "text-gray-600 border-black bg-opacity-80"
                                    } bg-white px-8 py-3 font-bold text-xl border shadow-md rounded-md`}
                                >
                                    {item.category}
                                </div>
                            </button>
                        ))}
                        {foodItems.some(
                            (e) =>
                                !categories.some(
                                    (x) => e.category === x.category
                                )
                        ) && (
                            <button
                                onClick={() =>
                                    setCategoryFilter("uncategorised")
                                }
                                style={{
                                    backgroundImage: `url(${UncategorizedBgImageBase64})`,
                                }}
                                className="rounded-md bg-cover bg-center mb-2 w-full"
                            >
                                <div
                                    className={`${
                                        categoryFilter === "uncategorised"
                                            ? "text-red border-red bg-opacity-90"
                                            : "text-gray-600 border-black bg-opacity-80"
                                    } bg-white px-8 py-3 font-bold text-xl border shadow-md rounded-md`}
                                >
                                    Uncategorized
                                </div>
                            </button>
                        )}
                    </div>
                </div>
                <div className="col-span-2 border-l border-gray-400 flex flex-col border-r h-full p-4">
                    <form
                        onSubmit={(e) => handleSearch(e)}
                        className="relative mx-5 mb-3 border border-gray-300 rounded-md"
                    >
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="text"
                            className="rounded-md p-3 w-full"
                            placeholder="Search for food item...."
                        />
                        <button
                            type="submit"
                            className="fas fa-search text-gray-300 absolute right-4 text-xl top-1/2 transform -translate-y-1/2"
                        />
                    </form>
                    {filteredFoodItem.length ? (
                        <div className="grid grid-cols-2 flex-auto auto-rows-min h-0 overflow-auto p-4">
                            {filteredFoodItem.map((item) => (
                                <div key={item._id} className="flex">
                                    <ChooseVariantOverlayButton
                                        item={item}
                                        className="text-center font-semibold flex-1 relative rounded-md bg-yellow-100 p-8 m-2 text-xl shadow-md"
                                        setSelectedItems={setSelectedItems}
                                    >
                                        <img
                                            className="absolute w-4 top-3 right-3"
                                            src={
                                                item.foodType === "veg"
                                                    ? vegIconImageBase64
                                                    : nonVegIconImageBase64
                                            }
                                            alt=""
                                        />
                                        {item.foodItem}
                                    </ChooseVariantOverlayButton>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-40 flex items-center justify-center font-semibold text-gray-400">
                            No Items Found
                        </div>
                    )}
                </div>
                <div className="col-span-2 flex flex-col h-full">
                    <div className="p-4 flex px-10">
                        <button
                            onClick={() => setOrderType("Dine In")}
                            className={`border-2 font-bold mx-3 flex-1 p-2 ${
                                orderType === "Dine In"
                                    ? "text-white bg-red"
                                    : "text-red bg-white"
                            } rounded-md border-red`}
                        >
                            Dine In
                        </button>
                        <button
                            onClick={() => setOrderType("Take Away")}
                            className={`border-2 font-bold mx-3 flex-1 p-2 ${
                                orderType === "Take Away"
                                    ? "text-white bg-red"
                                    : "text-red bg-white"
                            } rounded-md border-red`}
                        >
                            Take Away
                        </button>
                    </div>
                    <div className="flex">
                        <Link
                            to="/tables"
                            className="bg-red flex flex-col items-center justify-center text-white h-14 m-2 border-2 flex-1"
                        >
                            <div className="h-4 w-4 fas fa-th-large" />
                            <div className="text-xs">{table || "Tables"}</div>
                        </Link>
                        <CustomerInfoOverlayButton
                            customer={customer}
                            setCustomer={setCustomer}
                            currentTable={table}
                            setCurrentTable={setTable}
                            className="bg-red flex flex-col items-center justify-center text-white h-14 my-2 border-2 flex-1"
                        >
                            <div className="h-4 w-4 far fa-user" />
                            <div className="text-xs">Coustomer Information</div>
                        </CustomerInfoOverlayButton>
                        <CommentsOverlayButton
                            comments={comments}
                            setComments={setComments}
                            className="bg-red flex flex-col items-center justify-center text-white h-14 m-2 border-2 flex-1"
                        >
                            <div className="h-4 w-4 far fa-sticky-note" />
                            <div className="text-xs">Comments</div>
                        </CommentsOverlayButton>
                    </div>
                    {selectedItems.length ? (
                        <div className="flex-auto h-0 border-t-2 mx-4 overflow-y-auto">
                            {selectedItems.map((item) => (
                                <div key={item.key}>
                                <SingleSelectedItem
                                        setSelectedItems={setSelectedItems}
                                        item={item}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white h-full flex items-center justify-center">
                            <div className="flex flex-col w-1/3 mx-auto justify-items-center space-y-2">
                                <div className=" border-dashed border-2 border-gray-600 w-24 h-24 rounded-lg mx-auto"></div>
                                <p className=" font-bold text-gray-600 text-center">
                                    Order is Empty
                                </p>
                                <p className=" text-gray-600 text-center">
                                    Add Food items
                                </p>
                            </div>
                        </div>
                    )}
                    <div className="mt-auto relative flex-shrink-0">
                        <div className="absolute transform -translate-y-full w-full top-0">
                            <button
                                onClick={() => setSeeBillDetails((e) => !e)}
                                className={`fas fa-caret-${
                                    seeBillDetails ? "down" : "up"
                                } mx-auto flex items-center justify-center px-7 text-white`}
                                style={{ backgroundColor: "#c4c4c4" }}
                            />
                            <div hidden={!seeBillDetails} className="border-">
                                <div
                                    className="h-14 flex items-center px-4 justify-between"
                                    style={{ backgroundColor: "#c4c4c4" }}
                                >
                                    <div className="text-white font-semibold">
                                        Sub Total
                                    </div>
                                    <div className="text-2xl text-right font-bold">
                                        {`$${subTotal.toFixed(2)}`}
                                    </div>
                                </div>
                                <div
                                    className="h-14 flex items-center justify-between px-4"
                                    style={{ backgroundColor: "#c4c4c4" }}
                                >
                                    <div className="text-white font-semibold">
                                        Discount
                                    </div>
                                    <DiscountOverlayButton className="p-2 text-center w-32 font-semibold rounded-md bg-white">
                                        {`$${discount.toFixed(2)}`}
                                    </DiscountOverlayButton>
                                </div>
                                <div
                                    className="h-14 flex items-center justify-between px-4"
                                    style={{ backgroundColor: "#c4c4c4" }}
                                >
                                    <div className="text-white font-semibold">
                                        Service Tax
                                    </div>
                                    <button className="p-2 text-center w-32 font-semibold rounded-md bg-white">
                                        {`$${serviceTax.toFixed(2)}`}
                                    </button>
                                </div>
                                <div
                                    className="h-14 flex items-center justify-between px-4"
                                    style={{ backgroundColor: "#c4c4c4" }}
                                >
                                    <div className="text-white font-semibold">
                                        Tip
                                    </div>
                                    <button className="p-2 text-center w-32 font-semibold rounded-md bg-white">
                                        {`$${tip.toFixed(2)}`}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className="h-14 flex items-center px-4 justify-between"
                            style={{ backgroundColor: "#c4c4c4" }}
                        >
                            <div className="flex">
                                <button className="h-10 mr-4 text-white items-center flex font-semibold rounded-md px-14 bg-red">
                                    Split
                                </button>
                                <AuthenticateOverlayButton
                                    isAuthenticated={isAuthenticated}
                                    setIsAuthenticated={setIsAuthenticated}
                                    callback={() => setAddServiceTax((e) => !e)}
                                    title={"Add Service Tax"}
                                    className="px-2 text-white flex items-center"
                                >
                                    <span
                                        className={`${
                                            addServiceTax
                                                ? "fas fa-check-square"
                                                : "far fa-square"
                                        }`}
                                    />
                                    <span className="ml-2 font-semibold">
                                        Add Service Tax
                                    </span>
                                </AuthenticateOverlayButton>
                            </div>
                            <div className="text-2xl text-right font-bold">
                                {`Total: $${total.toFixed(2)}`}
                            </div>
                        </div>
                        <div className="h-14 flex items-center justify-between text-white bg-red">
                            <button
                                onClick={() => setPaymentMode("cash")}
                                className="mx-4 flex items-center"
                            >
                                <span
                                    className={`far fa-${
                                        paymentMode === "cash" ? "dot-" : ""
                                    }circle`}
                                />
                                <span className="font-semibold mx-4">Cash</span>
                            </button>
                            <button
                                onClick={() => setPaymentMode("card")}
                                className="mx-4 flex items-center"
                            >
                                <span
                                    className={`far fa-${
                                        paymentMode === "card" ? "dot-" : ""
                                    }circle`}
                                />
                                <span className="font-semibold mx-4">Card</span>
                            </button>
                            <button
                                onClick={() => setPaymentMode("payLater")}
                                className="mx-4 flex items-center"
                            >
                                <span
                                    className={`far fa-${
                                        paymentMode === "payLater" ? "dot-" : ""
                                    }circle`}
                                />
                                <span className="font-semibold mx-4">
                                    Paylater
                                </span>
                            </button>
                            <button
                                onClick={() => setPaymentMode("online")}
                                className="mx-4 flex items-center"
                            >
                                <span
                                    className={`far fa-${
                                        paymentMode === "online" ? "dot-" : ""
                                    }circle`}
                                />
                                <span className="font-semibold mx-4">
                                    Online
                                </span>
                            </button>
                        </div>
                        <div
                            className="h-14 text-white flex items-center justify-center"
                            style={{ backgroundColor: "#c4c4c4" }}
                        >
                            <AuthenticateOverlayButton
                                isAuthenticated={isAuthenticated}
                                setIsAuthenticated={setIsAuthenticated}
                                callback={() => setChargeNoPayment((e) => !e)}
                                title={"Charge No Payment"}
                                className="p-2 flex items-center"
                            >
                                <span
                                    className={`${
                                        chargeNoPayment
                                            ? "fas fa-check-square"
                                            : "far fa-square"
                                    }`}
                                />
                                <span className="mr-5 ml-3 font-semibold">
                                    Charge No Payment
                                </span>
                            </AuthenticateOverlayButton>
                            <button className="p-2 text-white font-semibold rounded-md w-1/3 mx-2 bg-green">
                                Complete Payment
                            </button>
                        </div>
                        <div className="h-14 bg-white flex items-center justify-center">
                            <button className="p-2 text-white font-semibold rounded-md w-1/4 mx-2 bg-red">
                                Save
                            </button>
                            <button className="p-2 text-white font-semibold rounded-md w-1/4 mx-2 bg-yellow-300">
                                Print Bill
                            </button>
                            <button
                                onClick={generateKOT}
                                className="p-2 text-white font-semibold rounded-md w-1/4 mx-2 bg-yellow-300"
                            >
                                Genetare KOT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
