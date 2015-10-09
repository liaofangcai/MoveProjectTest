var {mark}                  = require('cdeio/mark');
var {json}                  = require('cdeio/response');
var _                       = require('underscore');
var {DaysoffApply}          = com.zyeeda.business.attendance.entity;
var {SecurityUtils}         = org.apache.shiro;
var {getOptionInProperties} = require('cdeio/config');
var {join}                  = require('cdeio/util/paths');
var {SimpleDateFormat}      = java.text;
var {Date}                  = java.util;
var {ArrayList}             = java.util;
var URLDecoder              = java.net.URLDecoder;
var fs                      = require('fs');
var objects                 = require('cdeio/util/objects');
var response                = require('ringo/jsgi/response');
var {createService}         = require('attendance/daysoff-apply.feature/service');


exports.haveFilter = true;

exports.service = function(service){
    return _.extend(service, createService());
};

exports.enableFrontendExtension = true;


exports.filters = {
  defaults: {
    '!daysoffApplyFilter': [''],
    '!accountFilter': [''],
    '!departmentFilter': ['parent(1)', 'children', 'accounts'],
    '!roleFilter': ['department', 'accounts'],
    '!permissionFilter': ['roles'],
    '!attachmentFilter': '',
    '!approvalHistoryFilter': ['businessDefinition', 'processTaskInfo'],
    '!overWorkApplyFilter': ['daysoffApply']
  },
  accountsFilter: {
    '!accountFilter': ['roles'],
    '!departmentFilter': ['children', 'accounts']
  }
};

exports.entityLabel = '调休申请单';

exports.labels = {
  applyNo: '申请单号',
  applier: '申请人',
  'applier.realName': '申请人',
  department: '部门',
  'department.name': '部门',
  appliedDate: '申请日期',
  job: '职位  ',
  daysoffBeginDate: '调休开始时间',
  daysoffEndDate: '调休结束时间',
  totalTime: '调休合计时间',
  overWorkApply: '加班单号',
  'overWorkApply.applyNo': '加班单号',
  daysoffReason: '调休事由',
  flowStatus: '状态'
};
exports.forms = {
  defaults: {
    groups: [
      {name: 'defaults', columns: 2}
    ],
    size: 'large'
  },

  show: {
    groups: [
      {name: 'showFormWithApplyNolGroup', columns: 2}
    ],
    size: 'large'
  },
  filter: {
    groups: [{name: 'filter', columns: 1}],
    size: 'small'
  },
  audit: {
    groups: [
      {name: 'withApplyNoGroup',columns: 2},
      {name: 'audit', label: '审批信息'}
    ],
    size: 'large'
  }
};

exports.feature = {
  views: ['form:audit']
};

