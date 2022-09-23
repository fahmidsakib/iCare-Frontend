import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from '../apiConfig'


const saveDoctorInfo = createAsyncThunk('doctor-slice/saveDoctorInfo', async (data) => {
  const response = await axiosClient.post('/doctor/save-info', data)
  return response.data
})

const getPatientInfo = createAsyncThunk('doctor-slice/getPatientInfo', async (patientId) => { 
  const response = await axiosClient.get(`/doctor/get-patient-info/${patientId}`)
  return response.data
})

const getConsultations = createAsyncThunk('doctor-slice/getConsultations', async () => {
  const response = await axiosClient.get(`/doctor/get-consultations`)
  return response.data
})

const getRevenue = createAsyncThunk('doctor-slice/getRevenue', async (start_date, end_date = '') => {
  if (end_date === '') {
    const response = await axiosClient.get(`/doctor/revenue?start_date=${start_date}`)
    return response.data
  }
  else {
    const response = await axiosClient.get(`/doctor/revenue?start_date=${start_date}&end_date=${end_date}`)
    return response.data
  }
})

const checkInfo = createAsyncThunk('doctor-slice/checkInfo', async () => {
  const response = await axiosClient.get(`/doctor/check-info`)
  return response.data
})


let doctorSlice = createSlice({
  name: 'doctor-slice',
  initialState: {
    dError: null,
    dAlert: null,
    dLoading: null,
    doctorInfo: localStorage.getItem('doctorInfo-iCare') !== null ? JSON.parse(localStorage.getItem('doctorInfo-iCare')) : null,
    takeDoctorInfo: localStorage.getItem('doctorInfo-iCare') !== null ? false : true,
    patientInfo: null,
    todaysConsultations: null,
    upcomingConsultations: null,
    selectedConsultations: null,
    revenue: 0,
  },
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(saveDoctorInfo.pending, (state, action) => {
        state.dError = null
        state.dLoading = true
      })
      .addCase(saveDoctorInfo.rejected, (state, action) => {
        state.dError = action.error.message
        state.dLoading = false
      })
      .addCase(saveDoctorInfo.fulfilled, (state, action) => {
        state.dError = null
        state.dLoading = false
        state.dAlert = action.payload.data.alert
        state.doctorInfo = action.payload.data.payload
        state.takeDoctorInfo = false
        localStorage.setItem('doctorInfo-iCare', JSON.stringify(action.payload.data.payload))
      })

      .addCase(getPatientInfo.pending, (state, action) => {
        state.dError = null
        state.dLoading = true
      })
      .addCase(getPatientInfo.rejected, (state, action) => {
        state.dError = action.error.message
        state.dLoading = false
      })
      .addCase(getPatientInfo.fulfilled, (state, action) => {
        state.dError = null
        state.dLoading = false
        state.patientInfo = action.payload.data
      })

      .addCase(getConsultations.pending, (state, action) => {
        state.dError = null
        state.dLoading = true
      })
      .addCase(getConsultations.rejected, (state, action) => {
        state.dError = action.error.message
        state.dLoading = false
      })
      .addCase(getConsultations.fulfilled, (state, action) => {
        state.dError = null
        state.dLoading = false
        state.todaysConsultations = action.payload.data.todaysConsultations
        state.upcomingConsultations = action.payload.data.upcomingConsultations
      })

      .addCase(getRevenue.pending, (state, action) => {
        state.dError = null
        state.dLoading = true
      })
      .addCase(getRevenue.rejected, (state, action) => {
        state.dError = action.error.message
        state.dLoading = false
      })
      .addCase(getRevenue.fulfilled, (state, action) => {
        state.dError = null
        state.dLoading = false
        state.selectedConsultations = action.payload.data.selectedConsultations
        state.revenue = action.payload.data.revenue
      })
    
      .addCase(checkInfo.pending, (state, action) => {
        state.dError = null
        state.dLoading = true
      })
      .addCase(checkInfo.rejected, (state, action) => {
        state.dError = action.error.message
        state.dLoading = false
      })
      .addCase(checkInfo.fulfilled, (state, action) => {
        state.dError = null
        state.dLoading = false
        if (action.payload.data === undefined) {
          state.takeDoctorInfo = true
          state.doctorInfo = undefined
        }
        else {
          state.doctorInfo = action.payload.data
          state.takeDoctorInfo = true
        }
      })
  }
})


export default doctorSlice.reducer
// export const { } = doctorSlice.actions
export { saveDoctorInfo, getPatientInfo, getRevenue, getConsultations, checkInfo }