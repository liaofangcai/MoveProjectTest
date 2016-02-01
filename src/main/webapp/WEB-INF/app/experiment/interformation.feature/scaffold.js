var {mark}                  = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var logger = require('ringo/logging').getLogger(module.id);
var {Interformation}     = com.zyeeda.business.experiment.entity;

var {SimpleDateFormat}          = java.text;
var {Date}                      = java.util;

exports.style = 'grid';

exports.enableFrontendExtension = true;

exports.haveFilter = true;

exports.entityLabel = '信息系统账号权限申请信息';

exports.filters ={
    defaults: {
     '!interformationFilter': ['']
    }
};

exports.labels = {
     interformationSystemNum: '编号',
     aplicationDate: '申请日期',
     name: '姓名',
     email: 'Email',
     dept: '部门',
     post: '岗位',
     interformationSystemName: '信息系统名称',
     userName: '用户名',
     content: '申请内容',
     description: '增加/减少权限详细描述',
     deptOpinions: '部门主管意见',
     deptHandlePerson :'处理人',
     deptDate: '处理日期',
     administratoraudit: '管理员审核',
     adminHandlePerson: '处理人',
     administratorauditDate: '处理日期',
     rocessingResults: '处理结果',
     handlePserson: '处理人',
     rocessingResultsDate: '处理日期'

};

exports.forms = {
 defaults: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication',columns: 2, label: '用户申请'},
     {name: 'examineHandle',columns:2,label:'审核处理'}
     ],
     size: 'large'
  },
 filter: {
     groups: [{name: 'filter', columns: 2}], size: 'small'
}
};

exports.fieldGroups = {
 defaults: [
     'interformationSystemNum', {name: 'aplicationDate',type: 'datepicker',label: '申请日期'}
  ],
 userApplication: [
    'name', 'email', 'dept', 'post', 'interformationSystemName',
     {name: 'userName', type: 'text',label: '用户名(新增用户此栏由管理员填写)'},
     {name: 'content', type: 'dropdown', defaultValue: '新建用户',
     source: [{id:'新建用户',text: '新建用户'}, {id:'取消用户', text: '取消用户'},{id:'调整权限', text: '调整权限'}]},
     {name: 'description', type: 'textarea', colspan: 2}
     ],
 examineHandle: [
     {name: 'deptOpinions', type: 'textarea',label: '部门主管意见', colspan: 2},
     'deptHandlePerson',
     {name: 'deptDate', type: 'datepicker',label: '处理日期'},
     {name: 'administratoraudit', type: 'textarea', label: '管理员审核', colspan: 2},
     'adminHandlePerson',
     {name: 'administratorauditDate', type: 'datepicker',label: '处理日期'},
     {name: 'rocessingResults', type: 'textarea',label: '处理结果', colspan: 2},
     'handlePserson',
     {name: 'rocessingResultsDate', type: 'datepicker',label: '处理日期'}
     ],
filter: [
     'interformationSystemNum', 'name', 'dept', 'post'
  ]
};

exports.grid = {
  columns: ['interformationSystemNum', 'aplicationDate', 'name', 'email', 'dept'],
  filterToolbar: true,
  fixedHeader: true,
  numberColumn: true,
  multiple: true,
  defaultOrder: 'aplicationDate-desc'
};

exports.operators = {
     exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' },
     print: {label: '打印', icon: 'icon-print', group: '30-custom', order: 200, show: 'always', style: 'btn-info'}
};

exports.exporting = {
     template: 'experiment/interformation/inteformation.xls',
     fileName: 'inteformation'
};

exports.doWithRouter = function(router) {
    //取当前时间
    router.get('/get-current-info', function (request) {
        var date = new Date(),
            sd = new SimpleDateFormat("yyyy-MM-dd"),
            createdTime,
            result = {};
            result.createdTime =  sd.format(date);
        return json({result: result}, exports.filters.accountsFilter);
    });

    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/interformation').on(function (exportXlsSvc, interformationSvc, request) {
        var options = request.params,
            result;
        options = exportXlsSvc.dealParameters(options, interformationSvc, new Interformation());

        result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }));

    router.get('/get_interformation_sys', mark('services', 'experiment/interformation').on(function (inSvc, request) {
         var entryIds = request.params.selectedDataIds, result, informations,
         entryIdArr = new String(entryIds).split(",");
        informations = inSvc.getTripApplyByIds(entryIdArr);
        return json({informations: informations}, exports.filters.defaults);
    }));
}
