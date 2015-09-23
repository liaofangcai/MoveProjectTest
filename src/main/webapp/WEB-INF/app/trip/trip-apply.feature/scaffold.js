var {mark}                  = require('cdeio/mark');
var {json}                  = require('cdeio/response');
var _                       = require('underscore');
var {TripApply}             = com.zyeeda.business.trip.entity;
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
var {createService}         = require('trip/trip-apply.feature/service');

exports.haveFilter = true;

exports.service = function(service){
    return _.extend(service, createService());
};

exports.enableFrontendExtension = true;

exports.filters = {
  defaults: {
    '!tripApplyFilter': '',
    '!accountFilter': [''],
    '!departmentFilter': ['parent(1)', 'children', 'accounts'],
    '!roleFilter': ['department', 'accounts'],
    '!permissionFilter': ['roles'],
    '!attachmentFilter': '',
    '!approvalHistoryFilter': ['businessDefinition', 'processTaskInfo'],
  },
  accountsFilter: {
    '!accountFilter': ['roles'],
    '!departmentFilter': ['children', 'accounts']
  }
};


exports.entityLabel = '出差申请单';

exports.labels = {
  applyNo: '申请单号',
  applier: '申请人',
  'applier.realName': '申请人',
  department: '部门',
  'department.name': '部门',
  job: '职务',
  appliedTime: '申请日期',
  leavedTime: '出发日期',
  tripPlace: '出差地点',
  deputy: '职务代理人',
  tripType: '出差类别',
  tripReason: '出差事由',
  forecastedTime: '预计差期(天)',
  forecastedCost: '差旅费用预计',
  stayCost: '住宿费',
  stayCostRemark: '住宿费备注',
  trafficCost: '交通费',
  trafficCostRemark: '交通费备注',
  entertainCost: '业务招待费',
  entertainCostRemark: '业务招待费备注',
  otherForecastCost: '其它预计费用',
  otherForecastCostRemark: '其它预计费用备注',
  flowStatus: '状态'
};

