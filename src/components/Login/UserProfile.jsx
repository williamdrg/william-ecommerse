import {  useDispatch, useSelector } from 'react-redux';
import './styles/userProfile.css'
import { useState } from 'react';
import UpdateUsers from './UpdateUsers';
import useAuth from '../../hooks/useAuth';
import { showModal } from '../../store/slices/modal.slice';
import Modal from '../shared/Modal';

const UserProfile = () => {
  const username = useSelector(state => state.authSlice.user.username);
  const avatarUrl = useSelector(state => state.authSlice.user.avatarUrl);
  const email = useSelector(state => state.authSlice.user.email);
  const modal = useSelector(state => state.modal);
  const { submitPassword } = useAuth()
  const dispatch = useDispatch();

  const [ isEditingProfile, setIsEditingProfile ] = useState(false);


  const handlerResetPassword = async () => {
    try {
      await submitPassword({ email });
      dispatch(showModal({ message: 'Please check your email to reset your password.', type: 'success' }));
    } catch (error) {
      console.error("Error during password reset:", error);
      dispatch(showModal({ message: 'There was an error. Please try again.', type: 'error' }));
    }
  };

  return (
    <div className="card_user_profile">
      <div className="header_user_profile"></div>
      <div className="profile_user">
          <img src={avatarUrl || "https://st2.depositphotos.com/3895623/5589/v/450/depositphotos_55896913-stock-illustration-usershirt.jpg"}  alt="user-image" />
          <h2>{username}</h2>
          <p>User registered</p>
          <div className="btn_user_profile">
            <button className="btn_a" onClick={() => setIsEditingProfile(!isEditingProfile)}>Edit Profile</button>
            <button className="btn_a black" onClick={handlerResetPassword}>Reset Password</button>
          </div>
      </div>
      {isEditingProfile && <UpdateUsers setIsEditingProfile={setIsEditingProfile}/>}
      {modal.isVisible && <Modal message={modal.message} type={modal.type} />}
  </div>
  )
}

export default UserProfile