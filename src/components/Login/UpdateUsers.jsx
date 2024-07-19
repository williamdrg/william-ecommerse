import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk } from "../../store/slices/auth.slice";
import Modal from "../shared/Modal";



const UpdateUsers = ({ setIsEditingProfile }) => {
  const { handleSubmit, register, reset, setValue } = useForm()
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modal);
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
    setIsEditingProfile(false);
    reset({
      username: user.username,
      avatar: ''
    });
  };

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
      {modalState.isVisible && <Modal message={modalState.message} type={modalState.type} />}
    </div>
  )
}

export default UpdateUsers