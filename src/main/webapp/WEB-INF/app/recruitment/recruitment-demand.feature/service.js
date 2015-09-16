var {mark}               = require('cdeio/mark');

var {Boolean}            = java.lang;

var {RecruitmentDemand}  = com.zyeeda.business.recruitment.entity;

exports.createService = function() {
  return{
    demandClose: mark('managers', RecruitmentDemand).mark('tx').on(function(DemandMgr, data) {

      recruitmentDemand = DemandMgr.find(data.id);
      recruitmentDemand.enabled = false;
    })
  }
};
