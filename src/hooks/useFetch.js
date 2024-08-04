import axios from "axios"
import { useContext, useState } from "react"
import urlBase from "../utils/urlBase.js"
import { LoadingContext } from "../contexts/LoadingContext.jsx"
// import bearerToken from "../utils/bearerToken"

const useFetch = () => {
  const [dataApi, setDataApi] = useState()
  const { setLoad } = useContext(LoadingContext);

  const getDataApi = async (patch) => {
    setLoad(true);
    const url = `${urlBase}${patch}`;
    try {
      const res = await axios.get(url);
      setDataApi(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoad(false);
    }
  };

  return [ dataApi, getDataApi ]
}

export default useFetch