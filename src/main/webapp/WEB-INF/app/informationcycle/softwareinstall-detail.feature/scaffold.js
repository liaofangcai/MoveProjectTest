var {mark}                  = require('cdeio/mark');
var {json}                  = require('cdeio/response');
var _                       = require('underscore');
var {AuditPlanDetail}       = com.zyeeda.business.informationcycle.entity;
var {SecurityUtils}         = org.apache.shiro;
var {SimpleDateFormat}      = java.text;
var {Date}                  = java.util;

exports.filters = {
  defaults: {
    '!softwareInstallDetailFilter': 'softwareInstall',
    '!softwareInstallFilter': ''
  }
};

exports.entityLabel = '软件安装情况清查明细';

exports.labels = {
  userName: '用户名称',
  pcName: '计算机名',
  checkStatus: '检查情况',
  unusualStatus: '异常事项',
  treatment: '处理措施',
  remark: '备注'
};

exports.forms = {
  defaults: {
      groups: [
        {name: 'defaults', columns: 2},
      ],
      size: 'large'
  }
};

exports.fieldGroups = {
  defaults:[
    'userName',
    'pcName',
    {name: 'checkStatus', type: 'textarea', colspan:2},
    {name: 'unusualStatus', type: 'textarea', colspan: 2},
    {name: 'treatment', type: 'textarea', colspan: 2},
    {name: 'remark', type: 'textarea', colspan: 2}
  ]
};

exports['inline-grid'] = {
  columns: [
    'userName', 'pcName', 'checkStatus', 'remark'
  ]
};
