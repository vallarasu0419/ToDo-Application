import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./Action";

export const store = configureStore({
  reducer: {
    data: DataSlice,
  },
});
