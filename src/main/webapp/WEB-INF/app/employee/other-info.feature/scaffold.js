var {mark}                    = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var _                         = require('underscore');

var {employeeInfo}            = com.zyeeda.business.employee.entity;

var {SecurityUtils}           = org.apache.shiro;
var {getOptionInProperties}   = require('cdeio/config');
var {join}                    = require('cdeio/util/paths');
var {SimpleDateFormat}        = java.text;
var {Date}                    = java.util;
var {ArrayList}               = java.util;
var URLDecoder                = java.net.URLDecoder;
var fs                        = require('fs');
var objects                   = require('cdeio/util/objects');
var response                  = require('ringo/jsgi/response');
var {createService}           = require('employee/other-info.feature/service');



exports.filters = {
  defaults: {
    '!employeeInfoFilter': ['otherInfos'],
    '!departmentFilter': ['parent(1)', 'children', 'accounts'],
    '!otherInfoFilter': ['']
  },
  accountsFilter: {
    '!departmentFilter': ['children', 'accounts']
  }
};

exports.haveFilter = true;


exports.entityLabel = '其他说明';

exports.labels = {
  project : '项目',
  content : '内容'

};
exports.forms = {
    edit: {
        groups: [
          {name: 'defaults', columns: 2},
        ],
        size: 'large'
    },
    show: {
        groups: [
          {name: 'defaults', columns: 2},
        ],
        size: 'large'
    },
    add: {
        groups: [
          {name: 'defaults', columns: 2},
        ],
        size: 'large'
    },
    filter: {
      groups: [{name: 'filter', columns: 1}], size: 'small'
    }
};
exports.fieldGroups = {
    defaults:[
     'project','content'
    ],
    inlineOtherInfoGrid: [{
      label: '其他说明',
      type: 'inline-grid',
      name: 'otherInfo',
      disableShow: true,
      allowAdd: true,
      multiple: false,
      allowPick: false
    }]
};

exports.grid = {
    columns: [
      'project','content'
    ],
    filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
};
exports['inline-grid'] = {
    columns: [
      'project','content'
    ]
};
exports.hooks = {
  beforeCreate: {
    defaults: mark('services', 'employee/other-info').on(function (otherInfoSvc,otherInfo) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      otherInfo.creator = user.accountName;
      otherInfo.creatorName = user.realName;
      otherInfo.createdTime = new Date();
    })
  },
  beforeUpdate: {
    defaults: function (otherInfo) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      otherInfo.lastModifier = user.accountName;
      otherInfo.lastModifierName = user.realName;
      otherInfo.lastModifiedTime = new Date();
    }
  }
};
