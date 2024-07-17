import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import bearerToken from "../../utils/bearerToken";
import urlBase from "../../utils/urlBase";
import { jwtDecode } from "jwt-decode";

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, token: null, user: {
    id: null,
    username: '',
    email: '',
    avatarUrl: ''
  },
  isLoading: true },
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
    },
    updateUserDetails: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
})

export const { login, logout, setUserDetails, updateUserDetails, setLoading } = authSlice.actions

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

export const initializeAuth = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      dispatch(logout());
    } else {
      dispatch(login(token));
      dispatch(getUserThunk(decoded.id));
    }
  }
  dispatch(setLoading(false));
};

export const getUserThunk = (id) => async (dispatch) => {
  const url = `${urlBase}/user/${id}`
  await axios.get(url)
    .then((res) => {
      const userData = {
        ...res.data,
        avatarUrl: res.data.avatar
      };
      delete userData.avatar;
      dispatch(setUserDetails(userData))
    })
    .catch((err) => console.error(err))
}

export const updateUserThunk = (data) => async (dispatch) => {
  const url = `${urlBase}/update/users`;
  await axios.put(url, data, bearerToken())
    .then((res) => {
      dispatch(updateUserDetails(res.data.user));
    })
    .catch((err) => console.error(err));
};