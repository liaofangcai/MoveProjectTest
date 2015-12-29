var {mark}                                   = require('cdeio/mark');
var {json}                                     = require('cdeio/response');
var _                                            = require('underscore');
var fs                                           = require('fs');
var objects                                  = require('cdeio/util/objects');
var response                               = require('ringo/jsgi/response');
var {getOptionInProperties}        = require('cdeio/config');
var {join}                                      = require('cdeio/util/paths');
var {createService}                     = require('informationwork/engineroom-log.feature/service');

var {SystemBackupRecord}       = com.zyeeda.business.informationwork.entity;
var {SecurityUtils}                       = org.apache.shiro;

var {SimpleDateFormat}             = java.text;
var {Date}                                    = java.util;
var {ArrayList}                             = java.util;
var URLDecoder                         = java.net.URLDecoder;

exports.style = 'grid';

exports.enableFrontendExtension = true;

exports.haveFilter = true;

exports.entityLabel = '系统备份记录';

exports.filters = {
  defaults: {
    '!systemBackupRecordFilter': ['']
  }
};

exports.service = function(service){
  return _.extend(service, createService());
};

exports.labels = {
  systemBackupRecordNo: '编号',
  name: '系统名称',
  backupTime: '备份时间',
  backupMethod: '备份方式',
  backupPersonnel:'备份人',
  backupFormat:'备份格式',
  backupCapacity:'备份容量大小',
  backupContent:'备份内容',
  backupAddress:'存放地点',
  mark: '备注'
};

exports.forms = {
  edit: {
    groups: [{name: 'defaults',columns: 2}],
    size: 'medium'
  },

  show: {
    groups: [
    {name: 'defaults',columns:2}
    ],
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
  defaults:[
  'systemBackupRecordNo', 'name', {name: 'backupTime', type: 'datetimepicker', statusChanger: true},
  'backupMethod', 'backupPersonnel', 'backupAddress',
  'backupFormat', 'backupCapacity', {name : 'backupContent', type : 'textarea', colspan : 2},
  {name: 'mark', type: 'textarea', colspan: 2}
  ],

  filter: [
    'systemBackupRecordNo', 'name', 'backupAddress', 'backupPersonnel', {name: 'backupTime', type: 'date-range'}
   ]
};

exports.grid = {
  columns: ['systemBackupRecordNo', 'name', 'backupTime',
  'backupPersonnel'
  ],
  filterToolbar: true,
  fixedHeader: true,
  numberColumn: true,
  multiple: true,
  defaultOrder: 'createdTime-desc'
};

exports.exporting = {
  template: 'informationwork/systemBackupRecord/systemBackupRecordModule.xls',
  fileName: '系统备份记录'
};

exports.operators = {
  exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
};
exports.doWithRouter = function(router) {
  router.get('/export-excel', mark('services', 'commons/export-excel', 'informationwork/systemBackupRecord').on(function (exportXlsSvc, systemBackupRecordSvc, request) {
    var options = request.params, result;

    options = exportXlsSvc.dealParameters(options, systemBackupRecordSvc, new SystemBackupRecord());
    result = systemBackupRecordSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

    return json({flag: result.flag, filename: result.filename});
  }))
}
