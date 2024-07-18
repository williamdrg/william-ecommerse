import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  './styles/navbar.css'
import { faCartShopping, faRightFromBracket, faShop, faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/auth.slice';
import { Link, useNavigate } from "react-router-dom"
import { setIsCartVisible } from '../../store/slices/isVisibleCart.slice';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.authSlice.isAuthenticated);
  const username = useSelector(state => state.authSlice.user.username);
  const avatarUrl = useSelector(state => state.authSlice.user.avatarUrl);
  const isCartVisible = useSelector(state => state.toggleCartVisibility);
  const cart = useSelector(state => state.cart);

  const [ totalItems, setTotalItems ] = useState(0);
  const [ menuOpen, setMenuOpen ] = useState(false);
  const [ closeQuantityCart, setCloseQuantitCart ] = useState(false)
 
  useEffect(() => {
    setTotalItems(cart.products ? cart.products.length : 0);
  }, [cart.products]);

  const toggleCartVisibility = () => {
    dispatch(setIsCartVisible(!isCartVisible));
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handlerLogout = () => {
    dispatch(logout())
    setMenuOpen(false)
    setCloseQuantitCart(!closeQuantityCart)
  }

  return (
    <header className="header">
      <Link to='/'><h1>e-commerce</h1></Link>
      <button className="menu-button" onClick={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        </svg>
      </button>
      <div className={`btn_container ${menuOpen ? 'open' : ''}`}>
        {
          isAuthenticated ? (
            <>
              <h3>{username}</h3>
              <Link to='/login'>
                <img className='user_image' src={avatarUrl || "https://st2.depositphotos.com/3895623/5589/v/450/depositphotos_55896913-stock-illustration-usershirt.jpg"}  alt="user-image" />
              </Link>
              <div className='btn_logout' onClick={handlerLogout}><FontAwesomeIcon icon={faRightFromBracket}/></div>
            </>
          ) :
          <div onClick={toggleMenu} className='btn_user'><Link to='/login'><FontAwesomeIcon icon={faUser} /></Link></div>
        }
          <div onClick={toggleMenu} className='btn_purchase'><Link to='/order'><FontAwesomeIcon icon={faShop}/></Link></div>
          <div className='btn_cart' onClick={toggleCartVisibility}><FontAwesomeIcon icon={faCartShopping}/>{Number(totalItems) > 0 && <span className={`cart_count ${closeQuantityCart ? 'cart_count_close' : ''}`}>{totalItems}</span>}</div>
      </div>
    </header>
  )
}

export default Navbar