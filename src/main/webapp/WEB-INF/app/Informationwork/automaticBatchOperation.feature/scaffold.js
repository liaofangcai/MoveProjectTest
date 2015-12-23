var {mark}                                      = require('cdeio/mark');
var {json}                                        = require('cdeio/response');
var _                                               = require('underscore');
var fs                                              = require('fs');
var objects                                     = require('cdeio/util/objects');
var response                                  = require('ringo/jsgi/response');
var {getOptionInProperties}           = require('cdeio/config');
var {join}                                         = require('cdeio/util/paths');
var {createService}                        = require('informationwork/engineroom-log.feature/service');

var {AutomaticBatchOperation}     = com.zyeeda.business.informationwork.entity;
var {SecurityUtils}                          = org.apache.shiro;

var {SimpleDateFormat}                = java.text;
var {Date}                                       = java.util;
var {ArrayList}                                = java.util;
var URLDecoder                            = java.net.URLDecoder;

exports.style = 'grid';
//启用前台交互扩展，这样就可以给按钮添加事件了
exports.enableFrontendExtension = true;

exports.haveFilter = true;

exports.entityLabel = '自动批次作业表';

exports.filters = {
  defaults: {'!automaticBatchOperationFilter': ['']}
};

exports.service = function(service){
  return _.extend(service, createService());
};

exports.labels = {
  systemUpdateRecordsNo: '编号',
  systemUpdateRecordsName: '所在主机名称',
  address: '所在主机地址',
  operatingPersonnel:'job名称',
  updateContent:'job内容',
  operateTime:'运行时间',
  mark: '备注'
};

exports.forms = {
  edit: {
    groups: [{name: 'defaults',columns:2}],
    size: 'medium'
  },

  show: {
    groups: [{name: 'defaults',columns:2}],
    size: 'medium'
  },

  add: {
    groups: [{name: 'defaults',columns:2}],
    size: 'medium'
  },

  filter: {
    groups: [{name: 'filter'}],
    size: 'medium'
  }
};

exports.fieldGroups = {
  defaults: [
  'systemUpdateRecordsNo', 'systemUpdateRecordsName', 'operatingPersonnel', 'operateTime',
  {name: 'address', type: 'textarea', colspan: 2},
  {name:'updateContent', type: 'textarea',colspan:2},
  {name: 'mark', type: 'textarea', colspan: 2}
  ],

  filter: [
    'systemUpdateRecordsNo','operatingPersonnel', {name: 'operateTime', type: 'date-range'}
  ]
};

exports.grid = {
  columns: ['systemUpdateRecordsNo', 'systemUpdateRecordsName', 'address', {name: 'updateContent',
  type: 'textarea'}],
  filterToolbar: true,
  fixedHeader: true,
  numberColumn: true,
  multiple: true,
  defaultOrder: 'createdTime-desc'
};

exports.exporting = {
  template: 'informationwork/automaticBatchOperation/automaticBatchOperationModule.xls',
  fileName: '自动批次作业表'
};

exports.operators = {
  exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
};

exports.doWithRouter = function(router) {
  router.get('/export-excel', mark('services', 'commons/export-excel', 'informationwork/automaticBatchOperation').on(function (exportXlsSvc, automaticBatchOperationSvc, request) {
    var options = request.params, result;

    options = exportXlsSvc.dealParameters(options, automaticBatchOperationSvc, new AutomaticBatchOperation());
    result = automaticBatchOperationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

    return json({flag: result.flag, filename: result.filename});
  }))
}
