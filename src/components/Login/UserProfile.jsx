import {  useSelector } from 'react-redux';
import './styles/userProfile.css'
import { useState } from 'react';
import UpdateUsers from './UpdateUsers';
import useAuth from '../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const username = useSelector(state => state.authSlice.user.username);
  const avatarUrl = useSelector(state => state.authSlice.user.avatarUrl);
  const email = useSelector(state => state.authSlice.user.email);
  const { submitPassword } = useAuth()

  const [ isEditingProfile, setIsEditingProfile ] = useState(false);
  const [ modalContent, setModalContent ] = useState('');
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isSuccess, setIsSuccess ] = useState(false);

  const handlerResetPassword = async () => {
    try {
      await submitPassword({ email });
      setModalContent('Please check your email to reset your password.');
      setIsSuccess(true);
    } catch (error) {
      console.error("Error during password reset:", error);
      setModalContent('There was an error. Please try again.');
      setIsSuccess(false);
    } finally {
      setIsModalOpen(true);
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
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

      {isModalOpen && (
        <div className="modal">
          <div className="modal_content">
            {isSuccess ? (
              <FontAwesomeIcon icon={faCheck} className="icon_success" />
            ) : (
              <FontAwesomeIcon icon={faCircleXmark} className="icon_error" />
            )}
            <span className="close" onClick={closeModal}>&times;</span>
            <p>{modalContent}</p>
          </div>
        </div>
      )}
  </div>
  )
}

export default UserProfile