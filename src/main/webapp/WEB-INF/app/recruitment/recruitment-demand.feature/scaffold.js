var {mark}                      = require('cdeio/mark');
var {json}                      = require('cdeio/response');
var _                           = require('underscore');

var {recruitmentDemand}         = com.zyeeda.business.recruitment.entity;
var {SecurityUtils}             = org.apache.shiro;

var {getOptionInProperties}     = require('cdeio/config');
var {join}                      = require('cdeio/util/paths');

var {SimpleDateFormat}          = java.text;
var {Date}                      = java.util;
var {ArrayList}                 = java.util;
var URLDecoder                  = java.net.URLDecoder;

var fs                          = require('fs');
var objects                     = require('cdeio/util/objects');
var response                    = require('ringo/jsgi/response');


exports.haveFilter = true;

exports.enableFrontendExtension = true;


exports.filters = {
  defaults: {
    '!recruitmentDemandFilter': [''],
    '!departmentFilter': ['parent(1)', 'children', 'accounts'],
    '!accountFilter': ['']
  },
  accountsFilter: {
    '!accountFilter': ['roles'],
    '!departmentFilter': ['children', 'accounts']
  }
};

exports.entityLabel = '招聘需求';

exports.labels = {
   applier: '申请人',
  'applier.realName': '申请人',
   department: '部门',
  'department.name': '部门',
   post: '岗位名称',
   number: '人数',
   experience: '工作经验要求',
   education: '学历',
   major: '专长',
   workplace: '工作地点',
   isUrgent: '是否紧急',
   remark: '备注',
   appliedTime: '创建时间',
};

exports.forms = {
  add: {
    groups: [
      {name: 'defaults', columns: 2}
    ],
    size: 'large'
  },
  edit: {
    groups: [
      {name: 'defaults', columns: 2}
    ],
    size: 'large'
  },
  show: {
    groups: [
      {name: 'defaults', columns: 2}
    ],
    size: 'large'
  },
  filter: {
    groups: [{name: 'filter', columns: 1}], size: 'small'
  },
};


exports.fieldGroups = {
  defaults:[
      'department','post','number','experience','education',
      'major','workplace',{name: 'isUrgent', type: 'dropdown', defaultValue: true, source: [{id: true, text: '紧急'}, {id: false, text: '一般'}]},'applier','appliedTime',{name: 'remark', type: 'textarea', colspan: 2}
  ],
  filter: [
    'applier', 'post','number', 'education','workplace'
  ],
};
exports.grid = {
    columns: [
      {name: 'department.name', header: '部门'},'post','number','experience','education',
      'major','workplace',{name: 'isUrgent', renderer: 'modifyStatus'}, 'remark'
    ],
    filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
};
exports.hooks = {
  beforeCreate: {
    defaults: mark('services', 'recruitment/recruitment-demand').on(function (recuritmentDemandSvc,recuritmentDemand) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      recuritmentDemand.creator = user.accountName;
      recuritmentDemand.creatorName = user.realName;
      recuritmentDemand.createdTime = new Date();
    })
  },
  beforeUpdate: {
    defaults: function (recruitmentDemand) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      recruitmentDemand.lastModifier = user.accountName;
      recruitmentDemand.lastModifierName = user.realName;
      recruitmentDemand.lastModifiedTime = new Date();
    }
  }
};
exports.doWithRouter = function(router) {
  //取当前时间、登录人、登录人所在部门
    router.get('/get-current-info', mark('services', 'system/accounts').on(function (accountSvc, request) {
        var date = new Date(),
            sd = new SimpleDateFormat("yyyy-MM-dd"),
            createdTime,
            result = {},
            currentUserId = SecurityUtils.getSubject().getPrincipal().id,
            account = accountSvc.getById(currentUserId);

            result.applier = account;
            result.department = account.department;
            result.createdTime =  sd.format(date);
            createdTime = sd.format(date);
        return json({result: result}, exports.filters.accountsFilter);
    }))
}
