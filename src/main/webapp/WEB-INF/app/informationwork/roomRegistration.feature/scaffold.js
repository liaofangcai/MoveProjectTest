var {mark}                                  = require('cdeio/mark');
var {json}                                    = require('cdeio/response');
var _                                           = require('underscore');
var fs                                          = require('fs');
var objects                                 = require('cdeio/util/objects');
var response                              = require('ringo/jsgi/response');
var {getOptionInProperties}       = require('cdeio/config');
var {join}                                     = require('cdeio/util/paths');
var {createService}                    = require('informationwork/engineroom-log.feature/service');
var {RoomRegistration}              = com.zyeeda.business.informationwork.entity;
var {SecurityUtils}                       = org.apache.shiro;
var {SimpleDateFormat}             = java.text;
var {Date}                                    = java.util;
var {ArrayList}                             = java.util;
var URLDecoder                         = java.net.URLDecoder;

exports.style = 'grid';

exports.enableFrontendExtension = true;

exports.haveFilter = true;

exports.entityLabel = '机房进出登记记录表';

exports.filters = {
  defaults: {
    '!roomRegistrationFilter': ['']
  }
};

exports.labels = {
  systemUpdateRecordsNo: '编号',
  systemUpdateRecordsName: '登记日期',
  address: '进入时间',
  operatingPersonnel:'事由',
  updateContent:'离开时间',
  operateTime:'登记人',
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
    groups: [{name: 'filter', columns: 2}],
    size: 'medium'
  }
};

exports.fieldGroups = {
  defaults:[
  'systemUpdateRecordsNo', 'systemUpdateRecordsName', {name: 'address', type: 'datetimepicker', statusChanger: true},
  {name: 'updateContent', type: 'datetimepicker', statusChanger: true},
  {name: 'operateTime', colspan: 2}, {name: 'operatingPersonnel', type: 'textarea', colspan: 2},
  {name: 'mark', type: 'textarea', colspan: 2}
  ],

  filter: [
   'systemUpdateRecordsNo', 'operateTime',
  {name: 'address', type: 'date-range',colspan: 2},
  {name: 'updateContent', type: 'date-range', colspan: 2},
   {name: 'systemUpdateRecordsName', type: 'date-range', colspan: 2}
  ]
};

exports.grid = {
  columns: ['systemUpdateRecordsNo', 'systemUpdateRecordsName',
  {name: 'address', type: 'datetimepicker', statusChanger: true},
  {name: 'updateContent', type: 'datetimepicker', statusChanger: true}, 'operateTime'
  ],
  filterToolbar: true,
  fixedHeader: true,
  numberColumn: true,
  multiple: true,
  defaultOrder: 'createdTime-desc'
};

exports.exporting = {
  template: 'informationwork/roomRegistration/roomregistration.xls',
  fileName: 'roomregistration'
};

exports.operators = {
  exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
};

exports.doWithRouter = function(router) {
  router.get('/export-excel', mark('services', 'commons/export-excel', 'informationwork/roomregistration').on(function (exportXlsSvc, roomRegistrationSvc, request) {
    var options = request.params, result;

    options = exportXlsSvc.dealParameters(options, roomRegistrationSvc, new RoomRegistration());
    result = roomRegistrationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

    return json({flag: result.flag, filename: result.filename});
  }))
}
