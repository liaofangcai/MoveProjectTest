var {mark}                  = require('cdeio/mark');
var commExpService          = require('commons/export-excel.feature/service');

var {RecruitmentDemand}     = com.zyeeda.business.recruitment.entity;
var {Account}               = com.zyeeda.cdeio.commons.organization.entity;
var {Department}            = com.zyeeda.cdeio.commons.organization.entity;

var {SecurityUtils}         = org.apache.shiro;
var {ArrayList}             = java.util;
var {HashMap}               = java.util;
var {Date}                  = java.util;
var {Boolean}               = java.lang;

exports.createService = function() {
  return{
    demandClose: mark('managers', RecruitmentDemand).mark('tx').on(function(demandMgr, data) {
        var recruitmentDemand;

        recruitmentDemand = demandMgr.find(data.id);
        recruitmentDemand.enabled = "0";
    }),
    saveEntities: mark('managers', RecruitmentDemand, Account, Department).mark('tx').on(function (recruitmentDemandMgr, accountMgr,departmentMgr,params, entityArray, result) {
            var entity,
                subject = SecurityUtils.getSubject(),
                user = subject.getPrincipal(),
                departmentName, departmentList, i;

            for (i = 0; i < entityArray.length; i++) {
                entity = entityArray[i];
                entity.creator = user.accountName;
                entity.creatorName = user.realName;
                entity.createdTime = new Date();
                entity.lastModifiedTime = new Date();

                departmentName = result.pickerFields[i].colName;
                departmentList = departmentMgr.getDepartmentByName({name: departmentName});
                if(departmentList != null && departmentList.size() > 0){
                    entity.department = departmentList.get(0);
                }
            }

            if (result.failRowIdxes.length === 0 && result.repeatRowIdxes.length === 0) {
                recruitmentDemandMgr.save.apply(recruitmentDemandMgr.save, entityArray);
            }
            return {failRowIdxes: result.failRowIdxes, repeatRowIdxes: result.repeatRowIdxes};
        })
    };
}
