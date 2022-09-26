import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { cancelConsultation, closeConsultation, getConsultations } from '../slices/doctor.slice'

export default function DoctorBookingCard({ consultation }) {

  let datenow = new Date()
  let dispatch = useDispatch()
  let [open, setOpen] = useState(false)
  let [open2, setOpen2] = useState(false)
  let [prescription, setPrescription] = useState('')

  return <div className="booking-card-div">
    <div className="booking-card">
      <img src="/images/booking.png" alt="" className="booking-img" />
      <div className="info-booking">
        <p className="doc-name">{consultation.patientName}</p>
        <p className="date-time">Date: {new Date(consultation.date).toLocaleDateString()} | Time: {consultation.time}</p>
        <div className="button-doc-booking-card">
          {consultation.status === "Closed" && <button onClick={() => setOpen2(true)} className="booking2">Prescription</button>}
          {consultation.status !== 'Upcoming' ? <p className="status">{consultation.status}</p> :
            ((new Date(consultation.date).getDate() > datenow.getDate()) ?
              <button onClick={() => {
                dispatch(cancelConsultation(consultation.id))
                dispatch(getConsultations())
              }}
                className="booking2">Cancel</button> :
              ((datenow.toTimeString() < consultation.time && new Date(consultation.date).getDate() === datenow.getDate()) ?
                <button onClick={() => {
                  dispatch(cancelConsultation(consultation.id))
                  dispatch(getConsultations())
                }}
                  className="booking2">Cancel</button> :
                <button onClick={() => setOpen(true)} className="booking2">Close</button>))}
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

    {open2 && <div className="booking-popup">
      <div className="innerPopup">
        <div className="inputDiv">
          <label>Your Remarks: </label>
          <textarea value={consultation.prescription} className="input-text" readOnly rows="15"></textarea>
          {/* <input className="input-text" type="text" onChange={(e) => { setPrescription(e.target.value); }} /> */}
        </div>
        <button className="booking2" onClick={() => { setOpen2(false); }}>Close</button>
        <button className="kick1" onClick={() => { setOpen2(false); }}>X</button>
      </div>
    </div>}

  </div>

}
