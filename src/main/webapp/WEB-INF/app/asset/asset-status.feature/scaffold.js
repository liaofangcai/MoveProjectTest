var {mark}                    = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var _                         = require('underscore');


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
var {createService}           = require('asset/asset-status.feature/service');

exports.service = function(service){
    return _.extend(service, createService());
};

exports.filters = {
  defaults: {
    '!assetManageFilter': ['assetStatus'],
    '!departmentFilter': ['parent(1)', 'children', 'accounts'],
    '!assetStatusFilter': ['']
  },
};

exports.entityLabel = '其他说明';

exports.labels = {
  userName : '使用人',
  startDate : '开始时间',
  endDate: '结束时间',
  remark: '备注'

};
exports.forms = {
    edit: {
        groups: [
          {name: 'defaults'},
        ],
        size: 'large'
    },
    show: {
        groups: [
          {name: 'defaults'},
        ],
        size: 'large'
    },
    add: {
        groups: [
          {name: 'defaults'},
        ],
        size: 'large'
    }

};
exports.fieldGroups = {
    defaults:[
      {name: 'userName', colspan: 2}, 'startDate', 'endDate', {name: 'remark', type: 'textarea', colspan: 2}
    ],
    inlineAssetStatusGrid: [{
      label: '其他说明',
      type: 'inline-grid',
      name: 'assetStatus',
      disableShow: true,
      allowAdd: true,
      multiple: false,
      allowPick: false
    }]
};

exports['inline-grid'] = {
    columns: [
      'userName', 'startDate', 'endDate', {name: 'remark', width: 400}
    ]
};
exports.hooks = {
  beforeCreate: {
    defaults: mark('services', 'asset/asset-status').on(function (assetStatusSvc,assetStatus) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      assetStatus.creator = user.accountName;
      assetStatus.creatorName = user.realName;
      assetStatus.createdTime = new Date();
    })
  },
  beforeUpdate: {
    defaults: function (assetStatus) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      assetStatus.lastModifier = user.accountName;
      assetStatus.lastModifierName = user.realName;
      assetStatus.lastModifiedTime = new Date();
    }
  }
};
