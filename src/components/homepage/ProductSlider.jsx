import { useEffect, useState } from "react";
import './styles/productSlider.css';

const ProductSlider = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products?.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products?.length) % products?.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [products?.length]);

  return (
    <div className="slider">
    <button className="prev" onClick={prevSlide}>❮</button>
    <div className="slider_content">
      <div className="product_info_slider">
        <h2>{products?.[currentIndex]?.name}</h2>
        <p className="slider_description">{`${products?.[currentIndex]?.description}`}</p>
      </div>
      <div className="img_container">
        <img src={products?.[currentIndex]?.productImage} alt={`Slide ${products?.[currentIndex]?.name}`} className="slider_image" />
      </div>
    </div>
    <button className="next" onClick={nextSlide}>❯</button>
  </div>
  );
}

export default ProductSlider;
