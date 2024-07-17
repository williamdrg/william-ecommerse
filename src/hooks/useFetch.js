import axios from "axios"
import { useState } from "react"
import urlBase from "../utils/urlBase"
// import bearerToken from "../utils/bearerToken"

const useFetch = () => {
  const [dataApi, setdataApi] = useState()
  // const [message, setMessate] = useState()


  const getDataApi = async (patch) => {
    const url = `${urlBase}${patch}`
   await axios.get(url)
      .then(res => setdataApi(res.data))
      .catch(err => console.error(err))
  }

  return [ dataApi, getDataApi ]
}

export default useFetch