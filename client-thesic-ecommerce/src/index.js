import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import appReducers from './redux/reducers/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ToastContainer } from 'react-toastify';
import 'nprogress/nprogress.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

const store = createStore(appReducers, composeWithDevTools(
  applyMiddleware(thunk)
));
const CLIENT_ID = '532996168508-gpclb9gma2oc0eseuv3vfqil8pkcrucl.apps.googleusercontent.com';
ReactDOM.render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
   <Provider store={store}>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={1700}
      pauseOnHover={false}
      pauseOnVisibilityChange={false}
    />
  </Provider>,
</GoogleOAuthProvider>,
 
  document.getElementById('root'));
