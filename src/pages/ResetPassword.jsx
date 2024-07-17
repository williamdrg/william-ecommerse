import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";


const ResetPassword = () => {
  const { handleSubmit, register, reset, watch, formState: { errors } } = useForm()
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword, error } = useAuth();
  const [ modalContent, setModalContent ] = useState('');
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isSuccess, setIsSuccess ] = useState(false);

  const token = searchParams.get('token');
  const password = watch('password', '');

  const submit = async data => {
    const payload = {
      token,
      newPassword: data.password,
    };

    try {
      const response = await resetPassword(payload);
      setModalContent(response.message || "Password updated successfully.");
      setIsSuccess(true);
    } catch (error) {
      console.error("Error updating password:", error);
      setModalContent("There was an error updating your password.");
      setIsSuccess(false);
    } finally {
      setIsModalOpen(true);
      reset({
        password: '',
        confirmPassword: '',
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (isSuccess) {
      navigate('/login');
    }
  };

  return (
    <div>
      <form className="register_form" onSubmit={handleSubmit(submit)}>
        <h2 className="register_title">Reset Password</h2>
          <div>
            <label htmlFor="password">Password</label>
            <input {...register('password')} id="password" type="password" />
            {errors.password && <p className="error">Password is required</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              {...register('confirmPassword', {
                required: true,
                validate: value => value === password || 'Passwords do not match'
              })}
              id="confirmPassword"
              type="password"
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
          </div>
          <button>Submit</button>
          {error && <p className="error">{error}</p>}
        </form>

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

export default ResetPassword