import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOrderThunk } from "../store/slices/order.slice"
import ProductPurchases from "../components/order/ProductPurchases"
import './styles/order.css'

const Order = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrderThunk())
  },[dispatch])

  const order = useSelector(store => store.order)
 
  return (
    <div className="main-purchases-container">
    <h2>My purchases</h2>
    <div className="purchases-list">
      {order?.map(prod => (
        <ProductPurchases 
          key={prod.id} 
          product={prod.ProductInOrders}
          createdAt={prod.createdAt}
        />
      ))}
    </div>
  </div>
  )
}

export default Order