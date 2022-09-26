import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { cancelConsultation, closeConsultation, getConsultations } from '../slices/doctor.slice'
import { setRatingAndReview } from '../slices/patient.slice'

export default function DoctorBookingCard({ consultation }) {

  let datenow = new Date()
  let dispatch = useDispatch()
  let [open, setOpen] = useState(false)
  let [prescription, setPrescription] = useState('')

  return <div className="booking-card-div">
    <div className="booking-card">
      <img src="/images/booking.png" alt="" className="booking-img" />
      <div className="info-booking">
        <p className="doc-name">{consultation.patientName}</p>
        <p className="date-time">Date: {new Date(consultation.date).toLocaleDateString()} | Time: {consultation.time}</p>
        <div className="button-doc-booking-card">
          {consultation.status !== 'Upcoming' ? <p className="status">{consultation.status}</p> :
            ((datenow.toTimeString() < consultation.time) ?
              <button onClick={() =>
                {dispatch(cancelConsultation(consultation.id))
                dispatch(getConsultations())}} className="booking2">Cancel</button> :
            <button onClick={() => setOpen(true)} className="booking2">Close</button>)}
          {/* <button onClick={() => dispatch(cancelConsultation(consultation.id))} className="booking2">Cancel</button>
          <button onClick={() => setOpen(true)} className="booking2">Close</button> */}
        </div>
      </div>
    </div>

    {open && <div className="booking-popup">
      <div className="innerPopup">
        <div className="inputDiv">
          <label>Place your remarks: </label>
          <textarea className="input-text" onChange={(e) => { setPrescription(e.target.value); }} rows="15"></textarea>
          {/* <input className="input-text" type="text" onChange={(e) => { setPrescription(e.target.value); }} /> */}
        </div>
        <button onClick={() => {
          dispatch(closeConsultation({ prescription, consultationId: consultation.id }))
          setOpen(false)
          dispatch(getConsultations())
        }} className="booking2">Submit Your Remarks</button>
        <button className="kick1" onClick={() => { setOpen(false); }}>X</button>
      </div>
    </div>}

  </div>

}
