import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getProductThunk } from "../store/slices/product.slice"
import './styles/productDetails.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping, faHouse } from "@fortawesome/free-solid-svg-icons"
import { postProductThunk } from "../store/slices/cart.slice"

const ProductDetails = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(store => store.product);
  const [ quantity, setQuantity ] = useState(1);

  const formatPrice = (price) => {
    const numberPrice = parseFloat(price);
    if (isNaN(numberPrice)) return '0.00';
    const parts = numberPrice.toFixed(2).split('.');
    const formattedIntegerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedIntegerPart},${parts[1]}`;
  };

  useEffect(() => {
    dispatch(getProductThunk(id));
  }, [dispatch, id]);

  const handleIncreaseQuantity = () => {
    if (quantity < product.availableQty) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= product.availableQty) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
      dispatch(postProductThunk({
        'quantity': quantity, 
        'productId': product.id
      }))
      setQuantity(1);
  };

  return (
    <div className="product_details_container">
      <div className="back_home"><Link to='/'>Home <span><FontAwesomeIcon icon={faHouse}/></span></Link></div>
      {product ? (
        <div className="product_details">
          <img src={product.productImage} alt={product.name} className="product_det_image" />
          <div className="product_det_info">
            <h1 className="product_det_name">{product.name}</h1>
            <p className="product_det_description">{product.description}</p>
            <p className="product_det_aviablequantity">Cantidad disponible: {product.availableQty}</p>
            <div className="quantity_det_controls">
            <p className="product_det_price"><span>Precio: </span><span>$ {formatPrice(product.price)}</span></p>
              <div className="btn_det_quantity">
                <label>Cantidad</label>
                <button onClick={handleDecreaseQuantity}>-</button>
                <input type="number" min='1' value={quantity}  onChange={handleQuantityChange} />
                <button onClick={handleIncreaseQuantity}>+</button>
              </div>
            </div>
            <button className="det_add_to_cart" onClick={handleAddToCart}><FontAwesomeIcon icon={faCartShopping}/> Añadir al carrito</button>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  )
}

export default ProductDetails