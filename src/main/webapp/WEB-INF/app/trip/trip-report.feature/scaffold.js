var {mark}                    = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var _                         = require('underscore');
var {TripReport}              = com.zyeeda.business.trip.entity;
var {TripApply}               = com.zyeeda.business.trip.entity;
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
var {createService}           = require('trip/trip-report.feature/service');
exports.haveFilter = true;

exports.enableFrontendExtension = true;

exports.service = function(service){
    return _.extend(service, createService());
};

exports.filters = {
  defaults: {
    '!tripReportFilter': '',
    '!tripApplyFilter': '',
    '!departmentFilter': ['parent(1)', 'children', 'accounts'],
    '!accountFilter': ['department','role'],
    '!roleFilter': ['department', 'accounts'],
    '!permissionFilter': ['roles'],
    '!attachmentFilter': '',
    '!tripCostFilter': 'tripReport',
    '!approvalHistoryFilter': ['businessDefinition', 'processTaskInfo'],
  }
};

exports.entityLabel = '出差任务报告书';

exports.labels = {
  'tripApply.applyNo': '出差申请单号',
  'tripApply.applier.realName': '申请人',
  'tripApply.department': '部门',
  'tripApply.leavedTime': '出发日期',
  'tripApply.tripType': '出差类别',
  'tripApply.tripReason': '出差事由',
  'tripApply.tripPlace': '出差地点',
  startTime: '出发日期',
  endTime: '结束日期',
  tripDays: '出差天数(天)',
  tripTask: '出差任务',
  completion: '执行情形',
  attachment: '附件',
  flowStatus: '状态',
  tripCosts: '报销明细',
  remark: '备注(报销明细打印)'
};

exports.forms = {
  add: {
    groups: [
      {name: 'applyInfo', columns: 2, label: '申请单信息'},
      {name: 'add', columns: 2, label: '出差任务报告书'}
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
      {name: 'show', columns: 2},
      {label: '行程及差旅费报销明细', name: 'inlineTripCostsGrid'}
    ],
    size: 'large'
  },
  filter: {
    groups: [{name: 'filter', columns: 1}], size: 'small'
  },
  audit: {
    groups: [
      {name: 'show', columns: 2},
      {name: 'audit', label: '审批信息'}
    ],
    size: 'large'
  },
  cost: {
    groups: [
      {name: 'defaults', columns: 2},
      {label: '行程及差旅费报销明细', name: 'inlineTripCostsGrid'}
    ],
    size: 'large'
  }
};

exports.feature = {
  views: ['form:audit', 'form:cost']
};

