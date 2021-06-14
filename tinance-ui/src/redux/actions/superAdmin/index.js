import axios from "axios"
import { store } from 'react-notifications-component';
import { Root } from "../../../config/rootConfig";

export const addPosition = (data) => {
    return async dispatch => {
        var response = await axios.post(Root.serverUrl + "superAdmin/addPosition", data);
        if (response.data.status) {
            dispatch({
                type: "POSITION_DATA",
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

export const loadPosition = () => {
    return async dispatch => {
        var response = await axios.post(Root.serverUrl + "superAdmin/loadPosition");
        if (response.data.status) {
            dispatch({
                type: "POSITION_DATA",
                data: response.data.data
            })
        } else {
            console.log(response.data.data)
        }
    }
}

export const addDepartment = (data) => {
    return async dispatch => {
        var response = await axios.post(Root.serverUrl + "superAdmin/addDepartment", data);
        if (response.data.status) {
            dispatch({
                type: "DEPARTMENT_DATA",
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

export const loadDepartment = () => {
    return async dispatch => {
        var response = await axios.post(Root.serverUrl + "superAdmin/loadDepartment");
        if (response.data.status) {
            dispatch({
                type: "DEPARTMENT_DATA",
                data: response.data.data
            })
        } else {
            console.log(response.data.data)
        }
    }
}

// ****************************************** super admin setting calendar ******************************************

export const addCalendarData = data => {
    return async dispatch => {
        var response = await axios.post(Root.serverUrl + "superAdmin/addCalendarData", data);
        if (response.data.status) {
            dispatch({
                type: "CALENDAR_DATA",
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

export const getCalendarData = () => {
    return async dispatch => {
        var response = await axios.post(Root.serverUrl + "superAdmin/getCalendarData");
        if (response.data.status) {
            dispatch({
                type: "CALENDAR_DATA",
                data: response.data.data
            })
        } else {
            console.log(response.data.data)
        }
    }
}

// ****************************************** super admin setting schedule ******************************************

export const addScheduleData = (data) => {
    return async dispatch => {
        var response = await axios.post(Root.serverUrl + "superAdmin/addScheduleData", data);
        if (response.data.status) {
            dispatch({
                type: "SCHEDULE_DATA",
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

export const getScheduleData = () => {
    return async dispatch => {
        var response = await axios.post(Root.serverUrl + "superAdmin/getScheduleData");
        if (response.data.status) {
            dispatch({
                type: "SCHEDULE_DATA",
                data: response.data.data
            })
        } else {
            console.log(response.data.data)
        }
    }
}

export const addAgreementsData = data => {
    return async dispatch => {
        var response = await axios.post(Root.serverUrl + "superAdmin/addAgreementsData", data);
        if (response.data.status) {
            dispatch({
                type: "AGREEMENTS_DATA",
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

export const getAgreementsData = () => {
    return async dispatch => {
        var response = await axios.post(Root.serverUrl + "superAdmin/getAgreementsData");
        if (response.data.status) {
            dispatch({
                type: "AGREEMENTS_DATA",
                data: response.data.data
            })
        } else {
            console.log(response.data.data);
        }
    }
}

export const addCenterData = data => {
    return async dispatch => {
        var response = await axios.post(Root.serverUrl + "superAdmin/addCenterData", data);
        if (response.data.status) {
            dispatch({
                type: "CENTERS_DATA",
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

export const getCenterData = () => {
    return async dispatch => {
        var response = await axios.post(Root.serverUrl + "superAdmin/getCenterData");
        if (response.data.status) {
            dispatch({
                type: "CENTERS_DATA",
                data: response.data.data
            })
        } else {
            console.log(response.data.data);
        }
    }
}

export const addChargeData = data => {
    return async dispatch => {
        var response = await axios.post(Root.serverUrl + "superAdmin/addChargeData", data);
        if (response.data.status) {
            dispatch({
                type: "CHARGE_DATA",
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

export const getChargeData = () => {
    return async dispatch => {
        var response = await axios.post(Root.serverUrl + "superAdmin/getChargeData");
        if (response.data.status) {
            dispatch({
                type: "CHARGE_DATA",
                data: response.data.data
            })
        } else {
            console.log(response.data.data);
        }
    }
}

export const addEmployeeSkillData = data => {
    return async dispatch => {
        var response = await axios.post(Root.serverUrl + "superAdmin/addEmployeeSkillData", data);
        if (response.data.status) {
            dispatch({
                type: "EMPLOYEE_SKILLS_DATA",
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

export const getEmployeeSkillData = () => {
    return async dispatch => {
        var response = await axios.post(Root.serverUrl + "superAdmin/getEmployeeSkillData");
        if (response.data.status) {
            dispatch({
                type: "EMPLOYEE_SKILLS_DATA",
                data: response.data.data
            })
        } else {
            console.log(response.data.data);
        }
    }
}

export const addEmployeeAttrData = data => {
    return async dispatch => {
        var response = await axios.post(Root.serverUrl + "superAdmin/addEmployeeAttrData", data);
        if (response.data.status) {
            dispatch({
                type: "EMPLOYEE_ATTRS_DATA",
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

export const getEmployeeAttrData = () => {
    return async dispatch => {
        var response = await axios.post(Root.serverUrl + "superAdmin/getEmployeeAttrData");
        if (response.data.status) {
            dispatch({
                type: "EMPLOYEE_ATTRS_DATA",
                data: response.data.data
            })
        } else {
            console.log(response.data.data);
        }
    }
}
