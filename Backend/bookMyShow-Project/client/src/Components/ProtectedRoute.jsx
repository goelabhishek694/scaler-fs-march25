import React from 'react'

function ProtectedRoute({children}) {
    //write logic to fetch user data
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute