import axios from "axios"
import { useState } from "react"
import urlBase from "../utils/urlBase"
import { setLoading } from "../store/slices/loader.slice"
import { useDispatch } from "react-redux"
// import bearerToken from "../utils/bearerToken"

const useFetch = () => {
  const [dataApi, setDataApi] = useState()
  const dispatch = useDispatch()


  const getDataApi = async (patch) => {
    dispatch(setLoading(true));
    const url = `${urlBase}${patch}`;
    try {
      const res = await axios.get(url);
      setDataApi(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return [ dataApi, getDataApi ]
}

export default useFetch