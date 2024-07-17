import { useForm } from "react-hook-form"
import './styles/pricefilters.css'
import { useState } from "react";

const PriceFilters = ({setFilterprice}) => {

  const { handleSubmit, register } = useForm()
  const [ isOpen, setIsOpen ] = useState(true);

  const submit = (data) => {
    setFilterprice({
      min: data.min,
      max: data.max || Infinity
    })
  }
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={toggleOpen} className="title_filterprice">
        <h3>Price</h3>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      <div className="line_filterprice"></div>
     {
      isOpen && 
    <form className="filterprice" onSubmit={handleSubmit(submit)}>
      <div className="filter_min">
        <label htmlFor="min">Min</label>
        <input {...register('min')} id="min" type="number" />
      </div>
      <div className="filter_max">
        <label htmlFor="max">Max</label>
        <input {...register('max')} id="max" type="number" />
      </div>
      <button>Filter price</button>
    </form>
     }
    </div>
  )
}

export default PriceFilters