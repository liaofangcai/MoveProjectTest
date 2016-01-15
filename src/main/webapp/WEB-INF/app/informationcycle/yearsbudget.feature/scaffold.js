var {mark}                  = require('cdeio/mark');
var {json}                  = require('cdeio/response');
var _                       = require('underscore');
var {YearsBudget}           = com.zyeeda.business.informationcycle.entity;
var {SecurityUtils}         = org.apache.shiro;
var {SimpleDateFormat}      = java.text;
var {Date}                  = java.util;

exports.haveFilter = true;

exports.enableFrontendExtension = true;

exports.filters = {
  defaults: {
    '!yearsBudgetFilter': '',
    '!yearsBudgetDetailFilter': 'yearsBudget',
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

exports.entityLabel = '年度预算';

exports.labels = {
  budgetNum: '预算单号',
  budgetName: '预算名称',
  years: '年度',
  department: '部门',
  'department.name': '部门',
  total: '预算合计',
  writer: '填写人',
  writeDate: '填写日期',
  reApproved: '复核',
  approved: '核准',
  remark: '备注'
};

exports.forms = {
  defaults: {
    groups: [
      {name: 'defaults', columns: 2},
      {name: 'inlineYearsBudgetDetailGrid', label: '年度预算明细'}
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
    'budgetNum', 'budgetName', 'years', 'department', 'writer', 'writeDate', 'total', 'reApproved',
    'approved', {name: 'remark', type: 'textarea', colspan: 2}
  ],
  filter: [
    'budgetNum', 'budgetName', 'years', 'department.name', 'writer', {name: 'writeDate', type: 'date-range'}
  ],
  inlineYearsBudgetDetailGrid:[
    {label: '年度预算明细', type: 'inline-grid', name: 'yearsBudgetDetails', allowPick: false, allowAdd: true, allowEdit: true}
  ]
};

exports.grid = {
  columns: [
    'budgetNum', 'budgetName', 'years',
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
    defaults: function (yearsBudget) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      yearsBudget.creator = user.accountName;
      yearsBudget.creatorName = user.realName;
      yearsBudget.createdTime = new Date();
    }
  },

  //编辑数据之前执行函数
  beforeUpdate: {
    defaults: function (yearsBudget) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      yearsBudget.lastModifier = user.accountName;
      yearsBudget.lastModifierName = user.realName;
      yearsBudget.lastModifiedTime = new Date();
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
