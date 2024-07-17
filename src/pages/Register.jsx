import { useForm } from "react-hook-form"
import './styles/register.css'
import useAuth from "../hooks/useAuth"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
  const { handleSubmit, register, reset, watch, formState: { errors } } = useForm()
  const [ modalContent, setModalContent ] = useState('');
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isSuccess, setIsSuccess ] = useState(false);
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const password = watch('password', '');

  const submit = async data => {
    try {
      await registerUser('/users', data);
      setModalContent('Usuario creado exitosamente');
      setIsSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setModalContent(`Error: ${error.message}`);
      setIsSuccess(false);
    } finally {
      setIsModalOpen(true);
      reset({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }
  };

  return (
    <div>
       <form className="register_form" onSubmit={handleSubmit(submit)}>
       <h2 className="register_title">Register</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input {...register('username')} id="username" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input {...register('email')} id="email" type="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input {...register('password')} id="password" type="password" />
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
        <p className="signin">Already have an acount ? <Link to='/login'>Log in</Link> </p>
      </form>

      {isModalOpen && (
        <div className="modal">
          <div className="modal_content">
            {isSuccess ? (
              <FontAwesomeIcon icon={faCheck} className="icon_success" />
            ) : (
              <FontAwesomeIcon icon={faCircleXmark} className="icon_error" />
            )}
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <p>{modalContent}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Register