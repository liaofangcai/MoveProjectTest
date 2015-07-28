var {mark} = require('cdeio/mark');
var {json} = require('cdeio/response');

var {SecurityUtils} = org.apache.shiro;

var {SimpleDateFormat} = java.text;
var {Date}             = java.util;
var {ArrayList}        = java.util;

exports.haveFilter = true;

exports.enableFrontendExtension = true;

exports.filters = {
  defaults: {
    '!tripApplyFilter': '',
    '!departmentFilter': ['parent(1)', 'children', 'accounts'],
    '!accountFilter': [''],
    '!roleFilter': ['department', 'accounts'],
    '!permissionFilter': ['roles']
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
  forecastedTime: '预计差期',
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
     'tripType', 'tripReason', 'forecastedTime', 'forecastedCost'
  ],
  withApplyNoGroup: [
    'applyNo',
    {name: 'applier', textKey: 'realName'}, 'department', 'job', 'appliedTime', 'leavedTime', 'tripPlace', 'deputy',
    'tripType', 'tripReason', 'forecastedTime', 'forecastedCost'
  ],
  showFormWithApplyNolGroup: [
    'applyNo',
    'applier.realName', 'department', 'job', 'appliedTime', 'leavedTime', 'tripPlace', 'deputy',
    'tripType', 'tripReason', 'forecastedTime', 'forecastedCost'
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
      'job', 'appliedTime', 'tripPlace',
      'tripType',
      {name: 'flowStatus', renderer: 'modifyStatus', width:150}
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
    retrieve: { label: '取回', icon: 'icon-undo', group: '40-process', order: 20, show: 'single-selected', style: 'btn-success'}
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

//请求处理
exports.doWithRouter = function(router) {
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
    //取当前时间
    router.get('/get-current-date', mark('services', 'trip/trip-apply').on(function (tripApplySvc, request) {
        var date = new Date(),
            sd = new SimpleDateFormat("yyyy-MM-dd"),
            result = {};

            result.createdTime = sd.format(date);
        return json(result);
    }));
    //导出
    router.get('/export-excel', mark('services', 'commons/export-excel', 'trip/trip-apply').on(function (exportXlsSvc, tripApplySvc, request) {
        var options = request.params,
            result;

        options = exportXlsSvc.dealParameters(options, tripApplySvc, new tripApply());

        result = tripApplySvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }));
};
