import { useDispatch } from 'react-redux';
import { hideModal } from '../../store/slices/modal.slice';
import './styles/modal.css';

const Modal = ({ message, type }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <div className="modal_overlay">
      <div className={`modal_container ${type}`}>
        <p>{message}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
