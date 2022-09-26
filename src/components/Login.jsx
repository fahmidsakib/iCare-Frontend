import Snackbar from '@mui/material/Snackbar';
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import SignIn from './Signin'
import SignUp from './Signup'
import { updateErrorAlert } from '../slices/user.slice'
import ResetPassword from './ResetPassword';

export default function Login() {

    let dispatch = useDispatch()
    let { resetPassword, toggleSignup, authenticated, userError, userAlert, user } = useSelector(state => state.userSlice)

    return authenticated ?
        user.userType === 'patient' ?
            <Navigate to="/home/p" replace={true} /> :
            <Navigate to="/home/d" replace={true} />
        :
        <div className="Login">
            {resetPassword ? <ResetPassword /> :
                (toggleSignup ? <SignUp /> : <SignIn />)}
            <Snackbar autoHideDuration={3000} open={userError !== null} onClose={() => dispatch(updateErrorAlert())} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} message={userError} />
            <Snackbar autoHideDuration={3000} open={userAlert !== null} onClose={() => dispatch(updateErrorAlert())} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} message={userAlert} />
        </div>

}