exports.fieldGroups = {
  defaults: [
    {name: 'applier', textKey: 'realName'}, 'appliedDate', 'department', 'job',
    {name: 'daysoffBeginDate',type: 'datetimepicker', statusChanger: true}, {name: 'daysoffEndDate',type:'datetimepicker', statusChanger: true}, 'totalTime', {name: 'overWorkApply', textKey: 'applyNo'},
    {name: 'daysoffReason', type: 'textarea', colspan: 2}
  ],
  showFormWithApplyNolGroup: [
    {name:'applyNo', colspan: 2}, 'applier.realName', 'appliedDate', 'department', 'job',
    'daysoffBeginDate', 'daysoffEndDate', 'totalTime', 'overWorkApply.applyNo',
    {name: 'daysoffReason', type: 'textarea', colspan: 2}
  ],
  withApplyNoGroup: [
    {name:'applyNo', colspan: 2}, {name: 'applier', textKey: 'realName'}, 'appliedDate', 'department', 'job',
    'daysoffBeginDate', 'daysoffEndDate', 'totalTime', {name: 'overWorkApply', textKey: 'applyNo'},
    {name: 'daysoffReason', type: 'textarea', colspan: 2}
  ],
  filter: [
    'applyNo','applier.realName', {name: 'appliedDate', type: 'date-range' }, 'department.name'
  ],
  audit: [
    {name: 'flowComment', label: '审批结果', type: 'dropdown', source: [{id: '1', text: '同意'}, {id: '2', text: '不同意'}], required: true, validations: {rules: {required: true}}},
    {name: 'flowSuggestion', label: '审批意见', type: 'textarea', colspan: 2}
  ]
};
exports.grid = {
    columns: [
      'applyNo',
      {name: 'applier.realName', header: '申请人'},
      {name: 'department.name', header: '部门'},'appliedDate',
      'job',
      {name: 'flowStatus', renderer: 'modifyStatus'}

    ],
    filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
};
exports.operators = {
    sendProcess: { label: '上报', icon: 'icon-envelope-alt', group: '40-process', order: 10, show: 'single-selected', style: 'btn-pink'},
    retrieve: { label: '取回', icon: 'icon-undo', group: '40-process', order: 20, show: 'single-selected', style: 'btn-success'},
    downloadImportTemplate: {label: '下载导入模板', icon: 'icon-cloud-download', group: '30-refresh', style: 'btn-info', show: 'unselected', order: 100},
    importXls: {label: '导入', icon: 'icon-download-alt', group: '30-refresh', style: 'btn-warning', show: 'unselected', order: 200},
    exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 300, show: 'unselected', style: 'btn-pink' }
};
exports.hooks = {
  //创建数据之前执行函数
  beforeCreate: {
    defaults: mark('services', 'attendance/daysoff-apply').on(function (daysoffApplySvc, daysoffApply) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      daysoffApply.applyNo = daysoffApplySvc.autoGenerateNo();
      daysoffApply.creator = user.accountName;
      daysoffApply.creatorName = user.realName;
      daysoffApply.createdTime = new Date();
      daysoffApply.flowStatus = '0';
    })
  },

  //编辑数据之前执行函数
  beforeUpdate: {
    defaults: function (daysoffApplySvc) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      daysoffApply.lastModifier = user.accountName;
      daysoffApply.lastModifierName = user.realName;
      daysoffApply.lastModifiedTime = new Date();
    }
  }
};

exports.exporting = {
    template: 'attendance/daysoff-apply/daysoffApplyModule.xls',
    fileName: '调休申请信息'
};
// 报告导入
exports.importing = {
    module: 'daysoffApply',
    enable: true,
    dateFormat: 'yyyy/MM/dd',
    template: 'attendance/daysoff-apply/调休申请信息.xls',
    startRow: 2,
    mapping: [
        {name: 'applyNo', column: 1, tileName: '申请单号', type: 'string', isNull: false, unique: true},
        {name: 'applier', column: 2, tileName: '申请人', type: 'picker', isNull: false},
        {name: 'appliedDate', column: 3, tileName: '申请日期', type: 'date', isNull: false},
        {name: 'department', column: 4, tileName: '部门', type: 'picker', isNull: false},
        {name: 'job', column: 5, tileName: '职位', type: 'string', isNull: false},
        {name: 'daysoffBeginDate', column: 6, tileName: '调休开始时间', type: 'date', isNull: false},
        {name: 'daysoffEndDate', column: 7, tileName: '调休结束时间', type: 'date', isNull: false},
        {name: 'totalTime', column: 8, tileName: '调休合计时间', type: 'string', isNull: false},
        {name: 'daysoffReason', column: 9, tileName: '调休事由', type: 'string', isNull: false}
    ]
};

