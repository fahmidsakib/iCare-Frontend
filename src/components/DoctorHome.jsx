import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateAuthenticated } from '../slices/user.slice'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Navigate, useNavigate } from 'react-router-dom';
import DoctorForm from './DoctorForm';
import { checkInfo, getConsultations, getPatientsInfo } from '../slices/doctor.slice';
import Loading from './Loading';
import DoctorBookingCard from './DoctorBookingCard';

export default function DoctorHome() {

  let dispatch = useDispatch()
  let goto = useNavigate()
  let [pageOp, setPageOp] = useState([true, false])
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
    dispatch(getPatientsInfo())
    dispatch(getConsultations())
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

        {(!takeDoctorInfo && doctorInfo !== undefined) && 
          <>

          <div className="button">
            <button style={{ textDecoration: pageOp[0] ? 'underline' : 'none', color: pageOp[0] ? '#BF3100' : '#373F47' }} onClick={() => setPageOp([true, false])} className="home-btn">Home</button>
            <button style={{ textDecoration: pageOp[1] ? 'underline' : 'none', color: pageOp[1] ? '#BF3100' : '#373F47' }} onClick={() => setPageOp([false, true])} className="home-btn">My Profile</button>
          </div>

          {pageOp[0] && <div className="Home-doc">
            
            <div className="bookingDiv">
              <h2>Today's Consultation</h2>
              {/* {todaysConsultations.length === 0 ? <p className="message">No consultation for Today</p> :
                <div className="bookingCard-div">
                  {todaysConsultations.map(el => <DoctorBookingCard consultation={el} />)}
                </div>} */}
            </div>

            <div className="bookingDiv">
              <h2>Upcoming Consultation</h2>
              {/* {upcomingConsultations.length === 0 ? <p className="message">No upcoming consultation</p> :
                <div className="bookingCard-div">
                  {upcomingConsultations.map(el => <DoctorBookingCard key={el.id} consultation={el} />)}
                </div>} */}
            </div>

          </div>}
          
          {pageOp[1] && <div className="Profile-doc">

          </div>}

          </>}

      </div>
}
