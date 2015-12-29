var {mark}                    = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var _                         = require('underscore');
var fs                        = require('fs');
var objects                   = require('cdeio/util/objects');
var response                  = require('ringo/jsgi/response');
var {getOptionInProperties}   = require('cdeio/config');
var {join}                    = require('cdeio/util/paths');
var {createService}           = require('informationwork/changerequest.feature/service');

var {ChangeRequest}             = com.zyeeda.business.informationwork.entity;
var {SecurityUtils}           = org.apache.shiro;

var {SimpleDateFormat}        = java.text;
var {Date}                    = java.util;
var {ArrayList}               = java.util;
var URLDecoder                = java.net.URLDecoder;
var dateTimeStr                  = new SimpleDateFormat("yyyy-MM-dd").format(new Date());

exports.style = 'grid';
//启用前台交互扩展，这样就可以给按钮添加事件了
exports.enableFrontendExtension = true;

exports.haveFilter = true;
exports.filters = {
  defaults: {
    '!changeRequestFilter': ['']
  }
};

exports.service = function(service){
    return _.extend(service, createService());
};

exports.entityLabel = '变更申请';

exports.labels = {
  number: '编号',
  createTime: '制表日期',
  name: '项目名称',
  projectLeader:'项目负责人',
  changeRecords:'变更申请记录人',
  completionTime: '变更完成时间',
  //变更申请
  requestPerson:'申请人',
  applicationTime:'申请时间',
  stage:'所处阶段',
  changeContent: '变更内容',
  changInflunence:'变更原因',
  changReason:'变更影响',
  //审批变更申请
  approvalOpinion:'CCB审批意见',
  ccbsign:'CCB负责人签字',
  signTime:'日期',
  objectForApproval: '批准变更的对象',
  changeTheExecutive: '变更执行人',
  timeLimit: '变更执行时间限制',
  //变更执行跟踪
  objectAfterChange: '变更后的对象',
  changPerson:'负责人',
  finishTime:'变更完成日期',
  result:'评审结论',
  reviewSign:'评审组长签字',
  reviewTime: '日期',
  reviewAndCountersign:'评审会签',
  opinion:'CCB审批的意见',
  sign:'CCB负责人签字',
  time:'日期'
};

exports.forms = {
  edit: {
      groups: [
        {name: 'defaults',columns: 2},
        {name: 'remoteAccessApplications',label: '变更申请', columns: 2},
        {name: 'auditOpinion', label: '审批变更申请', columns: 2},
        {name: 'theExecutive', label: '变更执行跟踪', colspan: 2}
      ],
      size: 'medium'
  },
  show: {
      groups: [
        {name: 'defaults',columns: 2},
        {name: 'remoteAccessApplications',label: '变更申请', columns: 2},
        {name: 'auditOpinion', label: '审批变更申请', columns: 2},
        {name: 'theExecutive', label: '变更执行跟踪', colspan: 2}
      ],
      size: 'medium'
  },
  add: {
      groups: [
        {name: 'defaults',columns: 2},
        {name: 'remoteAccessApplications',label: '变更申请', columns: 2},
        {name: 'auditOpinion', label: '审批变更申请', columns: 2},
        {name: 'theExecutive', label: '变更执行跟踪', colspan: 2}
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
  'number', {name: 'createTime', defaultValue: dateTimeStr}, 'name', 'projectLeader', 'changeRecords', 'completionTime'
  ],
  //变更申请
  remoteAccessApplications: [
  'requestPerson', {name: 'applicationTime', defaultValue: dateTimeStr},
  {name: 'stage', type: 'dropdown', defaultValue: 1, colspan: 2,source:
  [{id: '需求阶段', text: '需求阶段'}, {id: '设计阶段', text: '设计阶段'}, {id: '编码阶段', text: '编码阶段'}, {id: '测试阶段', text: '测试阶段'}, {id: '维护阶段', text: '维护阶段'}]},
  {name: 'changeContent',type :'textarea' ,colspan : 2},
  {name: 'changInflunence',type : 'textarea' ,colspan : 2}, {name: 'changReason',type : 'textarea' ,colspan : 2}
  ],
  //审批变更申请
  auditOpinion: [
  {name: 'approvalOpinion', type: 'textarea', colspan: 2}, 'ccbsign',
  'signTime', {name: 'objectForApproval',type : 'textarea' , colspan : 2}, 'changeTheExecutive', 'timeLimit'
  ],
  //变更执行跟踪
  theExecutive: [
  'changPerson', 'finishTime', {name: 'objectAfterChange',type : 'textarea' ,colspan : 2},
  {name: 'result', type: 'dropdown', defaultValue: 1, colspan: 2,source: [{id: '通过,不需要修改', text: '通过,不需要修改'}, {id: '原则通过,稍作修改', text: '原则通过,稍作修改'}, {id: '不通过,作重大修改', text: '不通过,作重大修改'}]},
  'reviewSign', 'reviewTime',
  {name: 'reviewAndCountersign',type : 'textarea' ,colspan : 2},
  {name: 'opinion',type : 'textarea' ,colspan : 2}, 'sign', 'time'
  ],
  //配置查询条件
  filter: ['number','name', 'createTime', {name: 'completionTime', type: 'date-range'}]
};
exports.grid = {
  columns: ['number', 'createTime','projectLeader','changeRecords'
  ],
  filterToolbar: true,
  fixedHeader: true,
  numberColumn: true,
  multiple: true,
  defaultOrder: 'createdTime-desc'
};
exports.exporting = {
  template: 'informationwork/changerequest/changerequestModule.xls',
  fileName: '变更申请'
};
exports.operators = {
    exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
};
exports.doWithRouter = function(router) {
  router.get('/export-excel', mark('services', 'commons/export-excel', 'informationwork/changerequest').on(function (exportXlsSvc, changerequestSvc, request) {
    var options = request.params, result;

    options = exportXlsSvc.dealParameters(options, changerequestSvc, new ChangeRequest());
    result = changerequestSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

    return json({flag: result.flag, filename: result.filename});
  }))
}
