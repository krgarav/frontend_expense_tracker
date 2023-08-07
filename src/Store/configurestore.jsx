import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expense-reducer";

const Store = configureStore({
  reducer: { expense: expenseReducer },
});

export default Store;
