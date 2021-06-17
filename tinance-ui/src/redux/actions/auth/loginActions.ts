// import { history } from "../../../history"
import axios from "axios"
import Cookies from "js-cookie"
import { store } from 'react-notifications-component';
import jwt_decode from "jwt-decode";
import { Root } from "../../../config/rootConfig";

export const loginWithJWT = user => {
  return dispatch => {
    axios.post(Root.serverUrl + "users/signin", user)
      .then(response => {
        if (response.data.status) {
          Cookies.set(Root.token, response.data.data.token, { path: "timeclick" });
          Cookies.set('current_user', response.data.data.user, { path: "timeclick" });
          Cookies.set('company_info', response.data.data.company, { path: "timeclick" });
          // history.push('/');
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

export const setPassword = data => {
  return async dispatch => {
    var response = await axios.post(Root.serverUrl + "users/setPassword", data);
    if (response.data.status) {
      store.addNotification({
        title: "Éxito!",
        message: "La contraseña se estableció correctamente!",
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
      // history.push('/signin');
    } else {
      store.addNotification({
        title: "Error!",
        message: response.data.data,
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
    }
  }
}

export const sessionCheck = () => {
  return dispatch => {
    var token = Cookies.get(Root.token, { path : "timeclick" });
    
    if (token) {
      var userData = Cookies.get('current_user', { path: "timeclick" });
      var companyData = Cookies.get('company_info', { path: "timeclick" });
      userData = jwt_decode(userData);
      companyData = JSON.parse(companyData);

      dispatch({
        type : "JWT_AUTH_LOGIN",
        data : {userData, companyData}
      });
    }
  }
}

export const isSession = () => {
  if (Cookies.get(Root.token, { path: "timeclick" })) {
    return true;
  } else {
    return false;
  }
}

export const logOut = () => {
  Cookies.remove(Root.token, {path : "timeclick"});
  Cookies.remove('current_user', { path: "timeclick" })
  Cookies.remove('company_info', { path: "timeclick" })
  window.location.href = "/"
}


export const addPerson = (data) => {
  return async dispatch => {
      var response = await axios.post(Root.serverUrl + "users/addPerson", data);
      if (response.data.status) {
          dispatch({
              type: "EMPLOYEE_DATA",
              data: response.data.data
          })
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
  }
}

export const updatePerson = (person) => {
  return async dispatch => {
    var response = await axios.post(Root.serverUrl + "users/updatePerson", person);
    if (response.data.status) {
      dispatch({
        type: "EMPLOYEE_DATA",
        data: response.data.data
      })
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
  }
}

export const deletePerson = (person) => {
  return async dispatch => {
      var response = await axios.post(Root.serverUrl + "users/deletePerson", person);
      if (response.data.status) {
          dispatch({
              type: "EMPLOYEE_DATA",
              data: response.data.data
          })
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
  }
}

export const suspendPerson = data => {
  return async dispatch => {
    var response = await axios.post(Root.serverUrl + "users/suspendPerson", data);
    if (response.data.status) {
      dispatch({
        type: "EMPLOYEE_DATA",
        data: response.data.data
      })
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
  }
}

export const loadEmployees = data => {
  return async dispatch => {
      var response = await axios.post(Root.serverUrl + "users/loadEmployees", data);
      if (response.data.status) {
          dispatch({
              type: "EMPLOYEE_DATA",
              data: response.data.data
          })
      } else {
          console.log(response.data.data)
      }
  }
}