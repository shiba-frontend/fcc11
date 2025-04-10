import { Outlet, Navigate } from 'react-router-dom'

const PublicRoute = () => {
    const token = localStorage.getItem('fcc_access_token');

  return (
    token ? <Outlet/> : <Navigate to="/"  />
  )
}

export default PublicRoute