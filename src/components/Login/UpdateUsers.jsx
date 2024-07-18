import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk } from "../../store/slices/auth.slice";



const UpdateUsers = ({ setIsEditingProfile }) => {
  const { handleSubmit, register, reset, setValue } = useForm()
  const [ modalContent, setModalContent ] = useState('');
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isSuccess, setIsSuccess ] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(state => state.authSlice.user);

  useEffect(() => {
    setValue('username', user.username);
  }, [user, setValue]);

  const submit = async (data) => {
    const formData = new FormData();
    formData.append('username', data.username || user.username);
    if (data.avatar && data.avatar.length > 0) {
      formData.append('avatar', data.avatar[0]);
    }
    await dispatch(updateUserThunk(formData));
    setModalContent('User updated successfully');
    setIsSuccess(true);
    setIsModalOpen(true);
    reset({
      username: user.username,
      avatar: ''
    });
    setIsEditingProfile(false)
  };

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return (
    <div>
      <form className="register_form update_container" onSubmit={handleSubmit(submit)}>
        <h2 className="register_title">Update User</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input {...register('username')} id="username" type="text" />
        </div>
        <div>
          <label htmlFor="avatar">Imagen</label>
          <input {...register('avatar')} id="avatar" type="file" />
        </div>
        <button>Submit</button>
      </form>

    {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {isSuccess ? (
              <FontAwesomeIcon icon={faCheck} className="icon-success" />
            ) : (
              <FontAwesomeIcon icon={faCircleXmark} className="icon-error" />
            )}
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <p>{modalContent}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateUsers