import './styles/loader.css'

const Loader = () => {
  return (
    <div className='loader_container'>
      <figure className="loader">
        <div className="dot white"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </figure>
    </div>
  )
}

export default Loader