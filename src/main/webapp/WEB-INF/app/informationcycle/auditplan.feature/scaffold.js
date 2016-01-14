var {mark}                  = require('cdeio/mark');
var {json}                  = require('cdeio/response');
var _                       = require('underscore');
var {AuditPlan}             = com.zyeeda.business.informationcycle.entity;
var {SecurityUtils}         = org.apache.shiro;
var {SimpleDateFormat}      = java.text;
var {Date}                  = java.util;

exports.haveFilter = true;

exports.enableFrontendExtension = true;

exports.filters = {
  defaults: {
    '!auditPlanFilter': '',
    '!auditPlanDetailFilter': 'auditPlan',
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

exports.entityLabel = '稽核计划';

exports.labels = {
  planNum: '稽核计划单号',
  planName: '稽核计划名称',
  years: '年度',
  department: '部门',
  'department.name': '部门',
  writer: '填写人',
  writeDate: '填写日期',
  manager: '部门主管',
  executeMan: '执行稽核人员',
  remark: '备注'
};

exports.forms = {
  defaults: {
    groups: [
      {name: 'defaults', columns: 2},
      {name: 'inlineAuditPlanDetailGrid', label: '稽核计划明细'}
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
    'planNum', 'planName', 'years', 'department', 'writer', 'writeDate', 'manager', 'executeMan',
    {name: 'remark', type: 'textarea', colspan: 2}
  ],
  filter: [
    'planNum', 'planName', 'years', {name: 'department', header: '部门'}, 'writer', {name: 'writeDate', type: 'date-range'}
  ],
  inlineAuditPlanDetailGrid:[
    {label: '稽核计划明细', type: 'inline-grid', name: 'auditPlanDetails', allowPick: false, allowAdd: true,
    allowEdit: true}
  ]
};

exports.grid = {
  columns: [
    'planNum', 'planName', 'years',
    {name: 'department.name', header: '部门'},
    'writer', 'writeDate',
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
    defaults: function (auditPlan) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      auditPlan.creator = user.accountName;
      auditPlan.creatorName = user.realName;
      auditPlan.createdTime = new Date();
    }
  },

  //编辑数据之前执行函数
  beforeUpdate: {
    defaults: function (auditPlan) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      auditPlan.lastModifier = user.accountName;
      auditPlan.lastModifierName = user.realName;
      auditPlan.lastModifiedTime = new Date();
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
