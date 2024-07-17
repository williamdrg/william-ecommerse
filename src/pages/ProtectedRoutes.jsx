import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"


const ProtectedRoutes = () => {
  const isAuthenticated = useSelector(state => state.authSlice.isAuthenticated);
  
  if (isAuthenticated) {
    return <Outlet/>
  } else {
    return <Navigate to='/login'/>
  }
}

export default ProtectedRoutes