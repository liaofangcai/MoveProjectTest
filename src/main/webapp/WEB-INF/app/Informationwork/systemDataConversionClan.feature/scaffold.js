var {mark}                    = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var _                         = require('underscore');
var fs                        = require('fs');
var objects                   = require('cdeio/util/objects');
var response                  = require('ringo/jsgi/response');
var {getOptionInProperties}   = require('cdeio/config');
var {join}                    = require('cdeio/util/paths');
var {createService}           = require('informationwork/engineroom-log.feature/service');

var {SystemDataConversionClan}             = com.zyeeda.business.informationwork.entity;
var {SecurityUtils}           = org.apache.shiro;

var {SimpleDateFormat}        = java.text;
var {Date}                    = java.util;
var {ArrayList}               = java.util;
var URLDecoder                = java.net.URLDecoder;

exports.style = 'grid';
//启用前台交互扩展，这样就可以给按钮添加事件了
exports.enableFrontendExtension = true;

exports.haveFilter = true;
exports.filters = {
  defaults: {
    '!systemDataConversionClanFilter': ['']
  }
};

exports.service = function(service){
    return _.extend(service, createService());
};

exports.entityLabel = '系统数据转换计划';

exports.labels = {

  systemRenewalApplicationNo: '编号',
  //系统数据转换计划
  informationSystemName: '信息系统名称',
  masterName:'转换内容',
  address:'风险评估',
  updateContent:'实施步骤',
  incidence:'参与人员',
  proposer: '开始转换时间',
  applicationDepartment:'结束时间',
  identifierPersonnal:'验证人',
  identifierTime:'验证时间',
  //审核意见
  departmentHead:'部门主管意见',
  informationDepartment:'信息部门意见',
  companyLeadershipApproval: '公司领导审批',


};

exports.forms = {
  edit: {
      groups: [
        {name: 'defaults',columns:2},
        {name: 'remoteAccessApplications',label:'转换计划',columns:2},
        {name: 'auditOpinion',label: '审核意见'}
      ],
      size: 'medium'
  },
  show: {
      groups: [
        {name: 'defaults',columns:2},
        {name: 'remoteAccessApplications',label:'转换计划',columns:2},
        {name: 'auditOpinion',label: '审核意见'}
      ],
      size: 'medium'
  },
  add: {
      groups: [
        {name: 'defaults',columns:2},
        {name: 'remoteAccessApplications',label:'转换计划',columns:2},
        {name: 'auditOpinion',label: '审核意见'}
      ],
      size: 'medium'
  },
  filter: {
    groups: [{name: 'filter',columns:2}],
    size: 'medium'
  }
};

exports.fieldGroups = {
  defaults:['systemRenewalApplicationNo','informationSystemName'],
  //申请部门
  remoteAccessApplications:[{name: 'masterName',type :'textarea' ,colspan : 2},
  {name: 'address',type :'textarea' ,colspan : 2},{name: 'incidence',type :'textarea' ,colspan : 2},
  {name: 'updateContent',type :'textarea' ,colspan : 2}, {name: 'proposer', type: 'datetimepicker', statusChanger: true},
  {name: 'applicationDepartment', type: 'datetimepicker', statusChanger: true},'identifierPersonnal',
  {name: 'identifierTime', type: 'datetimepicker', statusChanger: true}],
  //审核意见
  auditOpinion:[{name: 'departmentHead', type: 'textarea'},
  {name: 'informationDepartment',type:  'textarea'},
  {name : 'companyLeadershipApproval',type:  'textarea'}],
  //配置查询条件
  filter: [
    'systemRenewalApplicationNo', 'informationSystemName', {name: 'proposer', type: 'date-range'},
    {name: 'applicationDepartment',type: 'date-range'},'identifierPersonnal',{name: 'identifierTime',type: 'date-range'}
   ]
};
exports.grid = {
    columns: ['systemRenewalApplicationNo', 'informationSystemName','proposer','applicationDepartment',
    'identifierTime','identifierPersonnal'],
    filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
};
exports.exporting = {
  template: 'informationwork/systemDataConversionClan/systemDataConversionClanModule.xls',
  fileName: '系统数据转换计划'
};
exports.operators = {
    exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
};
exports.doWithRouter = function(router) {
  //导出
  router.get('/export-excel', mark('services', 'commons/export-excel', 'informationwork/systemDataConversionClan').on(function (exportXlsSvc, systemDataConversionClanSvc, request) {
      var options = request.params,
          result;

      options = exportXlsSvc.dealParameters(options, systemDataConversionClanSvc, new SystemDataConversionClan());

      result = systemDataConversionClanSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

      return json({flag: result.flag, filename: result.filename});
  }))
}
