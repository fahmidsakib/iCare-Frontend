import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { resetPasswordMiddleware } from '../slices/user.slice'
import Loading from './Loading'

export default function Middleware() {

  let { id, code } = useParams()
  let dispatch = useDispatch()
  let { resetPassword } = useSelector(state => state.userSlice)
  
  useEffect(() => { 
    dispatch(resetPasswordMiddleware({id, code}))
    // eslint-disable-next-line
  },[])

  return resetPassword ? <Navigate to="/" replace={true} /> : <div className="Middleware"><Loading/></div>
}
