var {mark}               = require('cdeio/mark');

var {Boolean}            = java.lang;
var {Date}               = java.util;
var {SimpleDateFormat}   = java.text;

var {EmployeeInfo}  = com.zyeeda.business.employee.entity;

exports.createService = function() {
  return{
    employeeLeave: mark('managers', EmployeeInfo).mark('tx').on(function(employeeInfoMgr, data) {
      var date = new Date(),
          sd = new SimpleDateFormat("yyyy-MM-dd");

      if(!data.leaveDate){
          data.leaveDate = sd.format(date);
      }
      employeeInfo = employeeInfoMgr.find(data.employeeInfoId);
      employeeInfo.leaveDate = new Date(data.leaveDate.replace(/-/g,   "/"));
      employeeInfo.leaveProve = new Boolean(data.leaveProve);
      employeeInfo.leaveReason = data.leaveReason;
      employeeInfo.whetherLeaved = true;
    })
  }
};
