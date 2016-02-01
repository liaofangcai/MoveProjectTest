var {mark}                  = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var logger = require('ringo/logging').getLogger(module.id);
var {SystemRemoteVisit}         = com.zyeeda.business.experiment.entity;

var {SimpleDateFormat}          = java.text;
var {Date}                      = java.util;

exports.style = 'grid';
exports.enableFrontendExtension = true;
exports.haveFilter = true;

exports.entityLabel = '系统远程访问申请单';

exports.filters ={
    defaults: {
     '!systemRemoteVisitFilter': ['']
    }
};

exports.labels = {
     viNumber: '编号',
     apDate: '申请日期',
     inApNmae: "系统名称",
     serverUrl: '服务器地址',
     serverUses: '服务器用途',
     visitReason: '访问原因',
     operationContent: '操作内容',
     apPerson: '申请人',
     apDept: '申请部门',
     deptChargeOpinion: '部门主管意见',
     deptHanlePerson: '处理人',
     deptDate: '日期',
     inDeptOpinion: '信息部门意见',
     inHandlePerson: '处理人',
     inDate: '日期',
     companyLeader: '公司领导审批',
     companyHandlePerson: '处理人',
     leaderDate: '日期'
};

exports.forms = {
 add: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication', columns: 2,label: '远程访问申请'},
     {name: 'Other', columns: 2,label: '审核意见'}
     ],
     size: 'large'
  },
 edit: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication', columns: 2, label: '远程访问申请'},
     {name: 'Other', columns: 2, label: '审核意见'}
     ],
     size: 'large'
  },
 show: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication', columns: 2, label: '远程访问申请'},
     {name: 'Other', columns: 2,label: '审核意见'}
    ],
    size: 'large'
  },
 filter: {
    groups: [{name: 'filter', columns: 1}], size: 'small'
}
};

exports.fieldGroups = {
 defaults: [
     'viNumber', {name: 'apDate', type: 'datepicker', label: '申请日期'}
  ],
 userApplication: [
     'inApNmae', 'serverUrl', 'serverUses',
     {name: 'visitReason', type: 'textarea',colspan: 2},
     {name: 'operationContent', type: 'textarea', colspan: 2},
     'apPerson', 'apDept'
     ],
 Other: [
     {name: 'deptChargeOpinion', colspan: 2 ,type: 'textarea', label: '部门主管意见'},
     'deptHanlePerson',
     {name: 'deptDate', type: 'datepicker', label: '日期'},
     {name: 'inDeptOpinion', type: 'textarea', label: "信息部门意见", colspan: 2},
     'inHandlePerson',
     {name: 'inDate', type: 'datepicker', label: '日期'},
     {name: 'companyLeader', type: 'textarea', label: "公司领导审批", colspan: 2},
     'companyHandlePerson',
     {name: 'leaderDate', type: 'datepicker', label: '日期'}],
 filter: [
     'viNumber', 'inApNmae', 'serverUses'
  ]
};

exports.grid = {
  columns: ['viNumber', 'apDate', 'inApNmae', 'serverUrl', 'serverUses'],
  filterToolbar: true,
  fixedHeader: true,
  numberColumn: true,
  multiple: true,
  defaultOrder: 'apDate-desc'
};

exports.operators = {
     exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
 };

 exports.exporting = {
     template: 'experiment/systemremotevisit/systemremotevisit.xls',
     fileName: 'systemremotevisit'
 };


exports.doWithRouter = function(router) {
    router.get('/get-current-info', function (request) {
        var date = new Date(),
            sd = new SimpleDateFormat("yyyy-MM-dd"),
            createdTime,
            result = {};
            result.createdTime =  sd.format(date);
        return json({result: result}, exports.filters.accountsFilter);
    });
    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/systemremotevisit').on(function (exportXlsSvc, interformationSvc, request) {
        var options = request.params,
            result;
        options = exportXlsSvc.dealParameters(options, interformationSvc, new SystemRemoteVisit());

        result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }))
}
