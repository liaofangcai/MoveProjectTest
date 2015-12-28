var {mark}                  = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var logger = require('ringo/logging').getLogger(module.id);
var {MettingRecord}     = com.zyeeda.business.experiment.entity;

var {SimpleDateFormat}          = java.text;
var {Date}                      = java.util;

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
     mettingNUmber: '编号',
     makeDate: '制表日期',
     mettingType: '会议类别',
     mettingDate: '时间',
     place: '地点',
     joinPersonnel: '参会人员',
     settingSummary: '会议纪要',
     settingProcess: '会议流程',
     comContentSuggest: '会议内容及建议',
     settingSummarize: '会议总结'
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
     'mettingNUmber',
     {name: 'makeDate', type: 'datepicker'},
     {name: 'mettingType', colspan: 2},
     {name: 'mettingDate', type: 'datepicker'},
     'place', 
     {name: 'joinPersonnel', colspan: 2},
     {name: 'settingSummary', type: 'textarea', colspan: 2},
     {name: 'settingProcess', type: 'textarea', colspan: 2},
     {name: 'comContentSuggest', type: 'textarea', colspan: 2},
     {name: 'settingSummarize', type: 'textarea', colspan: 2}
  ],
filter: [
    'mettingNUmber', 'place', 'joinPersonnel'
  ]
 };

 exports.grid = {
  columns: [
      'mettingNUmber', {name:'makeDate', type:'datepicker',label:'日期'}, 'mettingType', 'place', 'joinPersonnel'
    ],
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
    template: 'experiment/mettingrecord/mettingrecord.xls',
    fileName: '会议记录表'
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

    //导出数据
    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/mettingrecord').on(function (exportXlsSvc, interformationSvc, request) {
        var options = request.params,
            result;
        options = exportXlsSvc.dealParameters(options, interformationSvc, new MettingRecord());

        result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }))
}