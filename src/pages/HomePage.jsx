import { useEffect, useState } from "react"
import Products from "../components/homepage/Products"
import './styles/homepage.css'
import PriceFilters from "../components/homepage/PriceFilters"
import useFetch from "../hooks/useFetch"
import InputSearch from "../components/homepage/InputSearch"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons"
import GetCategories from "../components/homepage/GetCategories"
import ProductSlider from "../components/homepage/ProductSlider"


const HomePage = () => {

  const [ products, getProducts ] = useFetch()
  const [ filterPrice, setFilterprice ] = useState({min: 0,max: Infinity })
  const [ inputValue, setInputValue ] = useState('')
  const [ isSidebarVisible, setIsSidebarVisible ] = useState(false)
  const [ category, setCategory ] = useState()

  useEffect(() => {
    getProducts('/productAvaible')
  },[])

  const filtersproducts = (prod) => {
    const price = Number(prod.price) <= Number(filterPrice.max) && Number(prod.price) >= Number(filterPrice.min)
    const name = prod.name.toLowerCase().includes(inputValue)
    const categoryMatch = !category || category === '' || Number(prod.categoryId) === Number(category);
    return name && price && categoryMatch;
  }
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible)
  }

  return (
    <div className="homepage">
      <div className={`sidebar_container ${isSidebarVisible ? 'visible' : ''}`}>
        <div onClick={toggleSidebar} className={`close_sidebar ${isSidebarVisible ? 'visible' : ''}`}><FontAwesomeIcon icon={faXmark}/></div>
        <PriceFilters setFilterprice={setFilterprice}/>
        <GetCategories setCategory={setCategory}/>
      </div>
      <div className="conainter_cards">
        <InputSearch setInputValue={setInputValue} products={products}/>
      <div className="slider_container">
        <ProductSlider products={products}/>
      </div>
      <div className="filter_icon"><span onClick={toggleSidebar}><FontAwesomeIcon icon={faFilter}/> Filters</span></div>
        <div className="products_container">
        {
          products?.filter(filtersproducts).map(product => (
            <Products key={product.id}
              product={product}
            />
          ))
        }
        </div>
      </div>
    </div>
  )
}

export default HomePage