import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateAuthenticated } from '../slices/user.slice'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Navigate, useNavigate } from 'react-router-dom';
import DoctorForm from './DoctorForm';
import { checkInfo, getConsultations, getPatientsInfo, getRevenue, updatedErrordAlert } from '../slices/doctor.slice';
import Loading from './Loading';
import DoctorBookingCard from './DoctorBookingCard';

export default function DoctorHome() {

  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let [startDate, setStartDate] = useState()
  let [endDate, setEndDate] = useState()
  let [rating, setRating] = useState(null)
  let dispatch = useDispatch()
  let goto = useNavigate()
  let [pageOp, setPageOp] = useState([true, false])
  let { authenticated, user } = useSelector(state => state.userSlice)
  let { dError, dAlert, dLoading, doctorInfo, takeDoctorInfo, todaysConsultations,
    upcomingConsultations, selectedConsultations, revenue } = useSelector(state => state.doctorSlice)

  let signoutFunc = () => {
    localStorage.removeItem('accessToken-iCare')
    localStorage.removeItem('refreshToken-iCare')
    localStorage.removeItem('userInfo-iCare')
    localStorage.removeItem('doctorInfo-iCare')
    dispatch(updateAuthenticated(false))
    goto('/')
  }


  useEffect(() => {
    let ratingSum = 0
    doctorInfo.ratingAndReview.forEach((rating) => ratingSum += Number(rating.rating))
    ratingSum === 0 ? setRating(0) : setRating((ratingSum / doctorInfo.ratingAndReview.length).toFixed(1))
    console.log(ratingSum, doctorInfo.ratingAndReview.length)
    dispatch(checkInfo())
    dispatch(getPatientsInfo())
    dispatch(getConsultations())
    // eslint-disable-next-line
  }, [])


  return !authenticated ? <Navigate to={`/`} replace={true} /> :
    doctorInfo === null ? <div className="Middleware"><Loading /></div> :
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
                {dLoading ? <Loading /> :
                  (todaysConsultations.length === 0 ? <p className="message">No consultation for Today</p> :
                    <div className="bookingCard-div">
                      {todaysConsultations.map(el => <DoctorBookingCard consultation={el} />)}
                    </div>)}
              </div>

              <div className="bookingDiv">
                <h2>Upcoming Consultation</h2>
                {dLoading ? <Loading /> :
                  (upcomingConsultations.length === 0 ? <p className="message">No upcoming consultation</p> :
                    <div className="bookingCard-div">
                      {upcomingConsultations.map(el => <DoctorBookingCard key={el.id} consultation={el} />)}
                    </div>)}
              </div>

            </div>}

            {pageOp[1] && <div className="Profile">


              <div className="bookingDiv">
                <h2>Profile details</h2>
                <div className="info-patient-profile-top">
                  <img src="/images/edit.png" alt="" className="edit" />
                  <img src="/images/doctor.png" alt="" />
                  <div className="name-email">
                    <p className="name-profile">{doctorInfo.name}</p>
                    <p className="email">Email: {doctorInfo.email}</p>
                  </div>
                </div>

                <div className="middle-profile-doc">
                  <p className="doc-text">Qualification: {doctorInfo.qualification}</p>
                  <p className="doc-text">Experience: {doctorInfo.experience}</p>
                  <p className="doc-text">Hospital: {doctorInfo.hospital}</p>
                  <p className="doc-text">Location: {doctorInfo.location}</p>

                  <div className="doc-div-info">
                    <p className="doc-text">Speciality: </p>
                    <div className="diseases-Div1">
                      {doctorInfo.speciality.map(el => <div className="disease"><p className="doc-info-text-p">{el}</p></div>)}
                    </div>
                  </div>

                  <div className="doc-div-info">
                    <p className="doc-text">Available Day: </p>
                    <div className="diseases-Div1">
                      {doctorInfo.availableDay.map((el, index) => (el && <div className="disease"><p className="doc-info-text-p">{day[index]}</p></div>))}
                    </div>
                  </div>

                  <div className="doc-div-info">
                    <p className="doc-text">Available Time: </p>
                    <div className="diseases-Div1">
                      {doctorInfo.availableTime.map(el => <div className="disease"><p className="doc-info-text-p">{el}</p></div>)}
                    </div>
                  </div>

                <p className="doc-text">Cost: <span className="doc-info-text-p">${doctorInfo.cost}</span></p>
                {rating !== null && <p className="doc-text">Rating: 🌟 <span className="doc-info-text-p">{rating}</span></p>}

                </div>

              </div>

              <div className="bookingDiv">
                <h2>Revenue: </h2>

                <div className="dateDiv">
                  <div className="inputDiv">
                    <label>Select Start Date</label>
                    <input value={startDate} className="input-text1" type="date"
                      onChange={(e) => { setStartDate(e.target.value); }} />
                  </div>
                  <div className="inputDiv">
                    <label>Select End Date</label>
                    <input value={endDate} className="input-text1" type="date"
                      onChange={(e) => { setEndDate(e.target.value); }} />
                  </div>
                  <button onClick={() => dispatch(getRevenue({ startDate, endDate }))} className="booking">Generate Revenue Info</button>
                </div>

                {(revenue !== null) && <div className="revenueDiv">
                  <h2 className="revenue">Total revenue: ${revenue}</h2>
                  <div className="bookingDiv">
                    <h2>Closed Consultation</h2>
                    {selectedConsultations.length === 0 ? <p className="message">No consultation have been done!</p> :
                      <div className="bookingCard-div">
                        {selectedConsultations.map(el => <DoctorBookingCard key={el.id} consultation={el} />)}
                      </div>}
                  </div>
                </div>}

              </div>

            </div>}

          </>}
        
        <Snackbar autoHideDuration={3000} open={dError !== null} onClose={() => dispatch(updatedErrordAlert())} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} message={dError} />
        <Snackbar autoHideDuration={3000} open={dAlert !== null} onClose={() => dispatch(updatedErrordAlert())} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} message={dAlert} />

      </div>
}
