import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    //write logic to fetch user data
    const {user} = useSelector(state=> state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute