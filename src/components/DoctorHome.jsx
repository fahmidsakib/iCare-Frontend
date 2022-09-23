import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateAuthenticated } from '../slices/user.slice'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Navigate, useNavigate } from 'react-router-dom';
import DoctorForm from './DoctorForm';
import { checkInfo } from '../slices/doctor.slice';
import Loading from './Loading';

export default function DoctorHome() {

  let dispatch = useDispatch()
  let goto = useNavigate()
  let { authenticated, user } = useSelector(state => state.userSlice)
  let { dError, dAlert, dLoading, doctorInfo, takeDoctorInfo, patientInfo, todaysConsultations, upcomingConsultations, selectedConsultations, revenue } = useSelector(state => state.doctorSlice)

  let signoutFunc = () => {
    localStorage.removeItem('accessToken-iCare')
    localStorage.removeItem('refreshToken-iCare')
    localStorage.removeItem('userInfo-iCare')
    localStorage.removeItem('doctorInfo-iCare')
    dispatch(updateAuthenticated(false))
    goto('/')
  }


  useEffect(() => {
    if (takeDoctorInfo) dispatch(checkInfo())
    // eslint-disable-next-line
  }, [])


  return !authenticated ? <Navigate to={`/`} replace={true} /> :
    doctorInfo === null ? <Loading /> :
      <div className="DoctorHome">

        <div className="header">
          <img src="/images/logo.png" alt="" className="logo1" />
          <div className="name-logout">
            <p className="name">Hi, {user.name}</p>
            <Button className='logout' onClick={() => signoutFunc()} variant="contained">Sign Out</Button>
          </div>
        </div>

        {(takeDoctorInfo && doctorInfo === undefined) && <DoctorForm />}

      </div>
}