exports.forms = {
  add: {
    groups: [
      {name: 'defaults', columns: 2},
      {name: 'costGroup', columns: 2, label: '费用信息'},
    ],
    size: 'large'
  },
  edit: {
    groups: [
      {name: 'withApplyNoGroup', columns: 2},
      {name: 'costGroup', columns: 2, label: '费用信息'},
    ],
    size: 'large'
  },
  show: {
    groups: [
      {name: 'showFormWithApplyNolGroup', columns: 2},
      {name: 'costGroup', columns: 2, label: '费用信息'},
    ],
    size: 'large'
  },
  filter: {
    groups: [{name: 'filter', columns: 1}], size: 'small'
  },
  audit: {
    groups: [
      {name: 'withApplyNoGroup', columns: 2},
      {name: 'costGroup', columns: 2, label: '费用信息'},
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
    {name: 'applier', textKey: 'realName'}, 'department', 'job', 'appliedTime', 'leavedTime', 'tripPlace', 'deputy',
      'forecastedTime', 'tripType', 'forecastedCost', {name: 'tripReason', type: 'textarea', colspan: 2}
  ],
  withApplyNoGroup: [
    {name:'applyNo', colspan: 2},
    {name: 'applier', textKey: 'realName'}, 'department', 'job', 'appliedTime', 'leavedTime', 'tripPlace', 'deputy',
    'tripType', 'forecastedTime', 'forecastedCost', {name:'tripReason', type: 'textarea', colspan: 2}
  ],
  showFormWithApplyNolGroup: [
    {name:'applyNo', colspan: 2},
    'applier.realName', 'department', 'job', 'appliedTime', 'leavedTime', 'tripPlace', 'deputy',
    'tripType', 'forecastedTime', 'forecastedCost', {name: 'tripReason', type: 'textarea', colspan: 2}
  ],
  costGroup: [
    'stayCost', 'stayCostRemark', 'trafficCost', 'trafficCostRemark', 'entertainCost', 'entertainCostRemark', 'otherForecastCost', 'otherForecastCostRemark'
  ],
  filter: [
    'applyNo', 'applier.realName', {name: 'appliedTime', type: 'date-range'}, {name: 'leavedTime', type: 'date-range'}, 'tripPlace'
  ],
  audit: [
    {name: 'flowComment', label: '审批结果', type: 'dropdown', source: [{id: '1', text: '同意'}, {id: '2', text: '不同意'}], required: true, validations: {rules: {required: true}}},
    {name: 'flowSuggestion', label: '审批意见', type: 'textarea', colspan: 2}
  ],
  applyNoGroup: [{name: 'applyNo', label: '申请单号'}]
};

exports.grid = {
    columns: [
      'applyNo',
      {name: 'applier.realName', header: '申请人'},
      {name: 'department.name', header: '部门'},
      {name: 'job', width: 100}, 'appliedTime', 'tripPlace',
      'tripType',
      {name: 'flowStatus', renderer: 'modifyStatus', width: 150}
    ],
    filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
};

exports.operators = {
    addReport: {label: '填写任务报告书', icon: 'icon-edit-sign', group: '30-custom', order: 100, show: 'single-selected', style: 'btn-info' },
    sendProcess: { label: '上报', icon: 'icon-envelope-alt', group: '40-process', order: 10, show: 'single-selected', style: 'btn-pink'},
    retrieve: { label: '取回', icon: 'icon-undo', group: '40-process', order: 20, show: 'single-selected', style: 'btn-success'},
    downloadImportTemplate: {label: '下载导入模板', icon: 'icon-cloud-download', group: '30-refresh', style: 'btn-info', show: 'unselected', order: 100},
    importXls: {label: '导入', icon: 'icon-download-alt', group: '30-refresh', style: 'btn-warning', show: 'unselected', order: 200},
    print: {label: '打印', icon: 'icon-print', group: '30-custom', order: 200, show: 'always', style: 'btn-info'}
};

//相关数据处理
exports.hooks = {
  //创建数据之前执行函数
  beforeCreate: {
    defaults: mark('services', 'trip/trip-apply').on(function (tripApplySvc, tripApply) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      tripApply.applyNo = tripApplySvc.autoGenerateNo();
      tripApply.creator = user.accountName;
      tripApply.creatorName = user.realName;
      tripApply.createdTime = new Date();
      tripApply.flowStatus = '0';
    })
  },

  //编辑数据之前执行函数
  beforeUpdate: {
    defaults: function (tripApply) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      tripApply.lastModifier = user.accountName;
      tripApply.lastModifierName = user.realName;
      tripApply.lastModifiedTime = new Date();
    }
  }
};
// 导出 excel 相关配置
exports.exporting = {
    template: 'trip/trip-apply/tripApplyModule.xls',
    fileName: '出差申请信息'
};
// 报告导入
exports.importing = {
    module: 'tripReport',
    enable: true,
    dateFormat: 'yyyy/MM/dd',
    template: 'trip/trip-apply/出差申请信息.xls',
    startRow: 2,
    mapping: [
        {name: 'applyNo', column: 1, tileName: '申请单号', type: 'string', isNull: false, unique: true},
        {name: 'applier', column: 2, tileName: '申请人', type: 'picker', isNull: false},
        {name: 'department', column: 3, tileName: '部门', type: 'picker', isNull: false},
        {name: 'job', column: 4, tileName: '职位', type: 'string', isNull: false},
        {name: 'appliedTime', column: 5, tileName: '申请日期', type: 'date', isNull: false},
        {name: 'leavedTime', column: 6, tileName: '出发日期', type: 'date', isNull: false},
        {name: 'tripPlace', column: 7, tileName: '出差地点', type: 'string', isNull: false},
        {name: 'deputy', column: 8, tileName: '职务代理人', type: 'string', isNull: true},
        {name: 'tripType', column: 9, tileName: '出差类别', type: 'string', isNull: true},
        {name: 'tripReason', column: 10, tileName: '出差事由', type: 'string', isNull: true},
        {name: 'forecastedTime', column: 11, tileName: '预计差期', type: 'int', isNull: true},
        {name: 'forecastedCost', column: 12, tileName: '差旅费用预计', type: 'double', isNull: false},
        {name: 'stayCost', column: 13, tileName: '住宿费', type: 'double', isNull: false},
        {name: 'stayCostRemark', column: 14, tileName: '住宿费备注', type: 'string', isNull: true},
        {name: 'trafficCost', column: 15, tileName: '交通费', type: 'double', isNull: false},
        {name: 'trafficCostRemark', column: 16, tileName: '交通费备注', type: 'string', isNull: true},
        {name: 'entertainCost', column: 17, tileName: '业务招待费', type: 'double', isNull: false},
        {name: 'entertainCostRemark', column: 18, tileName: '业务招待费备注', type: 'string', isNull: true},
        {name: 'otherForecastCost', column: 19, tileName: '其他费用', type: 'double', isNull: false},
        {name: 'otherForecastCostRemark', column: 20, tileName: '其他费用备注', type: 'string', isNull: true}
    ]
};

