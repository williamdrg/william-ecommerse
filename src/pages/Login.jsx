import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useDispatch, useSelector } from 'react-redux';
import { getUserThunk, login } from '../store/slices/auth.slice';
import './styles/login.css'
import UserProfile from "../components/Login/UserProfile";

import Modal from "../components/shared/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";

const Login = () => {
  const { handleSubmit, register, reset, setValue } = useForm()
  const isAuthenticated = useSelector(state => state.authSlice.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authenticate } = useAuth();
  const modal = useSelector(state => state.modal); 
  const { setLoad } = useContext(LoadingContext);

  const submit = async data => {
    setLoad(true);
    try {
      const response = await authenticate('/login', data)
        dispatch(login(response.token));
        await dispatch(getUserThunk(response.id));
        navigate('/');
        reset({
          email: '',
          password: ''
        })
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoad(false);
    }
  }

  return (
    <div>
      {
        isAuthenticated ?
        <div className="user_profile_container">
          <UserProfile/>
        </div>
        :    
        <form className="login-form" onSubmit={handleSubmit(submit)}>
          <h2 className="login-title">Login</h2>
          <div className="user_test">
            <h3>Test data</h3>
            <p><FontAwesomeIcon icon={faEnvelope}/> test-ecommerse@gmail.com</p>
            <p><FontAwesomeIcon icon={faKey}/> test1234</p>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input {...register('email', {onChange: (e) => setValue('email', e.target.value.toLowerCase())})} id="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input {...register('password')} id="password" type="password" />
          </div>
          <button>Login</button>
          <p className="register">If you are not registered yet, <Link to='/register'>register here.</Link></p>
        </form>
      }
      {modal.isVisible && <Modal message={modal.message} type={modal.type} />}{modal.isVisible && <Modal message={modal.message} type={modal.type} />}
    </div>
  )
}

export default Login