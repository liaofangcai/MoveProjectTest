var {mark}                      = require('cdeio/mark');
var {json}                      = require('cdeio/response');
var _                           = require('underscore');
var {SysPermissionCheckDetail}  = com.zyeeda.business.informationcycle.entity;
var {SecurityUtils}             = org.apache.shiro;
var {SimpleDateFormat}          = java.text;
var {Date}                      = java.util;

exports.filters = {
  defaults: {
    '!sysPermissionCheckDetailFilter': 'sysPermissionCheck',
    '!sysPermissionCheckFilter': ''
  }
};

exports.entityLabel = '系统账号权限清查明细';

exports.labels = {
  accountName: '账号名称',
  userName: '用户名称',
  accountType: '账号类型',
  startDate: '开始日期',
  ifInUse: '是否仍在使用',
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
    'accountName',
    'userName',
    'accountType',
    'startDate',
    {name: 'ifInUse', type: 'dropdown', defaultValue: 'in', source: [{id: 'in', text: '在用'}, {id: 'notIn', text: '停用'}]},
    {name: 'remark', type: 'textarea', colspan: 2}
  ]
};

exports['inline-grid'] = {
  columns: [
    'accountName', 'userName', 'accountType', 'startDate', {name: 'ifInUse', header: '是否仍在使用', renderer: 'useStatus'}
  ]
};
