var {mark}         = require('cdeio/mark');
var {json}         = require('cdeio/response');
var logger         = require('ringo/logging').getLogger(module.id);
var {TestCase}     = com.zyeeda.business.experiment.entity;

exports.style = 'grid';

exports.enableFrontendExtension = true;

exports.haveFilter = true;

exports.entityLabel = '测试用例';

exports.filters ={
    defaults: {
        '!testCaseFilter': ['']
    }
};

exports.labels = {
     testNumber : '编号',
     makeDate : '制造日期',
     caseId : '用例ID',
     theModel : '所属模块',
     submodule : '子模块',
     prepositionCondition : '前置条件',
     inputData : '输入数据',
     testStep: '测试步骤',
     pectOutcome: '预期结果',
     state : '状态',
     actualResult : '实际结果',
     remakesInformation: '备注信息'
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
     'testNumber',
     {name: 'makeDate',type: 'datepicker'},
     'caseId',
     'theModel', 'submodule', 'prepositionCondition', 'inputData', 'testStep', 'pectOutcome',
     'state', 'actualResult',
     {name: 'remakesInformation', type: 'textarea', colspan: 2}
  ],
filter: [
     'testNumber', 'theModel', 'submodule'
  ]
};

exports.grid = {
    columns: [
     'testNumber', {name: 'makeDate', type: 'datepicker', label: '日期'},
     'theModel', 'submodule', 'prepositionCondition'
    ],
    events: {
     'system/departments#tree:onClick': 'departmentChanged'
    },
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
    template: 'experiment/testcase/testcase.xls',
    fileName: '测试用例表'
};

exports.doWithRouter = function(router) {
    //导出数据
    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/testcase').on(function (exportXlsSvc, interformationSvc, request) {
         var options = request.params,
            result;
         options = exportXlsSvc.dealParameters(options, interformationSvc, new TestCase());

         result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

         return json({flag: result.flag, filename: result.filename});
    }))
}