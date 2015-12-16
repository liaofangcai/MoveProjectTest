var {mark}                  = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var logger = require('ringo/logging').getLogger(module.id);
var {MettingRecord}     = com.zyeeda.business.experiment.entity;

exports.style = 'grid';

exports.enableFrontendExtension = true;

exports.haveFilter = true;

exports.entityLabel = '会议记录';

exports.filters ={
    defaults: {
        '!mettingRecordFilter': ['']
    }
};

exports.labels = {
     metting_no : '编号',
     make_date : '制表日期',
     metting_type : '会议类型',
     metting_date : '时间',
     place : '地点',
     join_personnel : '参加人员',
     setting_summary : '会议纪要',
     setting_process: '会议流程',
     com_content_suggest: '会议类容及建议',
     setting_summarize : '会议总结'
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
     'metting_no',{name: 'make_date',type: 'datepicker'},'metting_type',
     {name: 'metting_date',type: 'datepicker'},
     'place','join_personnel','setting_summary',
     {name: 'setting_process',type: 'textarea', colspan: 2},
     {name: 'com_content_suggest',type: 'textarea', colspan: 2},
     {name: 'setting_summarize',type: 'textarea', colspan: 2}
  ],
filter: [
    'metting_no','place','join_personnel'
  ]
 };

// exports.grid = {
//     columns: [
//       'test_no',{name:'make_date',type:'datepicker',label:'日期'},'the_model','submodule','preposition_condition'
//     ],
//     events: {
//         'system/departments#tree:onClick': 'departmentChanged'
//     },
//     filterToolbar: true,
//     fixedHeader: true,
//     numberColumn: true,
//     multiple: true,
//     defaultOrder: 'createdTime-desc'
// };

exports.operators = {
     exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
};

exports.exporting = {
    template: 'experiment/mettingrecord/mettingrecord.xls',
    fileName: '会议记录表'
};

exports.doWithRouter = function(router) {
   
    //导出数据
    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/mettingrecord').on(function (exportXlsSvc, interformationSvc, request) {
        var options = request.params,
            result;
        options = exportXlsSvc.dealParameters(options, interformationSvc, new MettingRecord());

        result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }))
}