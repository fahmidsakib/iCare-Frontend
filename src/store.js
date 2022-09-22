import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";

let store = configureStore({
  reducer: {
    userSlice: userSlice,
  }
})

export default store