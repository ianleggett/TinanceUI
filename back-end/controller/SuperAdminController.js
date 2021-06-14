const BASECONTROLLER = require('./basecontroller');
const POSITIONMODEL = require('../models/admin_model').position;
const DEPARTMENTMODEL = require('../models/admin_model').department;
const USERMODEL = require("../models/users_model").users;
const CALENDARMODEL = require("../models/admin_model").calendar;
const SCHEDULEMODEL = require("../models/admin_model").schedule;
const AGREEMENTSMODEL = require("../models/admin_model").agreements;
const CENTERSMODEL = require("../models/admin_model").centers;
const CHARGESMODEL = require("../models/admin_model").charges;
const EMPLOYEESKILLSMODEL = require("../models/admin_model").employeeSkills;
const EMPLOYEEATTRSMODEL = require("../models/admin_model").employeeAttrs;

exports.addPosition = async (req, res, next) => {
    var sdata = await BASECONTROLLER.data_save({name: req.body.name, color: req.body.color}, POSITIONMODEL);
    if (sdata) {
        var adata = await BASECONTROLLER.Bfind(POSITIONMODEL, {});
        if (adata) {
            res.json({
                status: true,
                data: adata
            })
            return next();
        } else {
            res.json({
                status: false,
                data: "SERVER ERROR!"
            })
            return next();
        }
    } else {
        res.json({
            status: false,
            data: "Faild! Try again!"
        })
        return next();
    }
}

exports.loadPosition = async (req, res, next) => {
    var adata = await BASECONTROLLER.Bfind(POSITIONMODEL, {});
    if (adata) {
        res.json({
            status: true,
            data: adata
        })
        return next();
    } else {
        res.json({
            status: false,
            data: "SERVER ERROR!"
        })
        return next();
    }
}

exports.loadDepartment = async (req, res, next) => {
    var adata = await BASECONTROLLER.Bfind(DEPARTMENTMODEL, {});
    if (adata) {
        res.json({
            status: true,
            data: adata
        })
        return next();
    } else {
        res.json({
            status: false,
            data: "SERVER ERROR!"
        })
        return next();
    }
}

exports.addDepartment = async (req, res, next) => {
    var sdata = await BASECONTROLLER.data_save({name: req.body.name, parentId: req.body.parentId, color: req.body.color}, DEPARTMENTMODEL);
    if (sdata) {
        var adata = await BASECONTROLLER.Bfind(DEPARTMENTMODEL, {});
        if (adata) {
            res.json({
                status: true,
                data: adata
            })
            return next();
        } else {
            res.json({
                status: false,
                data: "SERVER ERROR!"
            })
            return next();
        }
    } else {
        res.json({
            status: false,
            data: "Faild! Try agin!"
        })
        return next();
    }
}

exports.addCalendarData = async (req, res, next) => {
    var cdata = await BASECONTROLLER.Bfind(CALENDARMODEL, {name: req.body.name});

    if (cdata.length > 0) {
        res.json({
            status: false,
            data: "Name already exits!"
        })
        return next();
    } else {
        var sdata = await BASECONTROLLER.data_save({name: req.body.name, center: req.body.center, country: req.body.country, zipCode: req.body.zipCode, updateChecked: req.body.updateChecked}, CALENDARMODEL)
        if (sdata) {
            var adata = await BASECONTROLLER.Bfind(CALENDARMODEL, {});
            res.json({
                status: true,
                data: adata
            })
            return next();
        } else {
            res.json({
                status: false,
                data: "SERVER ERROR!"
            })
            return next();
        }
    }
}

exports.getCalendarData = async (req, res, next) => {
    var adata = await BASECONTROLLER.Bfind(CALENDARMODEL, {});
    if (adata) {
        res.json({
            status: true,
            data: adata
        })
        return next();
    } else {
        res.json({
            status: false,
            data: "SERVER ERROR!"
        })
        return next();
    }
}

exports.addScheduleData = async (req, res, next) => {
    var cdata = await BASECONTROLLER.Bfind(SCHEDULEMODEL, {name: req.body.name});

    if (cdata.length > 0) {
        res.json({
            status: false,
            data: "Name already exists!"
        })
        return next();
    } else {
        var sdata = await BASECONTROLLER.data_save({name: req.body.name, center: req.body.center, originSchedule: req.body.originSchedule}, SCHEDULEMODEL)
        if (sdata) {
            var adata = await BASECONTROLLER.Bfind(SCHEDULEMODEL, {});
            res.json({
                status: true,
                data: adata
            })
            return next();
        } else {
            res.json({
                status: false,
                data: "SERVER ERROR!"
            })
        }
    }
}

exports.getScheduleData = async (req, res, next) => {
    var adata = await BASECONTROLLER.Bfind(SCHEDULEMODEL, {});
    if (adata) {
        res.json({
            status: true,
            data: adata
        })
        return next();
    } else {
        res.json({
            status: false,
            data: "SERVER ERROR!"
        })
        return next();
    }
}

