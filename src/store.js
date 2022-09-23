import { configureStore } from "@reduxjs/toolkit";
import patientSlice from "./slices/patient.slice";
import doctorSlice from "./slices/doctor.slice";
import userSlice from "./slices/user.slice";

let store = configureStore({
  reducer: {
    userSlice: userSlice,
    patientSlice: patientSlice,
    doctorSlice: doctorSlice,
  }
})

export default store