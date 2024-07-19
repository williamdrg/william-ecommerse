import { useForm } from "react-hook-form"
import './styles/register.css'
import useAuth from "../hooks/useAuth"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { hideModal, showModal } from "../store/slices/modal.slice"
import Modal from "../components/shared/Modal"

const Register = () => {
  const { handleSubmit, register, reset, watch, formState: { errors } } = useForm()
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modal = useSelector(state => state.modal);

  const password = watch('password', '');

  const submit = async data => {
    try {
      await registerUser('/users', data);
      dispatch(showModal({ message: 'Usuario creado exitosamente', type: 'success' }));
      setTimeout(() => {
        navigate('/login');
        dispatch(hideModal());
      }, 3000);
    } catch (error) {
      dispatch(showModal({ message: `Error: ${error.message}`, type: 'error' }));
    } finally {
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
      {modal.isVisible && <Modal message={modal.message} type={modal.type} />}
    </div>
  )
}

export default Register