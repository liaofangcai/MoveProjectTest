var {mark} = require('cdeio/mark');
var {createService} = require('cdeio/service');

var {OtherInfo}  = com.zyeeda.business.employee.entity;

exports.createService = function() {
  return {
    removeOtherInfoByEmployeeId: mark('managers', OtherInfo).mark('tx').on(function (otherInfoMgr, employeeId) {
      var otherInfo,
        otherInfoList,i;

      otherInfoList = otherInfoMgr.getOtherInfoByEmployeeId({employeeId: employeeId});

      for(i = 0; i < otherInfoList.size(); i++){
        otherInfo = otherInfoList.get(i);
        otherInfoMgr.remove(otherInfo);
      }
    })
  };
};
