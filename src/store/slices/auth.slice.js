import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import bearerToken from "../../utils/bearerToken";
import urlBase from "../../utils/urlBase";
import { jwtDecode } from "jwt-decode";
import { setLoading } from "./loader.slice";
import { showModal } from "./modal.slice";

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, token: null, user: {
    id: null,
    username: '',
    email: '',
    avatarUrl: '',
  }},
  reducers: {
    login: (state, action) => {
      const token = action.payload;
      const decoded = jwtDecode(token);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', decoded.id);

      state.isAuthenticated = true;
      state.token = token;
      state.user.id = decoded.id;

      state.user.username = decoded.username;
      state.user.email = decoded.email;
      state.user.avatarUrl = decoded.avatarUrl;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      state.isAuthenticated = false;
      state.token = null;
      state.user = { id: null, username: '', email: '', avatarUrl: '' };
    },
    setUserDetails: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    updateUserDetails: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    }
  }
})

export const { login, logout, setUserDetails, updateUserDetails } = authSlice.actions

export default authSlice.reducer


export const checkTokenExpiration = () => dispatch => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      dispatch(logout());
    } else {
      dispatch(setUserDetails({
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        avatarUrl: decoded.avatarUrl
      }));
    }
  }
};

export const initializeAuth = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        dispatch(logout());
      } else {
        dispatch(login(token));
        await dispatch(getUserThunk(decoded.id));
      }
    }
  } finally {
    dispatch(setLoading(false));
  }
};

export const getUserThunk = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const url = `${urlBase}/user/${id}`;
    const res = await axios.get(url);
    const userData = {
      ...res.data,
      avatarUrl: res.data.avatar
    };
    delete userData.avatar;
    dispatch(setUserDetails(userData));
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateUserThunk = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const url = `${urlBase}/update/users`;
    const res = await axios.put(url, data, bearerToken());
    dispatch(updateUserDetails(res.data.user));
    dispatch(showModal({ message: 'User updated successfully', type: 'success' }));
  } catch (err) {
    console.error(err);
    dispatch(showModal({ message: `Error: ${err.message}`, type: 'error' }));
  } finally {
    dispatch(setLoading(false));
  }
};