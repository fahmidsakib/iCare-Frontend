import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateAuthenticated } from '../slices/user.slice'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import { Navigate, useNavigate } from 'react-router-dom';
import PatientForm from './PatientForm';
import { applyFilter, checkInfo, getConsultations, getDoctorsInfo, getPastConsultations, updatepErrorpAlert, updateShowDoctor } from '../slices/patient.slice';
import Loading from './Loading';
import DoctorCard from './DoctorCard';
import PatientBookingCard from './PatientBookingCard';

export default function PatientHome() {

  let dispatch = useDispatch()
  let goto = useNavigate()
  let [searchText, setSearchtext] = useState('')
  let [pageOp, setPageOp] = useState([true, false, false])
  let [filter, setFilter] = useState('')
  let { authenticated, user } = useSelector(state => state.userSlice)
  let { pError, pAlert, pLoading, patientInfo,
    takePatientInfo, todaysConsultations,
    upcomingConsultations, pastConsultations, showDoctors } = useSelector(state => state.patientSlice)


  let signoutFunc = () => {
    localStorage.removeItem('accessToken-iCare')
    localStorage.removeItem('refreshToken-iCare')
    localStorage.removeItem('userInfo-iCare')
    localStorage.removeItem('patientInfo-iCare')
    dispatch(updateAuthenticated(false))
    goto('/')
  }


  useEffect(() => {
    dispatch(checkInfo())
    dispatch(getDoctorsInfo())
    dispatch(getConsultations())
    dispatch(getPastConsultations())
    // eslint-disable-next-line
  }, [])


  return !authenticated ? <Navigate to={`/`} replace={true} /> :
    patientInfo === null ? <div className="Middleware"><Loading /></div> :
      <div className="PatientHome">

        <div className="header">
          <img src="/images/logo.png" alt="" className="logo1" />
          <div className="name-logout">
            <p className="name">Hi, {user.name}</p>
            <Button className='logout' onClick={() => signoutFunc()} variant="contained">Sign Out</Button>
          </div>
        </div>

        {(takePatientInfo && patientInfo === undefined) && <PatientForm />}

        {(patientInfo !== undefined && !takePatientInfo) &&
          <>
            <div className="button">
              <button style={{ textDecoration: pageOp[0] ? 'underline' : 'none', color: pageOp[0] ? '#BF3100' : '#373F47' }} onClick={() => setPageOp([true, false, false])} className="home-btn">Home</button>
              <button style={{ textDecoration: pageOp[1] ? 'underline' : 'none', color: pageOp[1] ? '#BF3100' : '#373F47' }} onClick={() => setPageOp([false, true, false])} className="home-btn">My Bookings</button>
              <button style={{ textDecoration: pageOp[2] ? 'underline' : 'none', color: pageOp[2] ? '#BF3100' : '#373F47' }} onClick={() => setPageOp([false, false, true])} className="home-btn">My Profile</button>
            </div>

            {pageOp[0] &&
              <div className="Home">

                <div className="search-box">
                  <input onChange={(e) => setSearchtext(e.target.value)} type="text" className="search" placeholder='Search for Doctor, Hospital, Speciality, Location etc' />
                  <button onClick={() => dispatch(updateShowDoctor(searchText))} className="booking">Search</button>
                </div>

                <div className="filter">
                  {/* <p className="filer-text">Filter: </p> */}
                  <TextField
                    id="filter"
                    select
                    name="filter"
                    label="Filters"
                    required
                    fullWidth
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    sx={{ color: 'rgb(198, 0, 23)', width: '25%' }}
                    className="filter-box"
                  >
                    <MenuItem key={1} value='ratinghl'>Ratings [High to Low]</MenuItem>
                    <MenuItem key={2} value='feelh'>Fee [High to Low]</MenuItem>
                    <MenuItem key={3} value='feehl'>Fee [Low to High]</MenuItem>
                  </TextField>
                  <button onClick={() => dispatch(applyFilter(filter))} className="booking">Apply Filter</button>
                </div>

                <div className="showDiv">

                  {(pLoading && showDoctors.length === 0) ? <Loading /> :
                    (showDoctors.length > 0 && showDoctors.map(doc => <DoctorCard key={doc.id} doc={doc} />))}
                </div>

              </div>}

            {pageOp[1] && <div className="bookings">

              <div className="bookingDiv">
                <h2>Today's Consultation</h2>
                {pLoading ? <Loading /> :
                  (todaysConsultations.length === 0 ? <p className="message">No consultation for Today</p> :
                    <div className="bookingCard-div">
                      {todaysConsultations.map(el => <PatientBookingCard consultation={el} />)}
                    </div>)}
              </div>

              <div className="bookingDiv">
                <h2>Upcoming Consultation</h2>
                {pLoading ? <Loading /> :
                  (upcomingConsultations.length === 0 ? <p className="message">No upcoming consultation</p> :
                    <div className="bookingCard-div">
                      {upcomingConsultations.map(el => <PatientBookingCard key={el.id} consultation={el} />)}
                    </div>)}
              </div>

            </div>}

            {pageOp[2] && <div className="Profile">


              <div className="bookingDiv">
                <h2>Profile details</h2>
                <div className="info-patient-profile-top">
                  <img src="/images/edit.png" alt="" className="edit" />
                  <img src="/images/patient.png" alt="" />
                  <div className="name-email">
                    <p className="name-profile">{patientInfo.name}</p>
                    <p className="email">Email: {patientInfo.email}</p>
                    <p className="location-profile">Location: {patientInfo.location}</p>
                  </div>
                </div>
                <div className="middle-profile">
                  <p className="blood-group-profile">Age: <span className="profile">{patientInfo.age}</span> Years</p>
                  <p className="blood-group-profile">Weight: <span className="profile">{patientInfo.weight}</span> Kg</p>
                  <p className="blood-group-profile">Sex: <span className="profile">{patientInfo.sex}</span> </p>
                  <p className="blood-group-profile">Blood Group: <span className="profile">{patientInfo.bloodGroup}</span> </p>
                </div>
                <div className="lower-profile">
                  <p className="pastDiseases">Past Diseases: </p>
                  <div className="diseases-Div">
                    {patientInfo.pastDiseases.map(el =>
                      <div className="disease">
                        <p className="diseaseName">{el[0]} : </p>
                        <p className="diseaseYear">{el[1]}</p>
                      </div>)}
                  </div>
                </div>
              </div>

              <div className="bookingDiv">
                <h2>Past Consultation</h2>
                {pastConsultations.length === 0 ? <p className="message">No past consultation</p> :
                  <div className="bookingCard-div">
                    {pastConsultations.map(el => <PatientBookingCard key={el.id} consultation={el} />)}
                  </div>}
              </div>

            </div>}
          </>}
        
        <Snackbar autoHideDuration={3000} open={pError !== null} onClose={() => dispatch(updatepErrorpAlert())} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} message={pError} />
        <Snackbar autoHideDuration={3000} open={pAlert !== null} onClose={() => dispatch(updatepErrorpAlert())} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} message={pAlert} />

      </div>
}
