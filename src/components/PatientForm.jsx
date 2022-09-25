import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { savePatientInfo } from '../slices/patient.slice';
import { useDispatch } from 'react-redux';


export default function PatietntForm() {

  let dispatch = useDispatch()
  let [sex, setSex] = useState('')
  let [bloodGroup, setBloodGroup] = useState('')
  let [diseasesAndYears, setDiseasesAndYears] = useState([{ disease: '', years: '' }])

  let addNewDY = () => {
    let copyDY = JSON.parse(JSON.stringify(diseasesAndYears))
    copyDY.push({ disease: '', years: '' })
    setDiseasesAndYears(copyDY)
  }

  let updateDisease = (name, index) => {
    let copyDY = JSON.parse(JSON.stringify(diseasesAndYears))
    copyDY[index].disease = name
    setDiseasesAndYears(copyDY)
  }

  let updateYears = (year, index) => {
    let copyDY = JSON.parse(JSON.stringify(diseasesAndYears))
    copyDY[index].years = year
    setDiseasesAndYears(copyDY)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let arrDY = []
    diseasesAndYears.forEach(el => { arrDY.push([el.disease, el.years]) })
    const data = new FormData(event.currentTarget);
    let info = {
      location: data.get('location'),
      age: data.get('age'),
      weight: data.get('weight'),
      sex: data.get('sex'),
      bloodGroup: data.get('bloodGroup'),
      lookingFor: data.get('lookingFor'),
      pastDiseases: arrDY
    }
    dispatch(savePatientInfo(info))
    // console.log(info)
  }

  return (
    <div className="PatientForm">
      <div className="main">
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ m: 3 }}>
          <Grid container spacing={2}>
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
              <div className="info">
                <Grid item xs={12}>
                  <TextField
                    required
                    type="number"
                    fullWidth
                    id="age"
                    label="Age"
                    name="age"
                    autoComplete="age"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    type="number"
                    fullWidth
                    id="weight"
                    label="Weight in kg"
                    name="weight"
                    autoComplete="weight"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="sex"
                    select
                    name="sex"
                    label="Sex"
                    required
                    fullWidth
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    sx={{ color: 'rgb(198, 0, 23)' }}
                  >
                    <MenuItem key={1} value='Male'>Male</MenuItem>
                    <MenuItem key={2} value='Female'>Female</MenuItem>
                    <MenuItem key={3} value='Others'>Others</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="bloodGroup"
                    select
                    name="bloodGroup"
                    label="Blood Group"
                    required
                    fullWidth
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    sx={{ color: 'rgb(198, 0, 23)' }}
                  >
                    <MenuItem key={1} value='A+ve'>A+ve</MenuItem>
                    <MenuItem key={2} value='A-ve'>A-ve</MenuItem>
                    <MenuItem key={3} value='B+ve'>B+ve</MenuItem>
                    <MenuItem key={4} value='B-ve'>B-ve</MenuItem>
                    <MenuItem key={5} value='O+ve'>O+ve</MenuItem>
                    <MenuItem key={6} value='O-ve'>O-ve</MenuItem>
                    <MenuItem key={7} value='AB+ve'>AB+ve</MenuItem>
                    <MenuItem key={8} value='AB-ve'>AB-ve</MenuItem>
                  </TextField>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="info1">
                {diseasesAndYears.map((el, index) =>
                  <Grid key={index} container spacing={0}>
                    <div className="info2">
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="given-name"
                          name="disease"
                          type="text"
                          required
                          fullWidth
                          id="disease"
                          label="Disease Name"
                          autoFocus
                          value={el.disease}
                          onChange={(e) => updateDisease(e.target.value, index)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="given-name"
                          name="years"
                          type="number"
                          required
                          fullWidth
                          id="years"
                          label="Years of having it"
                          autoFocus
                          value={el.years}
                          onChange={(e) => updateYears(e.target.value, index)}
                        />
                      </Grid>
                      {index === diseasesAndYears.length - 1 &&
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{ p: 1.8 }}
                          onClick={() => addNewDY()}
                        >
                          Add Field
                        </Button>}
                    </div>
                  </Grid>
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="lookingFor"
                type="text"
                required
                fullWidth
                id="lookingFor"
                label="Looking For"
                autoFocus
              />
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