exports.fieldGroups = {
  applyInfo: [
    {name: 'tripApply.applyNo', colspan: 2},
    'tripApply.applier.realName', 'tripApply.department',
    'tripApply.leavedTime', 'tripApply.tripPlace', 'tripApply.tripType', 'tripApply.tripReason'
  ],
  add:[
    'startTime', {name: 'endTime', statusChanger: true},
    {name: 'tripDays', validations: {rules: {required: true, number: true}}},
    {name: 'tripTask', label: '出差任务', type: 'textarea', colspan: 2},
    {name: 'completion', label: '执行情形：（精简摘要叙明，如系专案研究报告，则视需要另以附件方式详述）', type: 'textarea', colspan: 2},
    {name: 'remark', type: 'textarea', colspan: 2},
    {name: 'attachment',
        colspan: 2,
        type: 'file-picker',
        url: 'invoke/system/upload',
        acceptFileTypes: "(\\.|\\/)(swf|mp4|avi|wmv|doc|docx|xls|xlsx|ppt|pptx|zip|rar|7z|pdf|txt|jpg|jpeg|png|gif)$"}
  ],
  show: [
    'tripApply.applier.realName', 'tripApply.department', 'startTime', 'endTime',
    'tripApply.tripPlace',
    {name: 'tripDays', validations: {rules: {required: true, number: true}}},
    {name: 'tripTask', label: '出差任务', type: 'textarea', colspan: 2},
    {name: 'completion', label: '执行情形', type: 'textarea', colspan: 2},
    {name: 'attachment',
        colspan: 2,
        type: 'file-picker',
        url: 'invoke/system/upload',
        acceptFileTypes: "(\\.|\\/)(swf|mp4|avi|wmv|doc|docx|xls|xlsx|ppt|pptx|zip|rar|7z|pdf|txt|jpg|jpeg|png|gif)$"}
  ],
  defaults: [
    'tripApply.applier.realName', 'tripApply.department', 'startTime', {name: 'endTime', statusChanger: true},
    'tripApply.tripPlace', 'tripDays',
    {name: 'tripTask', label: '出差任务', type: 'textarea', colspan: 2},
    {name: 'completion', label: '执行情形：（精简摘要叙明，如系专案研究报告，则视需要另以附件方式详述）', type: 'textarea', colspan: 2},
    {name: 'attachment',
        colspan: 2,
        type: 'file-picker',
        url: 'invoke/system/upload',
        acceptFileTypes: "(\\.|\\/)(swf|mp4|avi|wmv|doc|docx|xls|xlsx|ppt|pptx|zip|rar|7z|pdf|txt|jpg|jpeg|png|gif)$"}
  ],
  filter: [
    'tripApply.applier.realName', 'tripApply.department',
    {name: 'startTime', type: 'date-range'},
    {name: 'endTime', type: 'date-range'}
  ],
  audit: [
    {name: 'flowComment', label: '审批结果', type: 'dropdown', source: [{id: '1', text: '同意'}, {id: '2', text: '不同意'}], required: true, validations: {rules: {required: true}}},
    {name: 'flowSuggestion', label: '审批意见', type: 'textarea', colspan: 2}
  ],
  inlineTripCostsGrid: [{
        label: '行程及差旅费报销明细',
        type: 'inline-grid',
        name: 'tripCosts',
        allowAdd: true,
        allowEdit: true,
        allowshow: false,
        multiple: false,
        allowPick: false
    }]
};

exports.grid = {
    columns: [
      {name: 'tripApply.applier.realName', header: '申请人'},
      {name: 'tripApply.department.name', header: '部门'},
      {name: 'tripApply.tripPlace', header: '出差地点'},
      'startTime', 'endTime' , 'tripDays',
      {name: 'flowStatus', renderer: 'modifyStatus',width:180}
    ],
    filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
};

exports.operators = {
    add: false,
    del: false,
    addCost: {label: '填写报销明细', icon: 'icon-edit-sign', group: '30-custom', order: 100, show: 'single-selected', style: 'btn-info' },
    sendProcess: { label: '上报', icon: 'icon-envelope-alt', group: '40-process', order: 10, show: 'single-selected', style: 'btn-pink'},
    retrieve: { label: '取回', icon: 'icon-undo', group: '40-process', order: 20, show: 'single-selected', style: 'btn-success'},
    downloadImportTemplate: {label: '下载导入模板', icon: 'icon-cloud-download', group: '30-refresh', style: 'btn-info', show: 'unselected', order: 100},
    importXls: {label: '导入', icon: 'icon-download-alt', group: '30-refresh', style: 'btn-warning', show: 'unselected', order: 200},
    print: {label: '打印任务报告书', icon: 'icon-print', group: '30-custom', order: 300, show: 'selected', style: 'btn-info'},
};

