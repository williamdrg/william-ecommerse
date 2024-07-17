import { useDispatch, useSelector } from 'react-redux';
import  './styles/cart.css'
import { deleteProductThunk, getCartProductThunk, updateProductQuantity } from '../../store/slices/cart.slice';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { postOrderThunk } from '../../store/slices/order.slice';

const Cart = () => {
  const dispatch = useDispatch()
  const isVisible = useSelector(state => state.toggleCartVisibility);
  const cart = useSelector(store => store.cart)
  const { products } = cart
  useEffect(() => {
    dispatch(getCartProductThunk())
  }, [dispatch])

  const handleRemoveProduct = (productId) => {
    dispatch(deleteProductThunk(productId));
  };

  const handleIncreaseQuantity = (productId, currentQuantity) => {
    dispatch(updateProductQuantity({ productId, quantity: currentQuantity + 1 }));
  };

  const handleDecreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateProductQuantity({ productId, quantity: currentQuantity - 1 }));
    }
  };

  const handleQuantityChange = (productId, value) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity > 0) {
      dispatch(updateProductQuantity({ productId, quantity }));
    }
  };

  const hqandlerPurchased = () => {
    dispatch(postOrderThunk())
  }

  const formatPrice = (price) => {
    const numberPrice = parseFloat(price);
    if (isNaN(numberPrice)) return '0.00';
    const parts = numberPrice.toFixed(2).split('.');
    const formattedIntegerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedIntegerPart},${parts[1]}`;
  };


  return (
    <div className={`cart_container ${isVisible ? 'visible' : ''}`}>
      {/* <div className='close_cart' onClick={toggleMenu}><FontAwesomeIcon icon={faXmark}/></div> */}
      <h2>shopping cart</h2>
      <div className="cart_products_scroll">
        {products ? (
          products.map(product => (
            <div key={product.id} className='cart_prod_container'>
              <div className="cart_item">
                <img src={product.Product.productImage} alt={product.Product.name} className="product_image_cart" />
                <div className='cart_quantity'>
                  <p>{product.Product.name}</p>
                  <div className='btn_quantity'>
                    <button onClick={() => handleDecreaseQuantity(product.Product.id, Number(product.quantity))}>-</button>
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => handleQuantityChange(product.Product.id, e.target.value)}
                      min="1"
                      className='quantity_input'
                    />
                    <button onClick={() => handleIncreaseQuantity(product.Product.id, Number(product.quantity))}>+</button>
                  </div>
                </div>
                  <button  className='btn_delete' onClick={() => handleRemoveProduct(product.Product.id)}><FontAwesomeIcon icon={faTrash}/></button>
              </div>
                <p><span>Total: </span> $ {formatPrice(product.price * product.quantity)}</p>
            </div>
          ))
        ) : (
          <p>There are no products in the cart</p>
        )}
      </div>
      <div className='cart_total_checkout'>
        <div className="total_price"><span>Total: </span><span>$ {formatPrice(cart.totalPrice)}</span></div>
        <button onClick={hqandlerPurchased}>Checkout</button>
      </div>
    </div>
  )
}

export default Cart