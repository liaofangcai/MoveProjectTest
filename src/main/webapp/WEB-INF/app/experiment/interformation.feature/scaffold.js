var {mark}                  = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var logger = require('ringo/logging').getLogger(module.id);
var {Interformation}     = com.zyeeda.business.experiment.entity;

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
     name: '姓名',
     email: 'Email',
     dept: '部门',
     post: '岗位',
     interformationSystemName: '信息系统名称',
     userName: '用户名',
     content: '申请内容',
     description: '增加/减少权限详细描述'
};

exports.forms = {
 add: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication',columns: 2, label: '用户申请'},
     {name: 'examineHandle',columns:2,label:'审核处理'}
     ],
     size: 'large'
  },
 edit: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication',columns: 2, label: '用户申请'},
     {name: 'examineHandle',columns:2,label:'审核处理'}
     ],
     size: 'large'
  },
 show: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication',columns: 2, label: '用户申请'},
     {name: 'examineHandle',columns:2,label:'审核处理'}
    ],
     size: 'large'
  },
 filter: {
     groups: [{name: 'filter', columns: 1}], size: 'small'
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
     {name: 'deptOpinions', type: 'text',label: '部门主管意见'},
     {name: 'deptDate', type: 'datepicker',label: '日期'},
     {name: 'administratoraudit', type: 'text', label: '管理员审核'},
     {name: 'administratorauditDate', type: 'datepicker',label: '日期'},
     {name: 'rocessingResults', type: 'text',label: '处理结果'},
     {name: 'rocessingResultsDate', type: 'datepicker',label: '日期'}
     ],
filter: [
     'interformationSystemNum', 'name', 'dept', 'post'
  ]
};

exports.operators = {
     exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
};

exports.exporting = {
     template: 'experiment/interformation/Inteformation.xls',
     fileName: '信息系统账号权限申请信息'
};

 exports.doWithRouter = function(router) {
    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/interformation').on(function (exportXlsSvc, interformationSvc, request) {
        var options = request.params,
            result;
        options = exportXlsSvc.dealParameters(options, interformationSvc, new Interformation());

        result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }))
}