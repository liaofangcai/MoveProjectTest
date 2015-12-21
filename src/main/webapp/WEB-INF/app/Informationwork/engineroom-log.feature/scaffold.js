var {mark}                    = require('cdeio/mark');
var {json}                      = require('cdeio/response');
var _                             = require('underscore');
var fs                            = require('fs');
var objects                   = require('cdeio/util/objects');
var response                = require('ringo/jsgi/response');
var {getOptionInProperties}   = require('cdeio/config');
var {join}                       = require('cdeio/util/paths');
var {createService}      = require('informationwork/engineroom-log.feature/service');

var {EngineroomLog}   = com.zyeeda.business.informationwork.entity;
var {SecurityUtils}        = org.apache.shiro;

var {SimpleDateFormat}         = java.text;
var {Date}                     = java.util;
var {ArrayList}              = java.util;
var URLDecoder          = java.net.URLDecoder;

exports.style = 'grid';
//启用前台交互扩展，这样就可以给按钮添加事件了
exports.enableFrontendExtension = true;

exports.entityLabel = '机房工作日志';

exports.haveFilter = true;
exports.filters = {
  defaults: {
    '!engineroomLogFilter': ['']
  }
};

exports.service = function(service){
    return _.extend(service, createService());
};

exports.labels = {
  engineroomLogNo: '日志编号',
  engineroomLogDate: '日期',
  engineroomLogWork: '工作内容',
  mark: '备注',
  makeTable: '制表日期'
};

exports.forms = {
  edit: {
    groups:
    [{name: 'defaults',columns:2}],
    size: 'medium'
  },

  show: {
    groups:
    [{name: 'defaults',columns:2}],
    size: 'medium'
  },

  add: {
    groups:
    [{name: 'defaults',columns:2}],
    size: 'medium'
  },

  filter: {groups:
    [{name: 'filter'}],
    size: 'medium'
  }
};

exports.fieldGroups = {
  defaults:
  [
    'engineroomLogNo', 'engineroomLogDate',
    {name: 'engineroomLogWork', type: 'textarea',colspan:2},
    'mark','makeTable'
  ],

  filter:
  ['engineroomLogNo', {name: 'engineroomLogDate', type: 'date-range'}]
};

exports.grid = {
    columns:
    [
      'engineroomLogNo',
      'engineroomLogDate',
      {name: 'engineroomLogWork', type: 'textarea'},
      'mark'
    ],
    filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
};

exports.exporting = {
  template: 'informationwork/engineroom-log/engineroomLogModule.xls',
  fileName: '机房工作日志表'
};

exports.operators = {
    exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
};
exports.doWithRouter = function(router) {
  router.get('/export-excel', mark('services', 'commons/export-excel', 'informationwork/engineroom-log').on(function (exportXlsSvc, engineroomLlogSvc, request) {
    var options = request.params, result;

    options = exportXlsSvc.dealParameters(options, engineroomLlogSvc, new EngineroomLog());
    result = engineroomLlogSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

    return json({flag: result.flag, filename: result.filename});
  }))
}

