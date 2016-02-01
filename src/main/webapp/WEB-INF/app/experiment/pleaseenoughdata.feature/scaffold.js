var {mark}                    = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var {PleaseEnoughData}        = com.zyeeda.business.experiment.entity;
var {SecurityUtils}           = org.apache.shiro;

var {SimpleDateFormat}        = java.text;
var {Date}                    = java.util;
var {ArrayList}               = java.util;

exports.filters = {
  defaults: {
    '!pleaseEnoughDataFilter': [''],
    '!pleaseEnoughDatumFilter': ['ple']
  }
};

exports.haveFilter = true;

exports.enableFrontendExtension = true;

exports.entityLabel = '请购单';

exports.labels = {
  pleNo: '编号',
  pleData: '日期',
  demanDept: '需求部门',
  demandDate: '需求日期',
  demandReason: '需求原因',
  aplicationPerson: '申请人',
  director: '部门主管',
  purchase: '采购',
  check: '复核',
  generalMnager: '总经理'
};

exports.forms = {
  edit: {
      groups: [
        {name: 'defaults', columns: 2},
        {name:'inlineAssetStatusGrid',label: '请购明细'}
      ],
      size: 'large'
  },
  show: {
      groups: [
        {name: 'defaults', columns: 2},
        {name:'inlineAssetStatusGrid',label: '请购明细'}
      ],
      size: 'large'
  },
  add: {
      groups: [
        {name: 'defaults', columns: 2},
        {name:'inlineAssetStatusGrid',label: '请购明细'}
      ],
      size: 'large'
  },
  filter: {
    groups: [{name: 'filter'}],
    size: 'large'
  }
};

exports.fieldGroups = {
  defaults:[
     'pleNo', 'pleData', 'demanDept',
     'demandDate',
     {name: 'demandReason', type: 'textarea', colspan: 2},
     'aplicationPerson', 'director', 'purchase', 'check', 'generalMnager'
  ],
  filter: [
     'pleNo', 'demanDept', 'pleData'
   ],
  inlineAssetStatusGrid:[
     {label: '请购明细', type: 'inline-grid', name: 'please', allowPick: false, allowAdd: true, allowEdit: true}
  ]
};

exports.grid = {
  columns: ['pleNo', 'pleData', 'demanDept', 'demandDate', 'demandReason'],
  filterToolbar: true,
  fixedHeader: true,
  numberColumn: true,
  multiple: true,
  defaultOrder: 'pleData-desc'
};

exports.operators = {
  exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
};

exports.exporting = {
  template: 'experiment/please-en-data/please-en-data.xls',
  fileName: 'please-en-data'
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
    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/pleaseenoughdata').on(function (exportXlsSvc, interformationSvc, request) {
         var options = request.params,result;
           options = exportXlsSvc.dealParameters(options, interformationSvc,
            new PleaseEnoughData());
           result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);
           return json({flag: result.flag, filename: result.filename});
    }))
}


