import { combineReducers } from "redux";
import { CategoryReducer } from "./CategoryReducer";

const reducers = combineReducers({
    allCategories : CategoryReducer,
});

export default reducers;