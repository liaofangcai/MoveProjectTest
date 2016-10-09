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

var {SimpleDateFormat}  = java.text;
var {Date}              = java.util;
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

//获取薪资管理>部门统计的图标数据
router.get('/get-shouldsalary-data', mark('services', 'common-routers').on(function (commSvc, request) {
    var countByYear, countByYesteryear, countByBeforeyear,
    countByYearDate = [], countByYesteryearDate = [], countByBeforeyearDate = [], 
    depNames, sdf, date, currentYear,
    countByMounth, countByMounthDate = [];

    //获取当前年
    sdf = new SimpleDateFormat("yyyy-MM-dd")
    date = new Date()
    currentYear = parseInt((sdf.format(date)).split('-')[0])
    //获取部门名称
    depNames = commSvc.getAllDepartmentParentName()
    //根据当前年获取应付工资统计信息
    countByYear = commSvc.getSSCountByDepName(currentYear)
    for(var i = 0; i < depNames.size(); i++){
        var name = depNames.get(i), count = 0;
        for (var j = 0; j < countByYear.size(); j++) {
            if (name === countByYear.get(j)[0]){
                count = countByYear.get(j)[1];
                break;
            }
        }
        countByYearDate.push({value: count, name: name});
    }
    //根据当前年获取去年应付工资统计信息
    countByYesteryear = commSvc.getSSCountByDepName(currentYear-1)
    for(var i = 0; i < depNames.size(); i++){
        var name = depNames.get(i), count = 0;
        for (var j = 0; j < countByYesteryear.size(); j++) {
            if (name === countByYesteryear.get(j)[0]){
                count = countByYesteryear.get(j)[1];
                break;
            }
        }
        countByYesteryearDate.push({value: count, name: name});
    }
    //根据当前年获取前年应付工资统计信息
    countByBeforeyear = commSvc.getSSCountByDepName(currentYear-2)
    for(var i = 0; i < depNames.size(); i++){
        var name = depNames.get(i), count = 0;
        for (var j = 0; j < countByBeforeyear.size(); j++) {
            if (name === countByBeforeyear.get(j)[0]){
                count = countByBeforeyear.get(j)[1];
                break;
            }
        }
        countByBeforeyearDate.push({value: count, name: name});
    }
    for(var k = 0; k < depNames.size(); k++ ){
        var name = depNames.get(k), count = [0,0,0,0,0,0,0,0,0,0,0,0];
        //返回 月份 应发薪资
        countByMounth = commSvc.getSSCountByNameAndYear(name, currentYear)
        for(var j = 0; j < countByMounth.size(); j++){
            count[countByMounth.get(j)[0] - 1] = countByMounth.get(j)[1]
        }
        countByMounthDate.push({value: count, name: name});
    }

    return json({countByYear: countByYearDate, countByYesteryear: countByYesteryearDate,countByBeforeyear: countByBeforeyearDate, countByMounth: countByMounthDate, currentYear: currentYear});
}));
