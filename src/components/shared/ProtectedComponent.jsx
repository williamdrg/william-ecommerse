import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedComponent = ({ children }) => {
  const isAuthenticated = useSelector(state => state.authSlice.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedComponent