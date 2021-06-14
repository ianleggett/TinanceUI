const express = require('express');
const router = express.Router();
const SuperAdminController = require("../controller/SuperAdminController")

router.post('/loadPosition',SuperAdminController.loadPosition);
router.post('/loadDepartment',SuperAdminController.loadDepartment);
router.post('/getCalendarData',SuperAdminController.getCalendarData);
router.post('/getScheduleData',SuperAdminController.getScheduleData);
router.post('/getAgreementsData',SuperAdminController.getAgreementsData);
router.post('/getCenterData',SuperAdminController.getCenterData);
router.post('/getChargeData',SuperAdminController.getChargeData);
router.post('/getEmployeeSkillData',SuperAdminController.getEmployeeSkillData);
router.post('/getEmployeeAttrData',SuperAdminController.getEmployeeAttrData);
router.post('/addPosition',SuperAdminController.addPosition);
router.post('/addDepartment',SuperAdminController.addDepartment);
router.post('/addCalendarData',SuperAdminController.addCalendarData);
router.post('/addScheduleData',SuperAdminController.addScheduleData);
router.post('/addAgreementsData',SuperAdminController.addAgreementsData);
router.post('/addCenterData',SuperAdminController.addCenterData);
router.post('/addChargeData',SuperAdminController.addChargeData);
router.post('/addEmployeeSkillData',SuperAdminController.addEmployeeSkillData);
router.post('/addEmployeeAttrData',SuperAdminController.addEmployeeAttrData);

module.exports = router;