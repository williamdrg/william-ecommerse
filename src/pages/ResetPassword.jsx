import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, showModal } from "../store/slices/modal.slice";
import Modal from "../components/shared/Modal";


const ResetPassword = () => {
  const { handleSubmit, register, reset, watch, formState: { errors } } = useForm()
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword, error } = useAuth();
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modal);

  const token = searchParams.get('token');
  const password = watch('password', '');

  const submit = async data => {
    const payload = {
      token,
      newPassword: data.password,
    };

    try {
      const response = await resetPassword(payload);
      dispatch(showModal({ message: response.message || "Password updated successfully.", type: 'success' }));
    } catch (error) {
      console.error("Error updating password:", error);
      dispatch(showModal({ message: "There was an error updating your password.", type: 'error' }));
    } finally {
      reset({
        password: '',
        confirmPassword: '',
      });
    }
  };

  const closeModal = () => {
    dispatch(hideModal());
    if (modalState.type === 'success') {
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
        {modalState.isVisible && <Modal message={modalState.message} type={modalState.type} onClose={closeModal} />}
    </div>
  )
}

export default ResetPassword