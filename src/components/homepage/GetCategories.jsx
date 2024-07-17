import { useCallback, useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import './styles/getCategories.css'

const GetCategories = ({ setCategory }) => {
  const [categories, getCategories] = useFetch();
  const [ isOpen, setIsOpen ] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
 
  useEffect(() => {
    getCategories("/categories");
  }, []);


  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category) => {
    setCategory(category);
    setActiveCategory(category);
  };

  return (
    <div className="filter_section">
      <div className="filter_header" onClick={toggleOpen}>
        <span>Category</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="filter_content">
          <div className={`category_item ${activeCategory === '' ? 'active' : ''}`} onClick={() => handleCategoryClick('')}>All products</div>
          {categories?.map((category) => (
            <div className={`category_item ${activeCategory === category.id ? 'active' : ''}`} key={category.id} onClick={() => handleCategoryClick(category.id)}>
              {category.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GetCategories