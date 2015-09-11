var {mark}             = require('cdeio/mark');

var {Boolean} = java.lang;
var {Date}    = java.util;

var {EmployeeInfo}  = com.zyeeda.business.employee.entity;

exports.createService = function() {
  return{
    employeeLeave: mark('managers', EmployeeInfo).mark('tx').on(function(employeeInfoMgr, data) {
      employeeInfo = employeeInfoMgr.find(data.employeeInfoId);
      employeeInfo.whetherLeaved = true;
      employeeInfo.leaveDate = new Date(data.leaveDate.replace(/-/g,   "/"));
      employeeInfo.leaveProve = new Boolean(data.leaveProve);
      employeeInfo.leaveReason = data.leaveReason;
      employeeInfo.whetherLeaved = true;
    })
  }
};
