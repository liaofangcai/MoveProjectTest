var {mark}                      = require('cdeio/mark');
var {json}                      = require('cdeio/response');
var _                           = require('underscore');

var {RecruitmentResume}         = com.zyeeda.business.recruitment.entity;
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
    '!accountFilter': [''],
    '!attachmentFilter': ['']
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
   education: '学历',
   major: '专业',
   phoneNum: '联系方式',
   email: '邮箱',
   graduateSchool: '毕业院校',
   workHistory: '曾就业单位',
   timeToWork: '参加工作时间',
   workYears: '工作年限',
   infoSources: '信息来源',
   buildTime: '创建日期',
   remark: '其他说明',
   attachments:  '附件'
};

exports.forms = {
  add: {
    groups: [
      {name: 'defaults', columns: 2},
      {name: 'inlineRecruitmentInterviewGrid', label: '面试记录'}
    ],
    size: 'large'
  },
  edit: {
    groups: [
      {name: 'defaults', columns: 2},
      {name: 'inlineRecruitmentInterviewGrid', label: '面试记录'}
    ],
    size: 'large'
  },
  show: {
    groups: [
      {name: 'defaults', columns: 2},
      {name: 'inlineRecruitmentInterviewGrid', label: '面试记录'}
    ],
    size: 'large'
  },
  filter: {
    groups: [{name: 'filter', columns: 1}], size: 'small'
  },
};

exports.fieldGroups = {
  defaults:[
      'name',{name: 'gender', type: 'dropdown', defaultValue: 1, source: [{id: 1, text: '男'}, {id: 0, text: '女'}]},'post','idNum','education',
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
  ]
};
exports.grid = {
    columns: [
     'name',{name: 'gender', renderer: 'modifyGender'},'post','education','major','phoneNum'
    ],
    filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
};
exports.operators = {
  downloadImportTemplate: {label: '下载导入模板', icon: 'icon-cloud-download', group: '30-refresh', style: 'btn-info', show: 'unselected', order: 100},
  importXls: {label: '导入', icon: 'icon-download-alt', group: '30-refresh', style: 'btn-warning', show: 'unselected', order: 200},
  exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
}
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
exports.importing = {
    module: 'recruitmentResume',
    enable: true,
    dateFormat: 'yyyy/MM/dd',
    template: 'recruitment/recruitment-resume/人才简历信息.xls',
    startRow: 2,
    mapping: [
        {name: 'name', column: 1, tileName: '姓名', type: 'string', isNull: false, unique: true},
        {name: 'gender', column: 2, tileName: '性别', type: 'dropdown', isNull: false,defaultValue: 1, source: [{id: '1', text: '男'}, {id: '0', text: '女'}]
        },
        {name: 'post', column: 3, tileName: '面试职位', type: 'string', isNull: false},
        {name: 'idNum', column: 4, tileName: '身份证号', type: 'string', isNull: false},
        {name: 'education', column: 5, tileName: '学历', type: 'string', isNull: false},
        {name: 'major', column: 6, tileName: '专业', type: 'string', isNull: false},
        {name: 'phoneNum', column: 7, tileName: '联系方式', type: 'string', isNull: false},
        {name: 'email', column: 8, tileName: '邮箱', type: 'string', isNull: false},
        {name: 'graduateSchool', column: 9, tileName: '毕业院校', type: 'string', isNull: true},
        {name: 'workHistory', column: 10, tileName: '曾就业单位', type: 'string', isNull: true},
        {name: 'timeToWork', column: 11, tileName: '参加工作时间', type: 'date', isNull: true},
        {name: 'workYears', column: 12, tileName: '工作年限', type: 'string', isNull: true},
        {name: 'infoSources', column: 13, tileName: '信息来源', type: 'string', isNull: true},
        {name: 'buildTime', column: 14, tileName: '创建日期', type: 'date', isNull: true},
        {name: 'remark', column: 15, tileName: '其他说明', type: 'string', isNull: true}
    ]
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
    }));

     //导入已有数据
    router.post('/import-excel', mark('services', 'commons/import-excel', 'recruitment/recruitment-resume').on(function (importXlsSvc, recruitmentResumeSvc, request) {
        var result, result2, saveAndCheckResult,
            rowNum, entityArray, i;

        entityArray = [];
        result = importXlsSvc.importExcel(request.params, exports.importing);
        rowNum = result.rowNum;

        for (i = 0; i < rowNum; i++) {
            entityArray.push(new RecruitmentResume());
        }

        result2 = importXlsSvc.fillEntity(result.rowDataArray, exports.importing, entityArray);
        saveAndCheckResult = recruitmentResumeSvc.saveEntities(request.params, result2.entityArray, result);
        result.failRowIdxes = saveAndCheckResult.failRowIdxes;
        result.repeatRowIdxes = saveAndCheckResult.repeatRowIdxes;

        return json({
            entityArray: result2.entityArray,
            pickerFields: result.pickerFields,
            specialFields: result.specialFields,
            failRowIdxes: result.failRowIdxes,
            repeatRowIdxes: result.repeatRowIdxes,
            successNum: result2.entityArray.length
        }, exports.filters.defaults);
    }));
    //下载导入模板地址设置
    router.get('/configuration/importsettings', function (request) {
        var getFileDirectoryByFilePath, getFileNameByFilePath, templateFilePath;

        getFileDirectoryByFilePath = function(filePath) {
            return filePath.substring(0, filePath.lastIndexOf('/'));
        };
        getFileNameByFilePath = function(filePath) {
            return filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
        };

        if(exports.importing && exports.importing.enable === true){

            templateFilePath = join(getOptionInProperties('cdeio.webapp.path'), 'module/import', getFileDirectoryByFilePath(exports.importing.template), URLDecoder.decode(getFileNameByFilePath(exports.importing.template), 'utf-8'));

            if(!fs.exists(templateFilePath)){
                return json({templateExists: false});
            }

            return json(objects.extend(exports.importing, {filename: getFileNameByFilePath(exports.importing.template)}));
        }

        return json({exportEnable: false});
    });

    //下载导入模板
    router.get('/down-import-template/:filename', function(request, filename) {
        var getFileDirectoryByFilePath, getFileNameByFilePath, templateFilePath;

        getFileDirectoryByFilePath = function(filePath) {
            return filePath.substring(0, filePath.lastIndexOf('/'));
        };
        getFileNameByFilePath = function(filePath) {
            return filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
        };

        templateFilePath = join(getOptionInProperties('cdeio.webapp.path'), 'module/import', getFileDirectoryByFilePath(exports.importing.template), URLDecoder.decode(getFileNameByFilePath(exports.importing.template), 'utf-8'));

        if(!fs.exists(templateFilePath)){
            return {result: "附件不存在"};
        }

        return response["static"](join(getOptionInProperties('cdeio.webapp.path'), 'module/import', getFileDirectoryByFilePath(exports.importing.template), URLDecoder.decode(getFileNameByFilePath(exports.importing.template), 'utf-8')), 'application/vnd.ms-excel');
    });
}
