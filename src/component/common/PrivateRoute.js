import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const token = localStorage.getItem('fcc_access_token');
    var user = JSON.parse(localStorage.getItem('user'))

  return (
    token  ? <Navigate  to={user?.role_id === 1 ? "/admin/dashboard" : "/home"}/> : <Outlet/>
  )
}

export default PrivateRoute