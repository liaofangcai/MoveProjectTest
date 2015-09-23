var {mark}                      = require('cdeio/mark');
var {json}                      = require('cdeio/response');
var _                           = require('underscore');

var {recruitmentInterview}         = com.zyeeda.business.recruitment.entity;
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
    '!recruitmentInterviewFilter': [''],
    '!accountFilter': [''],
    '!recruitmentResumeFilter': ['recruitmentInterviews']
  },
  accountsFilter: {
    '!accountFilter': ['roles'],
    '!recruitmentInterviewFilter': ['']
  }
};

exports.entityLabel = '面试记录';

exports.labels = {
   interviewTime: '面试时间',
   whetherSign: '是否签到',
   signReason: '未签到原因',
   reexamine: '是否复试',
   reexamineReason: '未复试原因',
   reexamineResult: '复试结果',
   phoneNum: '联系方式',
   whetherEntry: '是否入职',
   remark: '备注',
};

exports.forms = {
  add: {
    groups: [{name: 'interviewTime',  labelOnTop: true, label: '面试时间'},
             {name: 'whetherSign', labelOnTop: true, label: '是否签到'},
             {name: 'noSignReason', visible: false, labelOnTop: true, label: '未签到原因'},
             {name: 'reexamine', labelOnTop: true, label: '是否复试'},
             {name: 'reexamineReason', visible: false, labelOnTop: true, label: '未复试原因'},
             {name: 'reexamineResult', labelOnTop: true, label: '复试结果'},
             {name: 'whetherEntry', labelOnTop: true, label: '是否入职'},
             {name: 'remark', labelOnTop: true, label: '备注'}]
  },
  edit: {
    groups: [{name: 'interviewTime',  labelOnTop: true, label: '面试时间'},
             {name: 'whetherSign', labelOnTop: true, label: '是否签到'},
             {name: 'noSignReason', visible: false, labelOnTop: true, label: '未签到原因'},
             {name: 'reexamine', labelOnTop: true, label: '是否复试'},
             {name: 'reexamineReason', visible: false, labelOnTop: true, label: '未复试原因'},
             {name: 'reexamineResult', labelOnTop: true, label: '复试结果'},
             {name: 'whetherEntry', labelOnTop: true, label: '是否入职'},
             {name: 'remark', labelOnTop: true, label: '备注'}]
  },
  show: {
    groups: [{name: 'interviewTime',  labelOnTop: true, label: '面试时间'},
             {name: 'whetherSign', labelOnTop: true, label: '是否签到'},
             {name: 'noSignReason', visible: true, labelOnTop: true, label: '未签到原因'},
             {name: 'reexamine', labelOnTop: true, label: '是否复试'},
             {name: 'reexamineReason', visible: true, labelOnTop: true, label: '未复试原因'},
             {name: 'reexamineResult', labelOnTop: true, label: '复试结果'},
             {name: 'whetherEntry', labelOnTop: true, label: '是否入职'},
             {name: 'remark', labelOnTop: true, label: '备注'}]
  },
  filter: {
    groups: [{name: 'filter', columns: 1}], size: 'normal'
  }
};

exports.fieldGroups = {
  interviewTime:[
    'interviewTime'
  ],
  whetherSign:[
    {name:'whetherSign', defaultValue: 'true'}
  ],
  noSignReason: [
    'signReason'
  ],
  reexamine : [
    {name:'reexamine', defaultValue: 'true'}
  ],
  reexamineReason: [
    'reexamineReason'
  ],
  reexamineResult: [
    'reexamineResult'
  ],
  whetherEntry:[
    'whetherEntry'
  ],
  remark: [
    'remark'
  ]
};
exports.grid = {
    columns: [
      'interviewTime', 'whetherSign', 'signReason', 'reexamine',
      'reexamineReason', 'reexamineResult',
      'whetherEntry', 'remark'
    ],
    filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
};
exports['inline-grid'] = {
    columns: [
      'interviewTime',{name: 'whetherSign', renderer: 'modifySignin'}, 'signReason',
      {name:'reexamine', renderer: 'modifySignin'}, 'reexamineReason', 'reexamineResult',
      {name: 'whetherEntry',renderer: 'modifySignin'}, 'remark'
    ]
};

exports.hooks = {
  beforeCreate: {
    defaults: mark('services', 'recruitment/recruitment-interview').on(function (recruitmentInterviewSvc,recruitmentInterview) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      recuritmentResume.creator = user.accountName;
      recuritmentResume.creatorName = user.realName;
      recuritmentResume.createdTime = new Date();
    })
  },
  beforeUpdate: {
    defaults: function (recuritmentResume) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      recuritmentResume.lastModifier = user.accountName;
      recuritmentResume.lastModifierName = user.realName;
      recuritmentResume.lastModifiedTime = new Date();
    }
  }
};
