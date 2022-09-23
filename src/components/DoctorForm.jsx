import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { saveDoctorInfo } from '../slices/doctor.slice';
import { useDispatch } from 'react-redux';

export default function DoctorForm() {

  let dispatch = useDispatch()
  let [availableDay, setAvailableDay] = useState([false, false, false, false, false, false, false])
  let [availableTime, setAvailableTime] = useState([])
  let [speciality, setSpeciality] = useState([])
  let [showSP, setShowSP] = useState('')

  let checkAvailableDay = (index) => {
    let copyAD = JSON.parse(JSON.stringify(availableDay))
    copyAD[index] = true
    setAvailableDay(copyAD)
  }

  let addAvailableTime = (time) => {
    let copyAT = JSON.parse(JSON.stringify(availableTime))
    let index = copyAT.findIndex(el => el === time)
    index === -1 ? copyAT.push(time) : copyAT.splice(index, 1)
    setAvailableTime(copyAT)
  }

  let addSpeciality = (sp) => {
    let copyS = JSON.parse(JSON.stringify(speciality))
    let index = copyS.findIndex(el => el === sp)
    index === -1 ? copyS.push(sp) : copyS.splice(index, 1)
    setSpeciality(copyS)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let info = {
      qualification: data.get('qualification'),
      experience: data.get('experience'),
      speciality,
      hospital: data.get('hospital'),
      location: data.get('location'),
      avgConsultationTime: Number(data.get('avgConsultationTime')),
      cost: Number(data.get('cost')),
      availableDay,
      availableTime
    }
    dispatch(saveDoctorInfo(info))
    // console.log(info)
  }

  return (
    <div className="DoctorForm">
      <div className="main">
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ m: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="qualification"
                type="text"
                required
                fullWidth
                id="qualification"
                label="Qualification"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="experience"
                type="text"
                required
                fullWidth
                id="experience"
                label="Experience"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <div className="info">
                <TextField
                  autoComplete="given-name"
                  name="speciality"
                  type="text"
                  required
                  fullWidth
                  id="speciality"
                  label="Speciality"
                  value={speciality}
                  autoFocus
                  readOnly
                />
                <TextField
                  id="chooseSpeciality"
                  select
                  name="chooseSpeciality"
                  label="Choose Speciality"
                  required
                  fullWidth
                  value={showSP}
                  onChange={(e) => { addSpeciality(e.target.value); setShowSP(e.target.value) }}
                  sx={{ color: 'rgb(198, 0, 23)' }}
                >
                  <MenuItem key={1} value='Dentist'>Dentist</MenuItem>
                  <MenuItem key={2} value='Gynecologist'>Gynecologist</MenuItem>
                  <MenuItem key={3} value='General Physician'>General Physician</MenuItem>
                  <MenuItem key={4} value='Darmatologist'>Darmatologist</MenuItem>
                  <MenuItem key={5} value='ENT Specialist'>ENT Specialist</MenuItem>
                  <MenuItem key={6} value='Medicine Specialist'>Medicine Specialist</MenuItem>
                  <MenuItem key={7} value='Homoeopath'>Homoeopath</MenuItem>
                  <MenuItem key={8} value='Ayurveda'>Ayurveda</MenuItem>
                </TextField>
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="hospital"
                type="text"
                required
                fullWidth
                id="hospital"
                label="Hospital"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="location"
                type="text"
                required
                fullWidth
                id="location"
                label="Location"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <div className="info2">
                <TextField
                  required
                  type="number"
                  fullWidth
                  id="cost"
                  label="Consultation Fee"
                  name="cost"
                  autoComplete="cost"
                />
                <TextField
                  required
                  type="number"
                  fullWidth
                  id="avgConsultationTime"
                  label="Consultation Time in minutes"
                  name="avgConsultationTime"
                  autoComplete="avgConsultationTime"
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="checkBox">
                <p className="login-text">Available Day,</p>
                <div className="checkBox1">
                  <Checkbox onClick={() => { checkAvailableDay(0) }} />
                  <p className="userType">Sunday</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { checkAvailableDay(1) }} />
                  <p className="userType">Monday</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { checkAvailableDay(2) }} />
                  <p className="userType">Tuesday</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { checkAvailableDay(3) }} />
                  <p className="userType">Wednesday</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { checkAvailableDay(4) }} />
                  <p className="userType">Thursday</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { checkAvailableDay(5) }} />
                  <p className="userType">Friday</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { checkAvailableDay(6) }} />
                  <p className="userType">Saturday</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="checkBox">
                <p className="login-text">Available Time,</p>
                <div className="checkBox1">
                  <Checkbox onClick={() => { addAvailableTime('09:00') }} />
                  <p className="userType">09:00</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { addAvailableTime('09:30') }} />
                  <p className="userType">09:30</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { addAvailableTime('10:00') }} />
                  <p className="userType">10:00</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { addAvailableTime('10:30') }} />
                  <p className="userType">10:30</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { addAvailableTime('11:00') }} />
                  <p className="userType">11:00</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { addAvailableTime('11:30') }} />
                  <p className="userType">11:30</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { addAvailableTime('12:00') }} />
                  <p className="userType">12:00</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { addAvailableTime('12:30') }} />
                  <p className="userType">12:30</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { addAvailableTime('13:00') }} />
                  <p className="userType">13:00</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { addAvailableTime('13:30') }} />
                  <p className="userType">13:30</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { addAvailableTime('14:00') }} />
                  <p className="userType">14:00</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { addAvailableTime('14:30') }} />
                  <p className="userType">14:30</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { addAvailableTime('15:00') }} />
                  <p className="userType">15:00</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { addAvailableTime('15:30') }} />
                  <p className="userType">15:30</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { addAvailableTime('16:00') }} />
                  <p className="userType">16:00</p>
                </div>
                <div className="checkBox1">
                  <Checkbox onClick={() => { addAvailableTime('16:30') }} />
                  <p className="userType">16:30</p>
                </div>
              </div>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, p: 1.8 }}
          >
            Submit Information
          </Button>
        </Box>
      </div>
    </div>
  )
}
