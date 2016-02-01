var {mark}                      = require('cdeio/mark');
var {json}                      = require('cdeio/response');
var _                           = require('underscore');
var fs                          = require('fs');
var objects                     = require('cdeio/util/objects');
var response                    = require('ringo/jsgi/response');
var {getOptionInProperties}     = require('cdeio/config');
var {join}                      = require('cdeio/util/paths');
var {createService}             = require('recruitment/recruitment-demand.feature/service');

var {RecruitmentDemand}         = com.zyeeda.business.recruitment.entity;
var {SecurityUtils}             = org.apache.shiro;

var {SimpleDateFormat}          = java.text;
var {Date}                      = java.util;
var {ArrayList}                 = java.util;
var URLDecoder                  = java.net.URLDecoder;

var {Boolean}                   = java.lang;

exports.haveFilter = true;

exports.service = function(service){
    return _.extend(service, createService());
};

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
   department: '部门名称',
  'department.name': '部门名称',
   post: '岗位名称',
   number: '需求人数',
   experience: '工作经验要求',
   education: '学历',
   major: '专业',
   workplace: '工作地点',
   isUrgent: '是否紧急',
   remark: '其他说明',
   appliedTime: '申请时间',
   enabled: '状态'
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
      'major','workplace',{name: 'isUrgent', type: 'dropdown', defaultValue: 1, source: [{id: 1, text: '紧急'}, {id: 2, text: '一般'}]},'applier','appliedTime',{name: 'remark', type: 'textarea', colspan: 2}
  ],
  filter: [
    'department.name','applier', 'post', 'workplace',{name: 'enabled', type: 'dropdown', source: [{id: 1, text: '开启'}, {id: 0, text: '关闭'}]}
  ],
};
exports.grid = {
    columns: [
      {name: 'department.name', header: '部门'},'post','number',
      'workplace',{name: 'isUrgent', renderer: 'modifyStatus'},
      {name: 'enabled', renderer: 'modifyEnabled'}
    ],
    filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'enabled-desc'
};
exports.operators = {
    close: { label: '关闭', icon: 'icon-off', group: '40-process', order: 20, show: 'single-selected', style: 'btn-success'},
    downloadImportTemplate: {label: '下载导入模板', icon: 'icon-cloud-download', group: '30-refresh', style: 'btn-info', show: 'unselected', order: 100},
    importXls: {label: '导入', icon: 'icon-download-alt', group: '30-refresh', style: 'btn-warning', show: 'unselected', order: 200},
    exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
}
exports.hooks = {
  beforeCreate: {
    defaults: mark('services', 'recruitment/recruitment-demand').on(function (recuritmentDemandSvc,recuritmentDemand) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      recuritmentDemand.creator = user.accountName;
      recuritmentDemand.creatorName = user.realName;
      recuritmentDemand.createdTime = new Date();
      recuritmentDemand.enabled = "1";
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

exports.exporting = {
    template: 'recruitment/recruitment-demand/recruitmentdemand.xls',
    fileName: 'recruitmentdemand'
};

exports.importing = {
    module: 'recruitmentDemand',
    enable: true,
    dateFormat: 'yyyy/MM/dd',
    template: 'recruitment/recruitment-demand/recruitmentdemand.xls',
    startRow: 2,
    mapping: [
        {name: 'department', column: 1, tileName: '部门名称', type: 'picker', isNull: false},
        {name: 'post', column: 2, tileName: '岗位名称', type: 'string', isNull: false},
        {name: 'number', column: 3, tileName: '需求人数', type: 'int', isNull: false},
        {name: 'experience', column: 4, tileName: '工作经验要求', type: 'string', isNull: false},
        {name: 'education', column: 5, tileName: '学历', type: 'string', isNull: false},
        {name: 'major', column: 6, tileName: '专业', type: 'string', isNull: false},
        {name: 'workplace', column: 7, tileName: '工作地点', type: 'string', isNull: true},
        {name: 'isUrgent', column: 8, tileName: '是否紧急', type: 'dropdown', isNull: true,
          source: [{id: '1', text: '紧急'}, {id: '0', text: '一般'}]
        },
        {name: 'applier', column: 9, tileName: '申请人', type: 'string', isNull: true},
        {name: 'appliedTime', column: 10, tileName: '申请时间', type: 'date', isNull: true},
        {name: 'enabled', column: 11, tileName: '状态', type: 'dropdown', isNull: true,
          source: [{id: '1', text: '启用'}, {id: '0', text: '关闭'}]
        },
        {name: 'remark', column: 12, tileName: '其他说明', type: 'string', isNull: true}
    ]
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
    }));

    router.post('/demand-close',mark('services', 'recruitment/recruitment-demand').on(function (recuritmentDemandSvc, request){
        var data = request.params;

        recuritmentDemandSvc.demandClose(data);

        return json({flag: true});
    }));

     //导入已有数据
    router.post('/import-excel', mark('services', 'commons/import-excel', 'recruitment/recruitment-demand').on(function (importXlsSvc, recruitmentDemandSvc, request) {
        var result, result2, saveAndCheckResult,
            rowNum, entityArray, i;

        entityArray = [];

        result = importXlsSvc.importExcel(request.params, exports.importing);

        rowNum = result.rowNum;

        for (i = 0; i < rowNum; i++) {
            entityArray.push(new RecruitmentDemand());
        }

        result2 = importXlsSvc.fillEntity(result.rowDataArray, exports.importing, entityArray);

        saveAndCheckResult = recruitmentDemandSvc.saveEntities(request.params, result2.entityArray, result);
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

            templateFilePath = join(getOptionInProperties('cdeio.webapp.path'), 'WEB-INF/module/import', getFileDirectoryByFilePath(exports.importing.template), URLDecoder.decode(getFileNameByFilePath(exports.importing.template), 'utf-8'));

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

        templateFilePath = join(getOptionInProperties('cdeio.webapp.path'), 'WEB-INF/module/import', getFileDirectoryByFilePath(exports.importing.template), URLDecoder.decode(getFileNameByFilePath(exports.importing.template), 'utf-8'));

        if(!fs.exists(templateFilePath)){
            return {result: "附件不存在"};
        }

        return response["static"](join(getOptionInProperties('cdeio.webapp.path'), 'WEB-INF/module/import', getFileDirectoryByFilePath(exports.importing.template), URLDecoder.decode(getFileNameByFilePath(exports.importing.template), 'utf-8')), 'application/vnd.ms-excel');
    });
    //导出数据
    router.get('/export-excel', mark('services', 'commons/export-excel', 'recruitment/recruitment-demand').on(function (exportXlsSvc, recruitmentDemandSvc, request) {
        var options = request.params,
            result;

        options = exportXlsSvc.dealParameters(options, recruitmentDemandSvc, new RecruitmentDemand());

        result = recruitmentDemandSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }))
}
