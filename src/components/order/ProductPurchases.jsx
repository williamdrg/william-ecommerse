import { useDispatch } from 'react-redux';
import './styles/productPurchases.css';
import { getProductThunk } from '../../store/slices/product.slice';
import { useNavigate } from 'react-router-dom';

const ProductPurchases = ({ product, createdAt }) => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formatPrice = (price) => {
    const numberPrice = parseFloat(price);
    if (isNaN(numberPrice)) return '0.00';
    const parts = numberPrice.toFixed(2).split('.');
    const formattedIntegerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedIntegerPart},${parts[1]}`;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const handleRpductDetails = (id) => {
    dispatch(getProductThunk(id))
    navigate(`/product-details/${id}`)
  }

  return (
    <div className="purchases-container">
      {product?.map(prod => (
        <div onClick={() => handleRpductDetails(prod.Product.id)} className="purchase-item" key={prod.id}>
          <figure>
            <img src={prod.Product.productImage} alt={prod.Product.name} />
          </figure>
          <div className="purchase-details">
            <h3>{prod.Product.name}</h3>
            <p className="purchase-date">{formatDate(createdAt)}</p>
          </div>
          <div className="purchase-quantity-price">
            <p className="purchase-quantity">cantidad: {prod.quantity}</p>
            <p className="purchase-price">$ {formatPrice(prod.price)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductPurchases