import axios from "axios"
import { useState } from "react"
import urlBase from "../utils/urlBase.js"
import { useDispatch  } from "react-redux"
import { setLoading } from "../store/slices/loader.slice.js"

const useFetch = () => {
  const [dataApi, setDataApi] = useState()
  const dispatch = useDispatch()

  const getDataApi = (patch) => {
    dispatch(setLoading(true));
    const url = `${urlBase}${patch}`
    axios.get(url)
    .then(res => {
        setDataApi(res.data);
      })
    .catch(err => console.error(err))
    .finally(() => dispatch(setLoading(false)))
  };
  
  return [ dataApi, getDataApi ]
}

export default useFetch