//相关数据处理
exports.hooks = {
  //创建数据之前执行函数
  beforeCreate: {
    defaults: mark('services', 'trip/trip-report').on(function (tripReportSvc, tripReport) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      tripReport.creator = user.accountName;
      tripReport.creatorName = user.realName;
      tripReport.createdTime = new Date();
      tripReport.flowStatus = '0';
    })
  },

  //编辑数据之前执行函数
  beforeUpdate: {
    defaults: function (tripReport) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      tripReport.lastModifier = user.accountName;
      tripReport.lastModifierName = user.realName;
      tripReport.lastModifiedTime = new Date();
    }
  }
};
// 导出 excel 相关配置
exports.exporting = {
    template: 'trip/trip-report/tripReportModule.xls',
    fileName: '出差任务报告'
};
// 报告导入
exports.importing = {
    module: 'tripReport',
    enable: true  ,
    dateFormat: 'yyyy/MM/dd',
    template: 'trip/trip-report/出差任务报告信息.xls',
    startRow: 2,
    mapping: [
        {name: 'tripApply.applyNo', column: 1, tileName: '申请单号', type: 'picker', isNull: true, unique: true },
        {name: 'startTime', column: 2, tileName: '开始时间', type: 'date', isNull: true, unique: true},
        {name: 'endTime', column: 3, tileName: '结束时间', type: 'date', isNull: true, unique: true},
        {name: 'tripTask', column: 4, tileName: '出差任务', type: 'string', isNull: true, unique: true},
        {name: 'completion', column: 5, tileName: '执行情形', type: 'string', isNull: true, unique: true},
        {name: 'remark', colum: 6, tileName: '备注', type: 'string', isNull: true, unique: true}
    ]
};
//验证方法
exports.validators = {
    create: {
        defaults: mark('services', 'trip/trip-report').on(function (tripReportSvc, context, tripReport, request) {
            //验证结束日期是否早于开始日期
            if (tripReport.startTime && tripReport.endTime && (Date.parse(tripReport.startTime) > Date.parse(tripReport.endTime))){
                context.addViolation({ message: '结束日期早于开始日期，请重新填写！' });
            }
        })
    },
    update: {
        defaults: mark('services', 'trip/trip-report').on(function (tripReportSvc, context, tripReport, request) {
            //验证结束日期是否早于开始日期
            if (tripReport.startTime && tripReport.endTime && (Date.parse(tripReport.startTime) > Date.parse(tripReport.endTime))){
                context.addViolation({ message: '结束日期早于开始日期，请重新填写！' });
            }
        })
    },
    remove: {
       defaults: mark('services', 'laboratory/loan-apply').on(function (tripReportSvc, context, tripReport, request) {
            //验证其他模块是否有关联该申请单，如果有，则不允许删除
            var isEmpty = tripReportSvc.isEmpty(tripReport);
            if (!isEmpty) {
               context.addViolation({ message: '其它模块有关联该出差任务报告，不允许删除！' });
            }
        })
    }
};

