var {mark}                  = require('cdeio/mark');
var {json}                  = require('cdeio/response');
var logger                  = require('ringo/logging').getLogger(module.id);
var {InformationSecurity}   = com.zyeeda.business.experiment.entity;
exports.style = 'grid';

exports.enableFrontendExtension = true;

exports.haveFilter = true;

exports.entityLabel = '信息安全培训记录';

exports.filters ={
    defaults: {
     '!informationSecurityFilter': ['']
    }
};

exports.labels = {
     inNumber: '编号',
     name: '姓名',
     makeDate: "制表日期",
     dept: '部门',
     job: '职务',
     theory: '理论成绩',
     operation: '操作成绩',
     qualified: '考核结果',
     evaluationPerson: '考评人',
     signin:'签到'
};

exports.forms = {
 add: {
     groups: [
     {name: 'defaults', columns: 2}
     ],
     size: 'large'
  },
 edit: {
     groups: [
     {name: 'defaults', columns: 2}
     ],
     size: 'large'
  },
 show: {
     groups: [
     {name: 'defaults', columns: 2}
    ],
    size: 'large'
  },
 filter: {
    groups: [{name: 'filter', columns: 1}], size: 'small'
}
};

exports.fieldGroups = {
 defaults: [
     'inNumber', 'name',
     {name: 'makeDate', type: 'datepicker', label: '申请日期'},
     'dept', 'job', 'theory', 'operation',
     {name: 'qualified', type: 'dropdown', defaultValue: '合格', source: [{id:'合格', text: '合格'},{id: '不合格', text: '不合格'}]},
     'evaluationPerson', 'signin'
  ],
 filter: [
     'inNumber', 'name'
  ]
};

exports.grid = {
  columns: ['inNumber', 'name', 'makeDate', 'dept', 'job'],
  filterToolbar: true,
  fixedHeader: true,
  numberColumn: true,
  multiple: true,
  defaultOrder: 'makeDate-desc'
};

exports.operators = {
     exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
 };

 exports.exporting = {
     template: 'experiment/informationsecurity/inteformationsecurity.xls',
     fileName: '信息安全培训记录表'
 };

 exports.doWithRouter = function(router) {
    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/informationsecurity').on(function (exportXlsSvc, interformationSvc, request) {
        var options = request.params,
            result;
        options = exportXlsSvc.dealParameters(options, interformationSvc,new InformationSecurity());

        result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }))
}