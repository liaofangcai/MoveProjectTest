var {mark}                    = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var _                         = require('underscore');
var {SoftwareInstall}         = com.zyeeda.business.informationcycle.entity;
var {SecurityUtils}           = org.apache.shiro;
var {SimpleDateFormat}        = java.text;
var {Date}                    = java.util;

exports.haveFilter = true;

exports.enableFrontendExtension = true;

exports.filters = {
  defaults: {
    '!softwareInstallFilter': '',
    '!softwareInstallDetailFilter': 'softwareInstall',
    '!accountFilter': [''],
    '!departmentFilter': ['parent(1)', 'children', 'accounts'],
    '!roleFilter': ['department', 'accounts'],
    '!permissionFilter': ['roles'],
  },
  accountsFilter: {
    '!accountFilter': ['roles'],
    '!departmentFilter': ['children', 'accounts']
  }
};

exports.entityLabel = '软件安装情况清查';

exports.labels = {
  checkNum: '清查单号',
  checkName: '清查名称',
  sysName: '系统名称',
  years: '年度',
  checkMan: '检查人',
  checkDate: '检查日期',
  manager: '部门主管',
  remark: '备注'
};

exports.forms = {
  defaults: {
    groups: [
      {name: 'defaults', columns: 2},
      {name: 'inlineSoftwareInstallDetailGrid', label: '软件安装情况清查明细'}
    ],
    size: 'large'
  },
  filter: {
    groups: [{name: 'filter', columns: 2}],
    size: 'large'
  }
};

exports.fieldGroups = {
  defaults: [
    'checkNum', 'checkName', 'sysName', 'years', 'checkMan', 'checkDate', 'manager',
    {name: 'remark', type: 'textarea', colspan: 2}
  ],
  filter: [
    'checkNum', 'checkName', 'sysName', 'years', 'checkMan', {name: 'checkDate', type: 'date-range'}
  ],
  inlineSoftwareInstallDetailGrid:[
    {label: '系统账号权限清查明细', type: 'inline-grid', name: 'softwareInstallDetails', allowPick: false, allowAdd: true, allowEdit: true}
  ]
};

exports.grid = {
  columns: [
    'checkNum', 'checkName', 'sysName', 'years', 'checkMan', 'checkDate'
  ],
  filterToolbar: true,
  fixedHeader: true,
  numberColumn: true,
  multiple: true,
  defaultOrder: 'createdTime-desc'
};

//相关数据处理
exports.hooks = {
  //创建数据之前执行函数
  beforeCreate: {
    defaults: function (softwareInstall) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      softwareInstall.creator = user.accountName;
      softwareInstall.creatorName = user.realName;
      softwareInstall.createdTime = new Date();
    }
  },

  //编辑数据之前执行函数
  beforeUpdate: {
    defaults: function (softwareInstall) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      softwareInstall.lastModifier = user.accountName;
      softwareInstall.lastModifierName = user.realName;
      softwareInstall.lastModifiedTime = new Date();
    }
  }
};

//请求处理
exports.doWithRouter = function(router) {
  //取当前时间、登录人、登录人所在部门
  router.get('/get-current-info', mark('services', 'system/accounts').on(function (accountSvc, request) {
    var createdTime, date, sd, result, currentUserId, account;

    date = new Date(),
    sd = new SimpleDateFormat("yyyy-MM-dd"),
    result = {},
    currentUserId = SecurityUtils.getSubject().getPrincipal().id,
    account = accountSvc.getById(currentUserId);

    result.applier = account;
    result.department = account.department;
    result.createdTime =  sd.format(date);
    createdTime = sd.format(date);

    return json({result: result}, exports.filters.accountsFilter);
  }));
};
