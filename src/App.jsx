import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Navbar from './components/shared/Navbar'
import Register from './pages/Register'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAuth } from './store/slices/auth.slice'
import Order from './pages/Order'
import Cart from './components/homepage/Cart'
import ProductDetails from './pages/ProductDetails'
import ResetPassword from './pages/ResetPassword'
import ProtectedRoutes from './pages/ProtectedRoutes'
import ProtectedComponent from './components/shared/ProtectedComponent'
import Loader from './components/shared/Loader'
import { setLoading } from './store/slices/loader.slice'

function App() {

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.loader);
  const isAuthenticated = useSelector(state => state.authSlice.isAuthenticated);
    
  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(initializeAuth());
  }, [dispatch]);

  return (   
    <div>
      {isLoading && <Loader/>}
      <Navbar/>
      {
        isAuthenticated &&
        <ProtectedComponent>
          <Cart />
        </ProtectedComponent>
      }
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/product-details/:id' element={<ProductDetails/>}/>
        <Route element={<ProtectedRoutes />}>
          <Route path='/order' element={<Order/>}/>
          <Route path='/reset_password' element={<ResetPassword/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