//请求处理
exports.doWithRouter = function(router) {

    router.get('/get-trip-apply-by-id', mark('services', 'trip/trip-apply', 'common-routers').on(function (tripApplySvc, commSvc, request) {
        var entryIds = request.params.selectedDataIds, result, tripApplys,
        entryIdArr = new String(entryIds).split(","), i;

        tripApplys = tripApplySvc.getTripApplyByIds(entryIdArr);

        if (entryIdArr.length > 1) {
          for (i = 0; i < tripApplys.length; i++) {
            tripApplys[i].approvalHistories = commSvc.getEntryApprovalHistory(tripApplys[i].id);
          }
        }else{
          tripApplys.approvalHistories = commSvc.getEntryApprovalHistory(tripApplys.id);
        }

        return json({tripApplys: tripApplys}, exports.filters.defaults);
    }));
    //上报
    router.post('/send-process', mark('services', 'trip/trip-apply', 'process/common').on(function (tripApplySvc, processSvc,  request) {
        var data = request.params,
            businessFeaturePath = data.businessFeaturePath,
            entity = tripApplySvc.getById(data.id);

        processSvc.sendProcess(entity, 'TripApply', 1, businessFeaturePath, entity.applyNo);

        return json({flag: true});
    }));
    //流程取回
    router.put('/retrieve', mark('services', 'trip/trip-apply', 'process/common').on(function (tripApplySvc, processSvc, request) {
        var entryId, entity, instances;

        entryId = request.params.id;
        entity = tripApplySvc.getById(entryId);
        instances = processSvc.getCleanProcessInstanceByEntityAndBusinessMark(entity, 'TripApply');

        if(instances.size() === 0){
            return json({flag: false});
        }

        processSvc.retrieveProcessByEntryAndProcessInstance(entity, instances.get(0));

        return json({flag: true});
    }));
    //审批操作
    router.put('/audit', mark('services', 'trip/trip-apply', 'process/common', 'system/notice', 'system/accounts', 'system/my-notice').on(function (tripApplySvc, processSvc, noticeSvc, accountSvc, myNoticeSvc, request) {
        var processInstance,
            subject = SecurityUtils.getSubject(),
            user = subject.getPrincipal(), myNotice = {},
            data = request.params, notice = {}, accounts = new ArrayList(),
            entity = tripApplySvc.getById(data.id),
            businessName = '出差申请';

        entity.flowComment = data.flowComment;
        entity.flowSuggestion = data.flowSuggestion;

        processInstance = processSvc.audit(entity, 'TripApply', 1);

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
            notice.methodPath = "trip/scaffold:trip-apply:confirm-completion";

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
    router.post('/import-excel', mark('services', 'commons/import-excel', 'trip/trip-apply').on(function (importXlsSvc, tripApplySvc, request) {
        var result, result2, saveAndCheckResult,
            rowNum, entityArray, i;

        entityArray = [];

        result = importXlsSvc.importExcel(request.params, exports.importing);

        rowNum = result.rowNum;

        for (i = 0; i < rowNum; i++) {
            entityArray.push(new TripApply());
        }

        result2 = importXlsSvc.fillEntity(result.rowDataArray, exports.importing, entityArray);

        saveAndCheckResult = tripApplySvc.saveEntities(request.params, result2.entityArray, result);
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
};
