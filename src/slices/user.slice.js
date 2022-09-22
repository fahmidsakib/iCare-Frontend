import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from '../apiConfig'

const signup = createAsyncThunk('user-slice/signup', async (data) => {
  const response = await axiosClient.post('/auth/signup', data)
  return response.data
})

const signin = createAsyncThunk('user-slice/signin', async (data) => {
  const response = await axiosClient.post('/auth/signin', data)
  return response.data
})


let userSlice = createSlice({
  name: 'user-slice',
  initialState: {
    toggleSignup: false,
    userError: null,
    userAlert: null,
    userLoading: null,
    authenticated: localStorage.getItem('userInfo-iCare') !== null ? true : false,
    user: localStorage.getItem('userInfo-iCare') !== null ? JSON.parse(localStorage.getItem('userInfo-iCare')) : {},
    accessToken: localStorage.getItem('accessToken-iCare') !== null ? localStorage.getItem('accessToken-iCare') : '',
    refreshToken: localStorage.getItem('refreshToken-iCare') !== null ? localStorage.getItem('refreshToken-iCare') : '',
  },
  reducers: {
    updateToggleSignup: (state, action) => {
      state.toggleSignup = action.payload
    },
    updateErrorAlert: (state, action) => {
      state.userError = null
      state.userAlert = null
    },
    updateAuthenticated: (state, action) => {
      state.authenticated = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(signup.pending, (state, action) => {
        state.userError = null
        state.userLoading = true
      })
      .addCase(signup.rejected, (state, action) => {
        state.userError = action.error.message
        state.userLoading = false
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.userError = null
        state.userLoading = false
        state.toggleSignup = false
        state.userAlert = action.payload.alert
      })

      .addCase(signin.pending, (state, action) => {
        state.userError = null
        state.userLoading = true
        state.authenticated = false
      })
      .addCase(signin.rejected, (state, action) => {
        state.userLoading = false
        state.userError = action.error.message
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.userError = null
        state.userLoading = false
        state.authenticated = true
        state.user = action.payload.data.payload
        state.accessToken = action.payload.data.accessToken
        state.refreshToken = action.payload.data.refreshToken
        localStorage.setItem('accessToken-iCare', action.payload.data.accessToken)
        localStorage.setItem('refreshToken-iCare', action.payload.data.refreshToken)
        localStorage.setItem('userInfo-iCare', JSON.stringify(action.payload.data.payload))
      })
  }
})

export default userSlice.reducer
export const { updateToggleSignup, updateErrorAlert, updateAuthenticated } = userSlice.actions
export { signup, signin }
