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
  }
};

exports.fieldGroups = {
  defaults:[
    'interviewTime','whetherSign','signReason','reexamine','reexamineReason','reexamineResult',
    'whetherEntry','remark'
  ],
  inlineRecruitmentInterviewGrid: [{
        label: '面试记录',
        type: 'inline-grid',
        name: 'recruitmentInterview',
        disableShow: true,
        allowAdd: true,
        allowEdit: true,
        multiple: false,
        allowPick: false
    }]
};
exports.grid = {
    columns: [
      'interviewTime','whetherSign','signReason','reexamine','reexamineReason','reexamineResult',
      'phoneNum','whetherEntry','remark'
    ],
    filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
};
exports['inline-grid'] = {
    columns: [
      'interviewTime',{name: 'whetherSign', renderer: 'modifyresult'},'signReason',
      {name:'reexamine',renderer: 'modifyresult'},'reexamineReason','reexamineResult',
    {name: 'whetherEntry',renderer: 'modifyresult'},'remark'
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
