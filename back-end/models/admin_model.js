const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var date = new Date();

const position = () => {
    var UserSchema = new Schema({
        name : { type : String, default : ""},
        color : { type : String, default : ""},
    });
    return mongoose.model('positions', UserSchema)
}

const department = () => {
    var UserSchema = new Schema({
        name : { type : String, default : ""},
        parentId : { type : String, default : ""},
        color : { type : String, default : ""},
    });
    return mongoose.model('departments', UserSchema)
}

const calendar = () => {
    var UserSchema = new Schema({
        name : { type : String, default : "" },
        center : { type : String, default : "" },
        country : { type : String, default : "" },
        zipCode : { type : String, default : "" },
        updateChecked : { type : Boolean, default : false },
    });
    return mongoose.model('calendar', UserSchema)
}

const schedule = () => {
    var UserSchema = new Schema({
        name : { type : String, default : "" },
        center : { type : String, default : "" },
        originSchedule : { type : String, default : "" },
    });
    return mongoose.model('schedule', UserSchema)
}

const agreements = () => {
    var UserSchema = new Schema({
        name : { type : String, default : "" },
        center : { type : String, default : "" },
        originAgreements : { type : String, default : "" },
        dayType : { type : String, default : "" },
        yearEndDay : { type : String, default : "" },
        yearHours : { type : String, default : "" },
        nightHour : { type : String, default : "" },
    });
    return mongoose.model('agreements', UserSchema)
}

const centers = () => {
    var UserSchema = new Schema({
        name : { type : String, default : "" },
        schedule : { type : String, default : "" },
        timezone : { type : String, default : "" },
        centerIP : { type : String, default : "" },
        notTransferIP : { type : Boolean, default : false },
        notTransferLocation : { type : Boolean, default : false },
        latitude : { type : Number, default : 0 },
        longtitude : { type : Number, default : 0 },
        distance : { type : Number, default : 0 },
    });
    return mongoose.model('centers', UserSchema)
}

const charges = () => {
    var UserSchema = new Schema({
        name : { type : String, default : "" },
        color : { type : String, default : "" },
    });
    return mongoose.model('charges', UserSchema)
}

const employeeSkills = () => {
    var UserSchema = new Schema({
        name : { type : String, default : "" }
    });
    return mongoose.model('employeeSkills', UserSchema)
}

const employeeAttrs = () => {
    var UserSchema = new Schema({
        name : { type : String, default : "" }
    });
    return mongoose.model('employeeAttrs', UserSchema)
}

module.exports = {
    position: position(),
    department: department(),
    calendar: calendar(),
    schedule: schedule(),
    agreements: agreements(),
    centers: centers(),
    charges: charges(),
    employeeSkills: employeeSkills(),
    employeeAttrs: employeeAttrs(),
}