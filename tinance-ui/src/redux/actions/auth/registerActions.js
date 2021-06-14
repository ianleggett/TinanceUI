import { history } from "../../../history"
import axios from "axios"
// import Cookies from "js-cookie"
import { store } from 'react-notifications-component';
import { Root } from '../../../config/rootConfig';

export const signupWithJWT = (user) => {
  return dispatch => {
    axios.post(Root.serverUrl + "users/signup", user)
    .then(response => {
      if (response.data.status) {
        store.addNotification({
          title: "Success!",
          message: "Hemos enviado un correo a " + response.data.data.user.email + ". Revisa tu bandeja de entrada y confirma tu dirección para activar tu cuenta!",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__lightSpeedInRight"],
          animationOut: ["animate__animated", "animate__lightSpeedOutRight"],
          dismiss: {
              duration: 5000,
              onScreen: true,
              pauseOnHover: true,
              showIcon : true
          }
        });
        // Cookies.set(Root.token, response.data.data.token, { path: "timeclick" });
        // Cookies.set('current_user', response.data.data.user, { path: "timeclick" });
        // Cookies.set('company_info', response.data.data.company, { path: "timeclick" });
        history.push('/signin');
      } else {
        store.addNotification({
          title: "Error!",
          message: response.data.data,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__lightSpeedInRight"],
          animationOut: ["animate__animated", "animate__lightSpeedOutRight"],
          dismiss: {
              duration: 5000,
              onScreen: true,
              pauseOnHover: true,
              showIcon : true
          }
        });
      }
    })
  }
}