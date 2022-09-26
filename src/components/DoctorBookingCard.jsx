import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { cancelConsultation, closeConsultation, getConsultations, getSpecificPatientsInfo } from '../slices/doctor.slice'
import Loading from './Loading'

export default function DoctorBookingCard({ consultation }) {

  let datenow = new Date()
  let dispatch = useDispatch()
  let [open, setOpen] = useState(false)
  let [open2, setOpen2] = useState(false)
  let [showInfo, setShowInfo] = useState(false)
  let [prescription, setPrescription] = useState('')
  let { patientInfo, dPopupLoading } = useSelector(state => state.doctorSlice)

  return <div className="booking-card-div">
    <div className="booking-card">
      <img src="/images/booking.png" alt="" className="booking-img" />
      <div className="info-booking">
        <button onClick={() => { console.log("clicked"); setShowInfo(true); dispatch(getSpecificPatientsInfo({ email: consultation.patientEmail}))}} className="name-btn">{consultation.patientName}</button>
        {/* <p className="doc-name">{consultation.patientName}</p> */}
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

    {showInfo && <div className="booking-popup">
      <div className="innerPopup">
        {(dPopupLoading && patientInfo === null) ? <Loading /> :
          <div className="bookingDiv">
            <h2>Profile details</h2>
            <div className="info-patient-profile-top">
              <img src="/images/patient.png" alt="" />
              <div className="name-email">
                <p className="name-profile">{patientInfo.name}</p>
                <p className="email">Email: {patientInfo.email}</p>
                <p className="location-profile">Location: {patientInfo.location}</p>
              </div>
            </div>
            <div className="middle-profile-popup">
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
          </div>}
        <button className="kick1" onClick={() => { setShowInfo(false) }}>X</button>
      </div>
    </div>}

  </div>

}
