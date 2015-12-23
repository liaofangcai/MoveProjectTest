var {mark}                              = require('cdeio/mark');
var {json}                                = require('cdeio/response');
var _                                       = require('underscore');
var fs                                      = require('fs');
var objects                             = require('cdeio/util/objects');
var response                          = require('ringo/jsgi/response');
var {getOptionInProperties}   = require('cdeio/config');
var {join}                                 = require('cdeio/util/paths');
var {createService}                = require('informationwork/engineroom-log.feature/service');

var {SystemUpdateRecords}             = com.zyeeda.business.informationwork.entity;
var {SecurityUtils}                   = org.apache.shiro;

var {SimpleDateFormat}         = java.text;
var {Date}                               = java.util;
var {ArrayList}                        = java.util;
var URLDecoder                    = java.net.URLDecoder;

exports.style = 'grid';
//启用前台交互扩展，这样就可以给按钮添加事件了
exports.enableFrontendExtension = true;

exports.haveFilter = true;

exports.filters = {
  defaults: {
    '!systemUpdateRecordsFilter': ['']
  }
};

exports.service = function(service){
  return _.extend(service, createService());
};

exports.entityLabel = '系统更新记录';

exports.labels = {
  systemUpdateRecordsNo: '编号',
  systemUpdateRecordsName: '主机名称',
  address: '主机地址',
  operatingPersonnel:'操作人',
  updateContent:'更新内容',
  operateTime:'操作时间',
  mark: '备注',
  makeTable:'制表日期'

};

exports.forms = {
  edit: {
    groups: [{name: 'defaults',columns: 2}],
    size: 'medium'
  },

  show: {
    groups: [{name: 'defaults'}],
    size: 'medium'
  },

  add: {
    groups: [{name: 'defaults'}],
    size: 'medium'
  },

  filter: {
    groups: [{name: 'filter'}],
    size: 'medium'
  }
};

exports.fieldGroups = {
  defaults:
  [
    'systemUpdateRecordsNo','operatingPersonnel','systemUpdateRecordsName','address','operateTime','makeTable',
    {name: 'updateContent', type: 'textarea', colspan: 2},{name :'mark', type: 'textarea', colspan:2}
  ],
  //配置查询条件
  filter: ['systemUpdateRecordsNo', {name: 'operateTime', type: 'date-range'}]
};

exports.grid = {
  columns: ['systemUpdateRecordsNo', 'systemUpdateRecordsName','operatingPersonnel','operateTime'],
  filterToolbar: true,
  fixedHeader: true,
  numberColumn: true,
  multiple: true,
  defaultOrder: 'createdTime-desc'
};

exports.exporting = {
  template: 'informationwork/systemUpdateRecords/systemUpdateRecordsModule.xls',
  fileName: '系统更新记录表'
};

exports.operators = {
  exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
};

exports.doWithRouter = function(router) {
router.get('/export-excel', mark('services', 'commons/export-excel', 'informationwork/systemUpdateRecords').on(function (exportXlsSvc, systemUpdateRecordsSvc, request) {
    var options = request.params, result;

    options = exportXlsSvc.dealParameters(options, systemUpdateRecordsSvc, new SystemUpdateRecords());
    result = systemUpdateRecordsSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

    return json({flag: result.flag, filename: result.filename});
  }))
}
