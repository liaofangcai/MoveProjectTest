var {mark}                  = require('cdeio/mark');
var {json}                  = require('cdeio/response');
var _                       = require('underscore');
var {YearsPlan}             = com.zyeeda.business.informationcycle.entity;
var {SecurityUtils}         = org.apache.shiro;
var {SimpleDateFormat}      = java.text;
var {Date}                  = java.util;

exports.haveFilter = true;

exports.enableFrontendExtension = true;

exports.filters = {
  defaults: {
    '!yearsPlanFilter': '',
    '!yearsPlanDetailFilter': 'yearsPlan',
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

exports.entityLabel = '年度计划';

exports.labels = {
  planNum: '计划单号',
  planName: '计划名称',
  years: '年度',
  department: '部门',
  'department.name': '部门',
  goal: '目标',
  assessCycle: '评估周期(月/季)',
  writer: '填写人',
  writeDate: '填写日期',
  manager: '部门主管',
  remark: '备注'
};

exports.forms = {
  defaults: {
    groups: [
      {name: 'defaults', columns: 2},
      {name: 'inlineYearsPlanDetailGrid', label: '年度计划明细'}
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
    'planNum', 'planName', 'years', 'department', 'goal', 'assessCycle', 'writer', 'writeDate', 'manager',
    {name: 'remark', type: 'textarea', colspan: 2}
  ],
  filter: [
    'planNum', 'planName', 'years', {name: 'department', header: '部门'}, 'writer', {name: 'writeDate', type: 'date-range'}
  ],
  inlineYearsPlanDetailGrid:[
    {label: '年度计划明细', type: 'inline-grid', name: 'yearsPlanDetails', allowPick: false, allowAdd: true,
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
    defaults: function (yearsPlan) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      yearsPlan.creator = user.accountName;
      yearsPlan.creatorName = user.realName;
      yearsPlan.createdTime = new Date();
    }
  },

  //编辑数据之前执行函数
  beforeUpdate: {
    defaults: function (yearsPlan) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      yearsPlan.lastModifier = user.accountName;
      yearsPlan.lastModifierName = user.realName;
      yearsPlan.lastModifiedTime = new Date();
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
