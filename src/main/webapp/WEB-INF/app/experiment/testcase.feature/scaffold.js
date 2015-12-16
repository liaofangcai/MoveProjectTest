var {mark}                  = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var logger = require('ringo/logging').getLogger(module.id);
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
     test_no : '编号',
     make_date : '制造日期',
     case_id : '用例ID',
     the_model : '所属模块',
     submodule : '子模块',
     preposition_condition : '前置条件',
     input_data : '输入数据',
     test_step: '测试步骤',
     pect_outcome: '预期结果',
     state : '状态',
     actual_result : '实际结果',
     remakes_information: '备注信息'
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
     'test_no',{name:'make_date',type:'datepicker'},'case_id',
     'the_model','submodule','preposition_condition','input_data','test_step','pect_outcome','state','actual_result',{name:'remakes_information',type: 'textarea', colspan: 2}
  ],
filter: [
     'test_no','the_model','submodule'
  ]
};

exports.grid = {
    columns: [
      'test_no',{name:'make_date',type:'datepicker',label:'日期'},'the_model','submodule','preposition_condition'
    ],
    events: {
        'system/departments#tree:onClick': 'departmentChanged'
    },
    filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
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