var {mark}                  = require('cdeio/mark');
var {json}                  = require('cdeio/response');
var logger                  = require('ringo/logging').getLogger(module.id);
var {InformationSecurity}   = com.zyeeda.business.experiment.entity;

var {SimpleDateFormat}          = java.text;
var {Date}                      = java.util;

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
     makeDate: "培训日期",
     dept: '部门',
     job: '职务',
     theory: '训练类别',
     qualified: '考核结果',
     evaluationPerson: '考评人',
     signin: '签到',
     manks: '备注'
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
    groups: [{name: 'filter', columns: 2}], size: 'small'
}
};

exports.fieldGroups = {
 defaults: [
     'inNumber', 'name',
     {name: 'makeDate', type: 'datepicker'},
     'dept', 'job',
     {name: 'theory', type: 'dropdown', defaultValue: '理论', source: [{id:'伦理', text: '理论'},{id: '操作', text: '操作'}]},
     {name: 'qualified', type: 'dropdown', defaultValue: '合格', source: [{id:'合格', text: '合格'},{id: '不合格', text: '不合格'}]},
     'evaluationPerson',
     {name: 'signin', type: 'dropdown', defaultValue: '是', source: [{id:'是', text: '是'},
     {id: '否', text: '否'}]} ,
     {name: 'manks', type: 'textarea',  colspan: 2}
  ],
 filter: [
     'inNumber', 'name', 'dept', 'job'
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
    router.get('/get-current-info', function (request) {
        var date = new Date(),
            sd = new SimpleDateFormat("yyyy-MM-dd"),
            createdTime,
            result = {};
            result.createdTime =  sd.format(date);
        return json({result: result}, exports.filters.accountsFilter);
    });
    
    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/informationsecurity').on(function (exportXlsSvc, interformationSvc, request) {
        var options = request.params,
            result;
        options = exportXlsSvc.dealParameters(options, interformationSvc,new InformationSecurity());

        result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }))
}