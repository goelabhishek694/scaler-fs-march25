import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserMiddleware } from '../userMiddleware';
import userSlice from '../reactRedux/userSlice';

function User() {
    const [value, setValue] = useState(1);
    const actions = userSlice.actions;
    const {loading, error, user} = useSelector((store) => store.userState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserMiddleware(value));
    },[value])

    const handleParam = () =>{
        dispatch(actions.setParam(value))
    }

    const heading = <>
    <h2>User Example</h2>
    <input value={value} onChange={(e) => setValue(e.target.value) }/>
    <button onClick={handleParam}>send param</button>
    </>;
    if(loading){
        return <>
        {heading}
        <h3>...Loading</h3>
        </>
    }
    if(error){
        return <>
        {heading}
        <h3>Error Occurred</h3>
        </>
    }
  return (
    <>
    {heading}
    <h4>Name: {user.name}</h4>
    <h4>Phone: {user.phone}</h4>
    </>
  )
}

export default User