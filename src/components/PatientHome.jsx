import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateAuthenticated } from '../slices/user.slice'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Navigate, useNavigate } from 'react-router-dom';

export default function PatientHome() {

  let dispatch = useDispatch()
  let goto = useNavigate()
  let { authenticated, user } = useSelector(state => state.userSlice)

  let signoutFunc = () => {
    localStorage.removeItem('accessToken-iCare')
    localStorage.removeItem('refreshToken-iCare')
    localStorage.removeItem('userInfo-iCare')
    dispatch(updateAuthenticated(false))
    goto('/')
  }


  return !authenticated ? <Navigate to={`/`} replace={true} /> :
    <div className="PatientHome">

      <div className="header">
        <img src="/images/logo.png" alt="" className="logo" />
        <div className="name-logout">
          <p className="name">Hi, {user.name}</p>
          <Button className='logout' onClick={() => signoutFunc()} variant="contained">Sign Out</Button>
        </div>
      </div>


    </div>
}
