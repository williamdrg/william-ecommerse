import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import './styles/inputsearch.css'

const InputSearch = ({ setInputValue, products }) => {
  const textInput = useRef()
  const suggestionsContainerRef = useRef()
  const [ suggestions, setSuggestions ] = useState([]);

  useEffect(() => {
    setSuggestions([]);
  }, []);

  const handleChange = () => {
    const value = textInput.current.value.trim().toLowerCase()
    if (value.length > 0) {
      const filteredSuggestions = products.filter(product =>
        product.name.toLowerCase().includes(value)
      )
      setSuggestions(filteredSuggestions)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion) => {
    textInput.current.value = suggestion.name
    setSuggestions([])
  }

  const handleSearchClick = () => {
    let value = textInput.current.value.trim().toLowerCase()
    setInputValue(value)
    value = ''
  }

  const handleClickOutside = (event) => {
    if (
      suggestionsContainerRef.current &&
      !suggestionsContainerRef.current.contains(event.target) &&
      !textInput.current.contains(event.target)
    ) {
      setSuggestions([])
      textInput.current.value = ''
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <div className="search_product_container">
      <input ref={textInput} type="text" onChange={handleChange} />
      <button onClick={handleSearchClick}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
      {suggestions.length > 0 && (
        <div ref={suggestionsContainerRef} className="suggestions_container">
          {suggestions.map(suggestion => (
            <div 
              key={suggestion.id}
              className="suggestion"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default InputSearch