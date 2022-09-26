import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getConsultations, getPastConsultations, setRatingAndReview } from '../slices/patient.slice'

export default function PatientBookingCard({ consultation }) {

  let dispatch = useDispatch()
  let { allDoctors } = useSelector(state => state.patientSlice)
  let [doc, setDoc] = useState(null)
  let [open, setOpen] = useState(false)
  let [open2, setOpen2] = useState(false)
  let [rating, setRating] = useState(0)
  let [review, setReview] = useState('')


  useEffect(() => {
    let index = allDoctors.findIndex(doc => doc.email === consultation.doctorEmail)
    setDoc(allDoctors[index])
    // eslint-disable-next-line
  }, [])

  return doc !== null && <div className="booking-card-div">
    <div className="booking-card">
      <img src="/images/booking.png" alt="" className="booking-img" />
      <div className="info-booking">
        <p className="doc-name">{doc.name}, <span className="qualification">{doc.qualification}</span></p>
        <p className="date-time">Date: {new Date(consultation.date).toLocaleDateString()} | Time: {consultation.time}</p>
        <div className="patient-button-booking-card">
          {consultation.status === "Closed" && <button onClick={() => setOpen2(true)} className="booking2">Prescription</button>}
          {(!consultation.rated && consultation.status === "Closed") ? <button onClick={() => setOpen(true)} className="booking2">Rate it</button> :
            <p className="status">{consultation.status}</p>}
        </div>
      </div>
    </div>

    {open && <div className="booking-popup">
      <div className="innerPopup">
        <div className="inputDiv">
          <label>Rating (Out of 10)</label>
          <input className="input-text" type="number" onChange={(e) => { setRating(e.target.value); }} />
        </div>
        <div className="inputDiv">
          <label>Review</label>
          <input className="input-text" type="text" onChange={(e) => { setReview(e.target.value) }} />
        </div>
        <button onClick={() => {
          dispatch(setRatingAndReview({ rating, review, doctorEmail: consultation.doctorEmail, consultationId: consultation.id }))
          setOpen(false)
          dispatch(getConsultations())
          dispatch(getPastConsultations())
        }} className="booking2">Submit Your Rating</button>
        <button className="kick1" onClick={() => { setOpen(false); }}>X</button>
      </div>
    </div>}

    {open2 && <div className="booking-popup">
      <div className="innerPopup">
        <div className="inputDiv">
          <label>Remarks: </label>
          <textarea value={consultation.prescription} className="input-text" readOnly rows="15"></textarea>
          {/* <input className="input-text" type="text" onChange={(e) => { setPrescription(e.target.value); }} /> */}
        </div>
        <button className="booking2" onClick={() => { setOpen2(false); }}>Close</button>
        <button className="kick1" onClick={() => { setOpen2(false); }}>X</button>
      </div>
    </div>}

  </div>

}
