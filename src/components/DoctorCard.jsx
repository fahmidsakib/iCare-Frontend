import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { bookConsultation, checkAvailableSlot, getConsultations, getPastConsultations, updateAvailableSlot } from '../slices/patient.slice'
import Loading from './Loading'

export default function DoctorCard({ doc }) {

  let defaultDate = new Date()
  let [rating, setRating] = useState(null)
  let [open, setOpen] = useState(false)
  let [date, setDate] = useState(defaultDate.toLocaleDateString('en-CA'))
  let [time, setTime] = useState(null)
  let { availableSlot, pLoading, patientInfo } = useSelector(state => state.patientSlice)
  let dispatch = useDispatch()

  let checkSlot = (date) => {
    dispatch(updateAvailableSlot())
    let obj = { doctorId: doc.id, date: date }
    dispatch(checkAvailableSlot(obj))
  }

  let bookConsultationFunc = () => {
    let obj = {
      patientId: patientInfo.id,
      doctorId: doc.id,
      time, 
      date, 
      cost: doc.cost
    }
    dispatch(bookConsultation(obj))
    dispatch(getConsultations())
    dispatch(getPastConsultations())
    setDate(null)
    setTime(null)
  }

  useEffect(() => {
    let ratingSum = 0
    doc.ratingAndReview.forEach((rating) => ratingSum += rating.rating)
    ratingSum === 0 ? setRating(0) : setRating(ratingSum / doc.ratingAndReview.length.toFixed(1))
    if(!date) checkSlot(date)
    // eslint-disable-next-line
  }, [])

  return rating !== null && <div className="doctor-Card-main">
    <div className="doctor-card">
      <div className="left-doc-card">
        <img src="/images/doctor.png" alt="" className="doc-logo" />
        <div className="doc-card-info">
          <p className="doc-name">{doc.name}, <span className="qualification">{doc.qualification}</span></p>
          <div className="speciality">
            {doc.speciality.map(el => <p className="speciality-text">{el},</p>)}
          </div>
          <p className="experience">{doc.experience}</p>
          <p className="location">{doc.location}</p>
          <p className="hospital-name">{doc.hospital}</p>
          <p className="fee"> <span>${doc.cost}</span> consultation fee</p>
          <p className="rating">🌟 <span>{rating}</span></p>
        </div>
      </div>
      <button onClick={() => setOpen(true)} className="booking1">Book now!</button>
    </div>

    {open && <div className="booking-popup">
      <div className="innerPopup">
        <div className="inputDiv">
          <label>Select a Date</label>
          <input value={date} className="input-text" type="date" onChange={(e) => { setDate(e.target.value); checkSlot(e.target.value) }} />
        </div>
        <div className="inputDiv">
          <label>Available Slot</label>
          {date === null && <p className="message">No date selected yet!</p>}
          {(pLoading && date !== null) && <Loading />}
          {(!pLoading && availableSlot.length === 0 && date !== null) ? <p className="message">No available slot!</p> :
            <div className="timeSlot">
              {availableSlot.map(el => <button disabled={el === time} onClick={() => setTime(el)} className="time-btn">{el}</button>)}
            </div>}
        </div>
        <button onClick={() => { bookConsultationFunc(); setOpen(false) }} className="booking2">Confirm Your Booking</button>
        <button className="kick1" onClick={() => { setOpen(false); setDate(null); setTime(null); dispatch(updateAvailableSlot()) }}>X</button>
      </div>
    </div>}

  </div>
}
