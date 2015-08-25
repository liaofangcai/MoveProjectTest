var logger          = require('ringo/logging').getLogger(module.id);

var {mark} 			= require('cdeio/mark');
var {json}          = require('cdeio/response');
var {SecurityUtils}      = org.apache.shiro;

var {Department}         = com.zyeeda.cdeio.commons.organization.entity;
var {Account}            = com.zyeeda.cdeio.commons.organization.entity;
var {TodoInfo}           = com.zyeeda.business.work.entity;
var {TaskInfo}           = com.zyeeda.business.work.entity;
var {EvaluateInfo}       = com.zyeeda.business.work.entity;
var {WorkPackage}        = com.zyeeda.business.work.entity;
var {TripApply}          = com.zyeeda.business.trip.entity;
var {ApprovalHistory}    = com.zyeeda.business.process.entity;
var {ProcessInstance}    = com.zyeeda.business.process.entity;

exports.createService = function () {
    return {
        getTripApplyById: mark('managers', TripApply).mark('tx').on(function (tripApplyMgr, entryIds){
            return tripApplyMgr.find.apply(tripApplyMgr, entryIds);
        }),
        getEntryApprovalHistory: mark('managers', ApprovalHistory).mark('tx').on(function (apprHisMgr, entryId) {
            return apprHisMgr.getApprovalHistorysByEntryId({entryId: entryId});
        }),
        getProcessInstance: mark('managers', ProcessInstance).mark('tx').on(function (processInstanceMgr, entryId) {
            return processInstanceMgr.getProcessInstancesByEntryId({entryId: entryId});
        }),
        getAccountsByDepartmentIdAndRoleId: mark('managers', Account).mark('tx').on(function (accMgr, departmentId, roleId) {
            return accMgr.getAccountsByDepartmentIdAndRoleId({departmentId: departmentId, roleId: roleId});
        })
	};
};
