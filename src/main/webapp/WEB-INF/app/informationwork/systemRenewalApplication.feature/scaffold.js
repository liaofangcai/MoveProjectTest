var {mark}                                 = require('cdeio/mark');
var {json}                                   = require('cdeio/response');
var _                                           = require('underscore');
var fs                                          = require('fs');
var objects                                 = require('cdeio/util/objects');
var response                              = require('ringo/jsgi/response');
var {getOptionInProperties}        = require('cdeio/config');
var {join}                                      = require('cdeio/util/paths');
var {createService}                     = require('informationwork/engineroom-log.feature/service');
var {SystemRenewalApplication} = com.zyeeda.business.informationwork.entity;
var {SecurityUtils}                         = org.apache.shiro;
var {SimpleDateFormat}                = java.text;
var {Date}                                       = java.util;
var {ArrayList}                                = java.util;
var URLDecoder                            = java.net.URLDecoder;
var dateTimeStr                  = new SimpleDateFormat("yyyy-MM-dd").format(new Date());

exports.style = 'grid';

exports.enableFrontendExtension = true;

exports.haveFilter = true;

exports.entityLabel = '系统主机更新申请';

exports.filters = {
  defaults: {
    '!systemRenewalApplicationFilter': ['']
  }
};

exports.service = function(service){
  return _.extend(service, createService());
};

exports.labels = {
  systemRenewalApplicationNo: '编号',
  systemRenewalApplicationDate: '申请日期',
  //远程访问申请
  informationSystemName: '信息系统名称',
  masterName:'主机名称',
  address:'主机地址',
  updateContent:'更新内容(文件)',
  incidence:'影响范围',
  proposer: '申请人',
  applicationDepartment:'申请部门',
  //审核意见
  departmentHead:'部门主管意见',
  headperson: '处理人',
  headdate: '处理日期',
  informationDepartment:'信息部门意见',
  departmentperson: '处理人',
  departmentdate: '处理日期',
  companyLeadershipApproval: '公司领导审批',
  approvalperson: '处理人',
  approvaldate: '处理日期'
};

exports.forms = {
  edit: {
    groups: [
    {name: 'defaults',columns: 2},
    {name: 'remoteAccessApplications',label: '远程访问申请',columns:2},
    {name: 'auditOpinion',label: '审核意见', columns: 2}
    ],
    size: 'medium'
  },

  show: {
    groups: [
    {name: 'defaults',columns:2},
    {name: 'remoteAccessApplications',label: '远程访问申请',columns:2},
    {name: 'auditOpinion',label: '审核意见', columns: 2}
    ],
    size: 'medium'
  },

  add: {
    groups: [
    {name: 'defaults',columns:2},
    {name: 'remoteAccessApplications',label: '远程访问申请',columns:2},
    {name: 'auditOpinion',label: '审核意见', columns: 2}
    ],
    size: 'medium'
  },
  filter: {
    groups: [{name: 'filter'}],
    size: 'medium'
  }
};

exports.fieldGroups = {
  defaults: [
  'systemRenewalApplicationNo', {name: 'systemRenewalApplicationDate', defaultValue: dateTimeStr},
  ],
  //申请部门
  remoteAccessApplications: [
  'informationSystemName', 'masterName',
  {name: 'address', type: 'textarea', colspan: 2},
  {name: 'incidence', type :'textarea' , colspan : 2}, {name: 'updateContent', type :'textarea' , colspan : 2},
  'proposer','applicationDepartment'
  ],
  //审核意见
  auditOpinion: [
  {name: 'departmentHead', type: 'textarea', colspan: 2}, 'headperson', 'headdate',
  {name: 'informationDepartment',type:  'textarea', colspan: 2}, 'departmentperson', 'departmentdate',
  {name : 'companyLeadershipApproval', type:  'textarea',colspan: 2}, 'approvalperson', 'approvaldate'
  ],
  //配置查询条件
  filter: [
    'systemRenewalApplicationNo', 'informationSystemName', 'masterName', 'proposer', {name: 'systemRenewalApplicationDate', type: 'date-range'}
   ]
};

exports.grid = {
  columns: ['systemRenewalApplicationNo', 'informationSystemName', 'masterName', 'proposer','systemRenewalApplicationDate', 'applicationDepartment'
  ],
  filterToolbar: true,
  fixedHeader: true,
  numberColumn: true,
  multiple: true,
  defaultOrder: 'createdTime-desc'
};

exports.exporting = {
  template: 'informationwork/systemrenewalapplication/systemrenewalapplication.xls',
  fileName: 'systemrenewalapplication'
};

exports.operators = {
  exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
};
exports.doWithRouter = function(router) {
  router.get('/export-excel', mark('services', 'commons/export-excel', 'informationwork/systemrenewalapplication').on(function (exportXlsSvc, systemRenewalApplicationSvc, request) {
    var options = request.params, result;

    options = exportXlsSvc.dealParameters(options, systemRenewalApplicationSvc, new SystemRenewalApplication());
    result = systemRenewalApplicationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

    return json({flag: result.flag, filename: result.filename});
  }))
}