exports.doWithRouter = function(router) {
  router.post('/send-process', mark('services', 'attendance/daysoff-apply', 'process/common').on(function (daysoffApplySvc, processSvc,  request) {
        var data = request.params,
            businessFeaturePath = data.businessFeaturePath,
            entity = daysoffApplySvc.getById(data.id);

        processSvc.sendProcess(entity, 'DaysoffApply', 1, businessFeaturePath, entity.applyNo);

        return json({flag: true});
    }));
    //流程取回
    router.put('/retrieve', mark('services', 'attendance/daysoff-apply', 'process/common').on(function (daysoffApplySvc, processSvc, request) {
        var entryId, entity, instances;

        entryId = request.params.id;
        entity = daysoffApplySvc.getById(entryId);
        instances = processSvc.getCleanProcessInstanceByEntityAndBusinessMark(entity, 'DaysoffApply');

        if(instances.size() === 0){
            return json({flag: false});
        }

        processSvc.retrieveProcessByEntryAndProcessInstance(entity, instances.get(0));

        return json({flag: true});
    }));
    //审批操作
    router.put('/audit', mark('services', 'attendance/daysoff-apply', 'process/common', 'system/notice', 'system/accounts', 'system/my-notice').on(function (daysoffApplySvc, processSvc, noticeSvc, accountSvc, myNoticeSvc, request) {
        var processInstance,
            subject = SecurityUtils.getSubject(),
            user = subject.getPrincipal(), myNotice = {},
            data = request.params, notice = {}, accounts = new ArrayList(),
            entity = daysoffApplySvc.getById(data.id),
            businessName = '调休申请';

        entity.flowComment = data.flowComment;
        entity.flowSuggestion = data.flowSuggestion;

        processInstance = processSvc.audit(entity, 'DaysoffApply', 1);

        if(processInstance.isFinished === true){
            if (entity.flowComment === '1') {
                //发送通知
                notice.title = businessName + '单号为“' + entity.applyNo + '”的信息已审批完成';
                notice.content = processInstance.submitter.realName + '你好，' + businessName + '单号为“' + entity.applyNo + '”的信息已审批完成，请确认。';
            } else {
                notice.title = businessName + '单号为“' + entity.applyNo + '”的信息已退回';
                notice.content = processInstance.submitter.realName +'你好，' + businessName + '单号为“' + entity.applyNo + '”的信息已退回，请确认。';
            }

            notice.status = '2';//默认发布
            notice.sign = false;
            notice.creatorName = user.realName;
            notice.issueAccount = user;
            notice.methodPath = "attendance/scaffold:daysoff-apply:confirm-completion";

            accounts.add(accountSvc.getById(processInstance.submitter.id));
            notice.accounts = accounts;//接收人

            noticeSvc.saveNotice(notice);

            myNotice.title = notice.title;
            myNotice.content = notice.content;
            myNotice.sign = false;
            myNotice.issueAccount = user;//发布人
            myNotice.receiveAccount = accountSvc.getById(processInstance.submitter.id);//接收人
            myNoticeSvc.saveMyNotice(myNotice);
        }
        return json({flag: true});
    }));

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
      //导入已有数据
    router.post('/import-excel', mark('services', 'commons/import-excel', 'attendance/daysoff-apply').on(function (importXlsSvc, daysoffApplySvc, request) {
        var result, result2, saveAndCheckResult,
            rowNum, entityArray, i;

        entityArray = [];

        result = importXlsSvc.importExcel(request.params, exports.importing);

        rowNum = result.rowNum;

        for (i = 0; i < rowNum; i++) {
            entityArray.push(new DaysoffApply());
        }

        result2 = importXlsSvc.fillEntity(result.rowDataArray, exports.importing, entityArray);

        saveAndCheckResult = daysoffApplySvc.saveEntities(request.params, result2.entityArray, result);
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
    //导出
    router.get('/export-excel', mark('services', 'commons/export-excel', 'attendance/daysoff-apply').on(function (exportXlsSvc, daysoffApplySvc, request) {
        var options = request.params,
            result;

        options = exportXlsSvc.dealParameters(options, daysoffApplySvc, new DaysoffApply());

        result = daysoffApplySvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }))
}