exports.addAgreementsData = async (req, res, next) => {
    var cdata = await BASECONTROLLER.Bfind(AGREEMENTSMODEL, {name: req.body.name});
    if (cdata.length > 0) {
        res.json({
            status: false,
            data: "Name already exists!"
        })
        return next();
    } else {
        var sdata = await BASECONTROLLER.data_save({name: req.body.name, center: req.body.center, originAgreements: req.body.originAgreements, dayType: req.body.dayType, yearEndDay: req.body.yearEndDay, yearHours: req.body.yearHours, nightHour: req.body.isNightWork}, AGREEMENTSMODEL);
        if (sdata) {
            var adata = await BASECONTROLLER.Bfind(AGREEMENTSMODEL, {});
            res.json({
                status: true,
                data: adata
            })
            return next();
        } else {
            res.json({
                status: false,
                data: "SERVER ERROR!"
            })
            return next();
        }
    }
}

exports.getAgreementsData = async (req, res, next) => {
    var adata = await BASECONTROLLER.Bfind(AGREEMENTSMODEL, {});
    if (adata) {
        res.json({
            status: true,
            data: adata
        })
        return next();
    } else {
        res.json({
            status: false,
            data: "SERVER ERROR!"
        })
        return next();
    }
}

exports.addCenterData = async (req, res, next) => {
    var { name, schedule, timezone, centerIP, notTransferIP, notTransferLocation, latitude, longtitude, distance } = req.body;
    var cdata = await BASECONTROLLER.Bfind(CENTERSMODEL, {name});
    if (cdata.length > 0) {
        res.json({
            status: false,
            data: "Name already exists!"
        })
        return next();
    } else {
        var sdata = await BASECONTROLLER.data_save({ name, schedule, timezone, centerIP, notTransferIP, notTransferLocation, latitude, longtitude, distance }, CENTERSMODEL);
        if (sdata) {
            var adata = await BASECONTROLLER.Bfind(CENTERSMODEL, {});
            res.json({
                status: true,
                data: adata
            })
            return next();
        } else {
            res.json({
                status: false,
                data: "SERVER ERROR!"
            })
            return next();
        }
    }
}

exports.getCenterData = async (req, res, next) => {
    var adata = await BASECONTROLLER.Bfind(CENTERSMODEL, {});
    if (adata) {
        res.json({
            status: true,
            data: adata
        })
        return next();
    } else {
        res.json({
            status: false,
            data: "SERVER ERROR!"
        })
        return next();
    }
}

exports.addChargeData = async (req, res, next) => {
    var { name, color } = req.body;
    var cdata = await BASECONTROLLER.Bfind(CHARGESMODEL, {name});
    if (cdata.length > 0) {
        res.json({
            status: false,
            data: "Name already exists!"
        })
        return next();
    } else {
        var sdata = await BASECONTROLLER.data_save({ name, color }, CHARGESMODEL);
        if (sdata) {
            var adata = await BASECONTROLLER.Bfind(CHARGESMODEL, {});
            res.json({
                status: true,
                data: adata
            })
            return next();
        } else {
            res.json({
                status: false,
                data: "SERVER ERROR!"
            })
            return next();
        }
    }
}

exports.getChargeData = async (req, res, next) => {
    var adata = await BASECONTROLLER.Bfind(CHARGESMODEL, {});
    if (adata) {
        res.json({
            status: true,
            data: adata
        })
        return next();
    } else {
        res.json({
            status: false,
            data: "SERVER ERROR!"
        })
        return next();
    }
}

exports.addEmployeeSkillData = async (req, res, next) => {
    var { name } = req.body;
    var cdata = await BASECONTROLLER.Bfind(EMPLOYEESKILLSMODEL, {name});
    if (cdata.length > 0) {
        res.json({
            status: false,
            data: "Name already exists!"
        })
        return next();
    } else {
        var sdata = await BASECONTROLLER.data_save({ name }, EMPLOYEESKILLSMODEL);
        if (sdata) {
            var adata = await BASECONTROLLER.Bfind(EMPLOYEESKILLSMODEL, {});
            res.json({
                status: true,
                data: adata
            })
            return next();
        } else {
            res.json({
                status: false,
                data: "SERVER ERROR!"
            })
            return next();
        }
    }
}

exports.getEmployeeSkillData = async (req, res, next) => {
    var adata = await BASECONTROLLER.Bfind(EMPLOYEESKILLSMODEL, {});
    if (adata) {
        res.json({
            status: true,
            data: adata
        })
        return next();
    } else {
        res.json({
            status: false,
            data: "SERVER ERROR!"
        })
        return next();
    }
}

exports.addEmployeeAttrData = async (req, res, next) => {
    var { name } = req.body;
    var cdata = await BASECONTROLLER.Bfind(EMPLOYEEATTRSMODEL, {name});
    if (cdata.length > 0) {
        res.json({
            status: false,
            data: "Name already exists!"
        })
        return next();
    } else {
        var sdata = await BASECONTROLLER.data_save({ name }, EMPLOYEEATTRSMODEL);
        if (sdata) {
            var adata = await BASECONTROLLER.Bfind(EMPLOYEEATTRSMODEL, {});
            res.json({
                status: true,
                data: adata
            })
            return next();
        } else {
            res.json({
                status: false,
                data: "SERVER ERROR!"
            })
            return next();
        }
    }
}

exports.getEmployeeAttrData = async (req, res, next) => {
    var adata = await BASECONTROLLER.Bfind(EMPLOYEEATTRSMODEL, {});
    if (adata) {
        res.json({
            status: true,
            data: adata
        })
        return next();
    } else {
        res.json({
            status: false,
            data: "SERVER ERROR!"
        })
        return next();
    }
}