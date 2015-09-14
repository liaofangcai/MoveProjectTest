var {mark}                      = require('cdeio/mark');
var {json}                      = require('cdeio/response');
var _                           = require('underscore');

var {recruitmentResume}         = com.zyeeda.business.recruitment.entity;
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
    '!recruitmentResumeFilter': [''],
    '!recruitmentInterviewFilter': ['recruitmentResume'],
    '!accountFilter': ['']
  },
  accountsFilter: {
    '!accountFilter': ['roles'],
    '!departmentFilter': ['children', 'accounts']
  }
};

exports.entityLabel = '人才简历';

exports.labels = {
   name: '姓名',
   gender: '性别',
   post: '面试职位',
   idNum: '身份证号',
   education: '教育程度',
   major: '专业',
   phoneNum: '联系方式',
   email: '邮箱',
   graduateSchool: '毕业院校',
   workHistory: '曾就业单位',
   timeToWork: '参加工作时间',
   workYears: '工作年限',
   infoSources: '信息来源',
   buildTime: '创建时间',
   remark: '备注',
   attachments:  '附件'
};

exports.forms = {
  add: {
    groups: [
      {name: 'defaults', columns: 2},
      'inlineRecruitmentInterviewGrid'
    ],
    size: 'large'
  },
  edit: {
    groups: [
      {name: 'defaults', columns: 2},
      'inlineRecruitmentInterviewGrid'
    ],
    size: 'large'
  },
  show: {
    groups: [
      {name: 'defaults', columns: 2},
      'inlineRecruitmentInterviewGrid'
    ],
    size: 'large'
  },
  filter: {
    groups: [{name: 'filter', columns: 1}], size: 'small'
  },
};

exports.fieldGroups = {
  defaults:[
      'name',{name: 'gender', type: 'dropdown', defaultValue: true, source: [{id: true, text: '男'}, {id: false, text: '女'}]},'post','idNum','education',
      'major','phoneNum','email','graduateSchool','workHistory','timeToWork','workYears','infoSources','buildTime',
      {name: 'remark', type: 'textarea', colspan: 2},
      {name: 'attachments',
        colspan: 2,
        type: 'file-picker',
        multiple: true,
        url: 'invoke/system/upload',
        acceptFileTypes: "(\\.|\\/)(swf|mp4|avi|wmv|doc|docx|xls|xlsx|ppt|pptx|zip|rar|7z|pdf|txt|jpg|jpeg|png|gif)$"}
  ],
  inlineRecruitmentInterviewGrid:[
      {label: '面试记录', type: 'inline-grid', name: 'recruitmentInterviews', allowPick: false, allowEdit: true, allowAdd: true}
  ],
  filter: [
    'name', 'post', 'education','major','phoneNum'
  ],

};
exports.grid = {
    columns: [
     'name',{name: 'gender', renderer: 'modifyStatus'},'post','education','major','phoneNum'
    ],
    filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
};

exports.hooks = {
  beforeCreate: {
    defaults: mark('services', 'recruitment/recruitment-resume').on(function (recuritmentResumeSvc,recuritmentResume) {
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
  },
  beforeRemove: {
    defaults: mark('services', 'recruitment/recruitment-interview').on(function (recruitmentInterviewSvc, recruitmentResume) {

      recruitmentInterviewSvc.removeInterviewByResumeId(recruitmentResume.id);
    }),
  }

};
exports.doWithRouter = function(router) {
  //取当前时间
    router.get('/get-current-info', mark('services', 'system/accounts').on(function (accountSvc, request) {
        var date = new Date(),
            sd = new SimpleDateFormat("yyyy-MM-dd"),
            createdTime,
            result = {};
            result.createdTime =  sd.format(date);
            createdTime = sd.format(date);
        return json({result: result}, exports.filters.accountsFilter);
    }))
}
