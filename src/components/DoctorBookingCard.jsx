import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setRatingAndReview } from '../slices/patient.slice'

export default function DoctorBookingCard({ consultation }) {

  let dispatch = useDispatch()
  let { allPatients } = useSelector(state => state.doctorSlice)
  let [patient, setPatient] = useState(null)
  let [open, setOpen] = useState(false)
  let [prescription, setPrescription] = useState('')


  useEffect(() => {
    let index = allPatients.findIndex(patient => patient.id === consultation.patientId)
    setPatient(allPatients[index])
    // eslint-disable-next-line
  }, [])

  return patient !== null && <div className="booking-card-div">
    <div className="booking-card">
      <img src="/images/booking.png" alt="" className="booking-img" />
      <div className="info-booking">
        <p className="doc-name">{patient.name}</p>
        <p className="date-time">Date: {new Date(consultation.date).toLocaleDateString()} | Time: {consultation.time}</p>
        {consultation.status !== 'Closed' ? <p className="status">{consultation.status}</p> :
          <button onClick={() => setOpen(true)} className="booking2">Rate the service</button>}
      </div>
    </div>

    {/* {open && <div className="booking-popup">
      <div className="innerPopup">
        <div className="inputDiv">
          <label>Rating (Out of 10)</label>
          <input className="input-text" type="number" onChange={(e) => { setRating(e.target.value); }} />
        </div>
        <div className="inputDiv">
          <label>Review</label>
          <input className="input-text" type="text" onChange={(e) => { setReview(e.target.value) }} />
        </div>
        <button onClick={() => { dispatch(setRatingAndReview({ rating, review, doctorId: consultation.doctorId })); setOpen(false) }} className="booking2">Submit Your Rating</button>
        <button className="kick1" onClick={() => { setOpen(false); }}>X</button>
      </div>
    </div>} */}

  </div>

}
