export const superAdmin = (state = {},action) => {
    switch (action.type) {
      case "POSITION_DATA": {
        return { ...state, positionData : action.data }
      }
      case "DEPARTMENT_DATA": {
        return { ...state, departmentData : action.data }
      }
      case "EMPLOYEE_DATA": {
        return { ...state, employees : action.data }
      }
      case "CALENDAR_DATA": {
        return { ...state, calendarData : action.data }
      }
      case "SCHEDULE_DATA": {
        return { ...state, scheduleData : action.data }
      }
      case "AGREEMENTS_DATA": {
        return { ...state, agreementsData : action.data }
      }
      case "CENTERS_DATA": {
        return { ...state, centersData : action.data }
      }
      case "CHARGE_DATA": {
        return { ...state, chargesData : action.data }
      }
      case "EMPLOYEE_SKILLS_DATA": {
        return { ...state, employeeSkillsData : action.data }
      }
      case "EMPLOYEE_ATTRS_DATA": {
        return { ...state, employeeAttrsData : action.data }
      }
      default: {
        return state
      }
    }
}
  