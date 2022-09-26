import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DoctorHome from './DoctorHome'
import Login from './Login'
import Middleware from './Middleware'
import PatientHome from './PatientHome'

export default function Main() {
  return (
    <div className="Main">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/p" element={<PatientHome />} />
        <Route path="/home/d" element={<DoctorHome />} />
        <Route path="/auth/reset-password/:id/:code" element={<Middleware />} />
      </Routes>
    </div>
  )
}
