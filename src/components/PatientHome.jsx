import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateAuthenticated } from '../slices/user.slice'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Navigate, useNavigate } from 'react-router-dom';
import PatientForm from './PatientForm';
import { checkInfo } from '../slices/patient.slice';
import Loading from './Loading';

export default function PatientHome() {

  let dispatch = useDispatch()
  let goto = useNavigate()
  let { authenticated, user } = useSelector(state => state.userSlice)
  let { pError, pAlert, pLoading, patientInfo, takePatientInfo, allDoctors,
    todaysConsultations, upcomingConsultations, pastConsultations } = useSelector(state => state.patientSlice)

  let signoutFunc = () => {
    localStorage.removeItem('accessToken-iCare')
    localStorage.removeItem('refreshToken-iCare')
    localStorage.removeItem('userInfo-iCare')
    localStorage.removeItem('patientInfo-iCare')
    dispatch(updateAuthenticated(false))
    goto('/')
  }


  useEffect(() => {
    if (takePatientInfo) dispatch(checkInfo())
    // eslint-disable-next-line
  }, [])


  return !authenticated ? <Navigate to={`/`} replace={true} /> :
    patientInfo === null ? <Loading /> :
      <div className="PatientHome">

        <div className="header">
          <img src="/images/logo.png" alt="" className="logo1" />
          <div className="name-logout">
            <p className="name">Hi, {user.name}</p>
            <Button className='logout' onClick={() => signoutFunc()} variant="contained">Sign Out</Button>
          </div>
        </div>

        {(takePatientInfo && patientInfo === undefined) && <PatientForm />}

      </div>
}
