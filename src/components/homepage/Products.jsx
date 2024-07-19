import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles/products.css';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { postProductThunk } from '../../store/slices/cart.slice';
import { getProductThunk } from '../../store/slices/product.slice';
import { useNavigate } from 'react-router-dom';
import Loader from '../shared/Loader';

const Products = ({ product }) => {
  const {
    availableQty,
    description,
    name,
    price,
    productImage,
    status
  } = product;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(state => state.authSlice.isAuthenticated);

  const handleAddCart = () => {
    if (isAuthenticated) {
      dispatch(postProductThunk({
        'quantity': 1, 
        'productId': product.id
      }))
    } else {
      navigate('/login')
    }
  }

  const handleRpductDetails = () => {
    dispatch(getProductThunk(product.id))
    navigate(`/product-details/${product.id}`)
  }

  const formatPrice = (price) => {
    const numberPrice = parseFloat(price);
    if (isNaN(numberPrice)) return '0.00';
    const parts = numberPrice.toFixed(2).split('.');
    const formattedIntegerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedIntegerPart},${parts[1]}`;
  };
  
  return (
    <div className="product_card">
      <div className="product_header">
        <img onClick={handleRpductDetails} src={productImage} alt={name} className="product_image" />
      </div>
      <div className="product_body">
        <div className='product_name_container'>
          <h2 className="product_name">{name}</h2>
          <div className="product_status">{status === "disponible" ? "AVAILABLE" : "OUT OF STOCK"}</div>
        </div>
            <div className="product_description">{description}</div>
            <div className="product_quantity">
              <span>Available Quantity:</span> {availableQty}
            </div>
        <div className='cart_price_container'>
          <div className="product_price">
            <p>{formatPrice(price)}</p>
            <div></div>
          </div>
          <button onClick={handleAddCart}
            className="add_to_cart_button" 
            disabled={status !== "disponible"}
          >
            <FontAwesomeIcon icon={faCartShopping}/>
          </button>
          <button onClick={handleRpductDetails} className="btn_details">Product Detail</button>
        </div>
      </div>
    </div>
  )
}

export default Products