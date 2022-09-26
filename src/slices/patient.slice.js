import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from '../apiConfig'


const savePatientInfo = createAsyncThunk('patient-slice/savePatientInfo', async (data) => {
  const response = await axiosClient.post('/patient/save-info', data)
  return response.data
})

const getDoctorsInfo = createAsyncThunk('patient-slice/getDoctorsInfo', async () => {
  const response = await axiosClient.get('/patient/get-doctors-info',)
  return response.data
})

const getConsultations = createAsyncThunk('patient-slice/getConsultations', async () => {
  const response = await axiosClient.get(`/patient/get-consultations`)
  return response.data
})

const getPastConsultations = createAsyncThunk('patient-slice/getPastConsultations', async () => {
  const response = await axiosClient.get(`/patient/get-past-consultations`)
  return response.data
})

const setRatingAndReview = createAsyncThunk('patient-slice/setRatingAndReview', async (data) => {
  const response = await axiosClient.post(`/patient/give-rating`, data)
  return response.data
})

const checkInfo = createAsyncThunk('patient-slice/checkInfo', async () => {
  const response = await axiosClient.get(`/patient/check-info`)
  return response.data
})

const checkAvailableSlot = createAsyncThunk('patient-slice/checkAvailableSlot', async (obj) => { 
  const response = await axiosClient.get(`/patient/check-available-slot/${obj.doctorId}/${obj.date}`)
  return response.data
})

const bookConsultation = createAsyncThunk('patient-slice/bookConsultation', async (data) => {
  const response = await axiosClient.post(`/consultation/book-consultation`, data)
  return response.data
})


let patientSlice = createSlice({
  name: 'patient-slice',
  initialState: {
    pError: null,
    pAlert: null,
    pLoading: null,
    patientInfo: localStorage.getItem('patientInfo-iCare') !== null ? JSON.parse(localStorage.getItem('patientInfo-iCare')) : null,
    takePatientInfo: localStorage.getItem('patientInfo-iCare') !== null ? false : true,
    allDoctors: [],
    todaysConsultations: [],
    upcomingConsultations: [],
    pastConsultations: [],
    showDoctors: [],
    availableSlot: [],
  },
  reducers: {
    updateShowDoctor: (state, action) => {
      let arr = []
      state.allDoctors.forEach(doc => {
        if (JSON.stringify(doc).toLowerCase().includes(action.payload.toLowerCase())) arr.push(doc)
      })
      state.showDoctors = arr
    },
    applyFilter: (state, action) => {
      if (action.payload === 'ratinghl') {
        state.showDoctors.sort((a, b) => a.ratingAndReview[0] - b.ratingAndReview[0])
      }
      else if (action.payload === 'feelh') {
        state.showDoctors.sort((a, b) => b.cost - a.cost)
      }
      else if (action.payload === 'feehl') {
        state.showDoctors.sort((a, b) => a.cost - b.cost)
      }
    },
    updateAvailableSlot: (state, action) => {
      state.availableSlot = []
    },
    updatepErrorpAlert: (state, action) => {
      state.pAlert = null
      state.pError = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(savePatientInfo.pending, (state, action) => {
        state.pError = null
        state.pLoading = true
      })
      .addCase(savePatientInfo.rejected, (state, action) => {
        state.pError = action.error.message
        state.pLoading = false
      })
      .addCase(savePatientInfo.fulfilled, (state, action) => {
        state.pError = null
        state.pLoading = false
        state.pAlert = action.payload.data.alert
        state.patientInfo = action.payload.data.payload
        state.takePatientInfo = false
        localStorage.setItem('patientInfo-iCare', JSON.stringify(action.payload.data.payload))
      })

      .addCase(getDoctorsInfo.pending, (state, action) => {
        state.pError = null
        state.pLoading = true
      })
      .addCase(getDoctorsInfo.rejected, (state, action) => {
        state.pError = action.error.message
        state.pLoading = false
      })
      .addCase(getDoctorsInfo.fulfilled, (state, action) => {
        state.pError = null
        state.pLoading = false
        state.allDoctors = action.payload.data
        state.showDoctors = action.payload.data
      })

      .addCase(getConsultations.pending, (state, action) => {
        state.pError = null
        state.pLoading = true
      })
      .addCase(getConsultations.rejected, (state, action) => {
        state.pError = action.error.message
        state.pLoading = false
      })
      .addCase(getConsultations.fulfilled, (state, action) => {
        state.pError = null
        state.pLoading = false
        state.todaysConsultations = action.payload.data.todaysConsultations
        state.upcomingConsultations = action.payload.data.upcomingConsultations
      })

      .addCase(getPastConsultations.pending, (state, action) => {
        state.pError = null
        state.pLoading = true
      })
      .addCase(getPastConsultations.rejected, (state, action) => {
        state.pError = action.error.message
        state.pLoading = false
      })
      .addCase(getPastConsultations.fulfilled, (state, action) => {
        state.pError = null
        state.pLoading = false
        state.pastConsultations = action.payload.data
      })

      .addCase(setRatingAndReview.pending, (state, action) => {
        state.pError = null
        state.pLoading = true
      })
      .addCase(setRatingAndReview.rejected, (state, action) => {
        state.pError = action.error.message
        state.pLoading = false
      })
      .addCase(setRatingAndReview.fulfilled, (state, action) => {
        state.pError = null
        state.pLoading = false
        state.pAlert = action.payload.alert
      })

      .addCase(checkInfo.pending, (state, action) => {
        state.pError = null
        state.pLoading = true
      })
      .addCase(checkInfo.rejected, (state, action) => {
        state.pError = action.error.message
        state.pLoading = false
      })
      .addCase(checkInfo.fulfilled, (state, action) => {
        state.pError = null
        state.pLoading = false
        if (action.payload.data === undefined) {
          state.takePatientInfo = true
          state.patientInfo = undefined
        }
        else {
          state.patientInfo = action.payload.data
          state.takePatientInfo = false
          localStorage.setItem('patientInfo-iCare', JSON.stringify(state.patientInfo))
        }
      })

      .addCase(checkAvailableSlot.pending, (state, action) => {
        state.pError = null
        state.pLoading = true
      })
      .addCase(checkAvailableSlot.rejected, (state, action) => {
        state.pError = action.error.message
        state.pLoading = false
      })
      .addCase(checkAvailableSlot.fulfilled, (state, action) => {
        state.pError = null
        state.pLoading = false
        state.availableSlot = action.payload.data
      })
    
      .addCase(bookConsultation.pending, (state, action) => {
        state.pError = null
        state.pLoading = true
      })
      .addCase(bookConsultation.rejected, (state, action) => {
        state.pError = action.error.message
        state.pLoading = false
      })
      .addCase(bookConsultation.fulfilled, (state, action) => {
        state.pError = null
        state.pLoading = false
        state.pAlert = action.payload.alert
      })
  }
})


export default patientSlice.reducer
export const { updateShowDoctor, applyFilter, updateAvailableSlot, updatepErrorpAlert } = patientSlice.actions
export { bookConsultation, checkAvailableSlot, savePatientInfo, getDoctorsInfo, getConsultations, getPastConsultations, setRatingAndReview, checkInfo }