//请求处理
exports.doWithRouter = function(router) {
    router.get('/get-trip-report-by-id', mark('services', 'trip/trip-report', 'common-routers').on(function (tripReportSvc, commSvc, request) {
        var entryIds = request.params.selectedDataIds, result, tripReports,
            entryIdArr = new String(entryIds).split(","),
            i;

        tripReports = tripReportSvc.getTripReportByIds(entryIdArr);

        if (entryIdArr.length > 1) {
          for (i = 0; i < tripReports.length; i++) {
            tripReports[i].approvalHistories = commSvc.getEntryApprovalHistory(tripReports[i].id);
          }
        }else{
          tripReports.approvalHistories = commSvc.getEntryApprovalHistory(tripReports.id);
        }

        return json({tripReports: tripReports}, exports.filters.defaults);
    }));

    router.post('/add-report', mark('services', 'trip/trip-report').on(function (tripReportSvc, request) {
        var data = request.params;

        tripReportSvc.saveTripReport(data);

        return json({flag: true});
    }));

    router.post('/add-cost', mark('services', 'trip/trip-cost').on(function (tripCostSvc, request) {
        var data = request.params;

        tripCostSvc.saveTripCost(data);

        return json({flag: true});
    }));
    //上报
    router.post('/send-process', mark('services', 'trip/trip-report', 'process/common').on(function (tripReportSvc, processSvc,  request) {
        var data = request.params,
            businessFeaturePath = data.businessFeaturePath,
            entity = tripReportSvc.getById(data.id);

        processSvc.sendProcess(entity, 'TripReport', 1, businessFeaturePath, entity.tripApply.applyNo);

        return json({flag: true});
    }));
    //流程取回
    router.put('/retrieve', mark('services', 'trip/trip-report', 'process/common').on(function (tripReportSvc, processSvc, request) {
        var entryId, entity, instances;

        entryId = request.params.id;
        entity = tripReportSvc.getById(entryId);
        instances = processSvc.getCleanProcessInstanceByEntityAndBusinessMark(entity, 'TripReport');

        if(instances.size() === 0){
            return json({flag: false});
        }

        processSvc.retrieveProcessByEntryAndProcessInstance(entity, instances.get(0));

        return json({flag: true});
    }));
    //审批操作
    router.put('/audit', mark('services', 'trip/trip-report', 'process/common', 'system/notice', 'system/accounts', 'system/my-notice').on(function (tripReportSvc, processSvc, noticeSvc, accountSvc, myNoticeSvc, request) {
        var processInstance,
            subject = SecurityUtils.getSubject(),
            user = subject.getPrincipal(), myNotice = {},
            data = request.params, notice = {}, accounts = new ArrayList(),
            entity = tripReportSvc.getById(data.id),
            businessName = '出差任务报告书';

        entity.flowComment = data.flowComment;
        entity.flowSuggestion = data.flowSuggestion;

        processInstance = processSvc.audit(entity, 'TripReport', 1);

        if(processInstance.isFinished === true){
            if (entity.flowComment === '1') {
                //发送通知
                notice.title = businessName + '出差申请单号为“' + entity.tripApply.applyNo + '”的出差任务报告书已审批完成';
                notice.content = processInstance.submitter.realName + '你好，' + businessName + '出差申请单号为“' + entity.tripApply.applyNo + '”的出差任务报告书已审批完成，请确认。';
            } else {
                notice.title = businessName + '出差申请单号为“' + entity.tripApply.applyNo + '”的出差任务报告书已退回';
                notice.content = processInstance.submitter.realName +'你好，' + businessName + '出差申请单号为“' + entity.tripApply.applyNo + '”的出差任务报告书已退回，请确认。';
            }

            notice.status = '2';//默认发布
            notice.sign = false;
            notice.creatorName = user.realName;
            notice.issueAccount = user;
            notice.methodPath = "trip/scaffold:trip-report:confirm-completion";

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
    //取当前时间
    router.get('/get-current-date', mark('services', 'trip/trip-report').on(function (tripReportSvc, request) {
        var date = new Date(),
            sd = new SimpleDateFormat("yyyy-MM-dd"),
            result = {};

            result.createdTime = sd.format(date);
        return json(result);
    }));
    //导出
    router.get('/export-excel', mark('services', 'commons/export-excel', 'trip/trip-report').on(function (exportXlsSvc, tripReportSvc, request) {
        var options = request.params,
            result;

        options = exportXlsSvc.dealParameters(options, tripReportSvc, new tripReport());

        result = tripReportSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }));
     //导入已有数据
    router.post('/import-excel', mark('services', 'commons/import-excel', 'trip/trip-report').on(function (importXlsSvc, tripReportSvc, request) {
        var result, result2, saveAndCheckResult,
            rowNum, entityArray, i;

        entityArray = [];

        result = importXlsSvc.importExcel(request.params, exports.importing);

        rowNum = result.rowNum;

        for (i = 0; i < rowNum; i++) {
            entityArray.push(new TripReport());
        }

        result2 = importXlsSvc.fillEntity(result.rowDataArray, exports.importing, entityArray);

        saveAndCheckResult = tripReportSvc.saveEntities(request.params, result2.entityArray, result);
        result.failRowIdxes = saveAndCheckResult.failRowIdxes;
        result.repeatRowIdxes = saveAndCheckResult.repeatRowIdxes;

        return json({
            entityArray: result2.entityArray,
            pickerFields: result.pickerFields,
            specialFields: result.specialFields,
            failRowIdxes: 0,
            repeatRowIdxes: result.repeatRowIdxes,
            successNum: result2.entityArray.length,
            repeatRowNum: 0
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
};
