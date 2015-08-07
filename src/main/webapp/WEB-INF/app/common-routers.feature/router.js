var logger          = require('ringo/logging').getLogger(module.id);

var {json}          = require('cdeio/response');
var {mark}          = require('cdeio/mark');
var {createRouter}  = require('cdeio/router');
var {cdeio}         = require('config');
var _               = require('underscore');
var config          = require('cdeio/config');
var {join}          = require('cdeio/util/paths');

var {JSONArray}     = org.json;
var {JSONObject}    = org.json;

var {BufferedReader}    = java.io;
var {InputStream}       = java.io;
var {InputStreamReader} = java.io;
var {StringBuilder}     = java.lang;
var {HashSet}           = java.util;
var {File}              =java.io;

var router = exports.router = createRouter();

exports.filters = {
    currUserInfoFilter: {
        '!companyFilter': ['children', 'parent(1)', 'equipmentLedgers']
    },
    allDeptsAndAccountsFilter: {
        '!accountFilter': ['roles'],
        '!departmentFilter': ['children', 'accounts']
    },
    tripApplyFilter:{
        '!tripApplyFilter': '',
        '!departmentFilter': ['parent(1)', 'children', 'accounts'],
        '!accountFilter': [''],
        '!roleFilter': ['department', 'accounts'],
        '!permissionFilter': ['roles']
    },
    tripReportFilter:{
        '!tripReportFilter': '',
        '!tripApplyFilter': '',
        '!departmentFilter': ['parent(1)', 'children', 'accounts'],
        '!accountFilter': [''],
        '!roleFilter': ['department', 'accounts'],
        '!permissionFilter': ['roles'],
        '!attachmentFilter': '',
        '!tripCostFilter': 'tripReport'
    }
};

// 根据业务数据 id 查询审批历史
router.get('/get-entry-approval-history', mark('services', 'common-routers').on(function (commSvc, request) {
    var entryId = request.params.selectedDataId, results = [];
    var approvalHistorys = commSvc.getEntryApprovalHistory(entryId);
    var processInstance = commSvc.getProcessInstance(entryId),
        businessMark, entity;
    if (processInstance.size() !== 0) {
        var settingItems = processInstance.get(0).processDefinition.settingItems;
        var flowStatus, departmentId;
        //已审批的记录
        for (var i = 0; i < approvalHistorys.size(); i++) {
            var approvalHistory = approvalHistorys.get(i);
            businessMark = approvalHistory.businessDefinition.businessMark;
            if ('Defect' === businessMark) {
                entity = commSvc.getDefectById(entryId);
            }
            var processSettingItem = approvalHistory.processTaskInfo.processSettingItem;
            departmentId = approvalHistory.operator.department.id;
            results.push({index: i + 1, taskDesc: approvalHistory.taskDesc, operateTime: approvalHistory.operateTime, comment: approvalHistory.comment, suggestion: approvalHistory.suggestion, operator: approvalHistory.operator.realName + ','});
        }
        if (approvalHistorys.size() > 1) {
            flowStatus = approvalHistorys.get(approvalHistorys.size() - 1).processTaskInfo.processSettingItem.flowStatus;
        } else {
            flowStatus = 0;
        }

        //未审批的记录
        for (var c =  Number(flowStatus); c < settingItems.size(); c++) {
            var processSettingItem = settingItems.get(c);
            var operator = '';
            var roles = cdeio.useOwnUnitProcessTaskRoles;
            var currentRoles = new HashSet();

            for (var v = 0; v < processSettingItem.roles.size(); v++) {
                var role = processSettingItem.roles.get(v);
                var status = false;
                for (var k = 0; k < roles.length; k++) {
                    if (role.name === roles[k]) {
                        status = true;
                        //根据部门ID和角色ID查找所以人员
                        var xxx = commSvc.getAccountsByDepartmentIdAndRoleId(departmentId, role.id);
                        for (var y = 0; y < xxx.size(); y++) {
                            operator = operator + xxx.get(y).realName + ',';
                        }
                        break;
                    }
                }
                if (status === false) {
                    for (var y = 0; y < role.accounts.size(); y++) {
                        operator = operator + role.accounts.get(y).realName + ',';
                    }
                }
            }
            for (var b = 0; b < processSettingItem.accounts.size(); b++) {
                operator = operator + processSettingItem.accounts.get(b).realName + ',';
            }
            for (var n = 0; n < processSettingItem.departments.size(); n++) {
                var department = processSettingItem.departments.get(n);
                for (var j = 0; j < department.accounts.size(); j++) {
                    operator = operator + department.accounts.get(j).name + ',';
                }
            }

            results.push({index: c, taskDesc: processSettingItem.flowStatusDesc, operateTime: '在办', comment: '', suggestion: '', operator: operator});
        }
    }

    return json({results: results});
}));

router.get('/get-trip-apply-by-id', mark('services', 'common-routers').on(function (commSvc, request) {
    var entryIds = request.params.selectedDataIds, result, tripApplys;

    tripApplys = commSvc.getTripApplyById(new String(entryIds).split(","));

    return json({tripApplys: tripApplys}, exports.filters.tripApplyFilter);
}));

router.get('/get-trip-report-by-id', mark('services', 'common-routers').on(function (commSvc, request) {
    var entryIds = request.params.selectedDataIds, result, tripReports;

    tripReports = commSvc.getTripReportById(new String(entryIds).split(","));

    return json({tripReports: tripReports}, exports.filters.tripReportFilter);
}));
