var {mark}                       = require('cdeio/mark');
var {json}                         = require('cdeio/response');
var _                                = require('underscore');
var fs                               = require('fs');
var objects                      = require('cdeio/util/objects');
var response                   = require('ringo/jsgi/response');
var {getOptionInProperties}   = require('cdeio/config');
var {join}                           = require('cdeio/util/paths');
var {createService}          = require('informationwork/engineroom-log.feature/service');
var {PlanBackup}             = com.zyeeda.business.informationwork.entity;
var {SecurityUtils}            = org.apache.shiro;

var {SimpleDateFormat}   = java.text;
var {Date}                          = java.util;
var {ArrayList}                   = java.util;
var URLDecoder               = java.net.URLDecoder;

exports.style = 'grid';

exports.entityLabel = '系统备份计划表';

exports.enableFrontendExtension = true;

exports.haveFilter = true;

exports.filters = {
  defaults: {
    '!planBackupFilter': ['']
  }
};

exports.service = function(service){
  return _.extend(service, createService());
};

exports.labels = {
  name: '系统名称',
  systemUpdateRecordsNo: '编号',
  systemUpdateRecordsName: '计划备份时间',
  address: '备份方式',
  operatingPersonnel:'备份人',
  updateContent:'备份格式',
  operateTime:'备份内容',
  mark: '备注'
};

exports.forms = {
  edit: {
    groups: [{name: 'defaults',columns: 2}],
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
  'systemUpdateRecordsNo', 'name', {name: 'systemUpdateRecordsName', type: 'datetimepicker', statusChanger: true},
  'updateContent','address',
  'operatingPersonnel', {name: 'operateTime', type: 'textarea', colspan: 2}, {name: 'mark', type: 'textarea', colspan:2},
  ],

  filter: [
  'systemUpdateRecordsNo', 'name', 'address', 'operatingPersonnel',
  {name: 'systemUpdateRecordsName', type: 'date-range'}
   ]
};

exports.grid = {
  columns: ['systemUpdateRecordsNo', 'name', 'systemUpdateRecordsName','operatingPersonnel',
  'address'],
  filterToolbar: true,
  fixedHeader: true,
  numberColumn: true,
  multiple: true,
  defaultOrder: 'createdTime-desc'
};

exports.exporting = {
  template: 'informationwork/planBackup/planBackupModule.xls',
  fileName: '系统备份计划表'
};

exports.operators = {
  exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
};
exports.doWithRouter = function(router) {
  router.get('/export-excel', mark('services', 'commons/export-excel', 'informationwork/planBackup').on(function (exportXlsSvc, planBackupSvc, request) {
    var options = request.params, result;

    options = exportXlsSvc.dealParameters(options, planBackupSvc, new PlanBackup());
    result = planBackupSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

    return json({flag: result.flag, filename: result.filename});
  }))
}
