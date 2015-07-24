var {mark} = require('cdeio/mark');
var {json} = require('cdeio/response');

var {SecurityUtils} = org.apache.shiro;

var {SimpleDateFormat} = java.text;

exports.haveFilter = true;

exports.enableFrontendExtension = true;

exports.filters = {
  defaults: {
    '!tripCostFilter': '',
    '!departmentFilter': ['parent(1)', 'children', 'accounts'],
    '!accountFilter': [''],
    '!roleFilter': ['department', 'accounts'],
    '!permissionFilter': ['roles'],
    '!tripReportFilter': 'tripCosts',
    '!tripApplyFilter': ''
  }
};

exports.entityLabel = '行程及差旅费报销明细单';

exports.labels = {
  'tripReport.tripApply.applier.realName': '申请人',
  'tripReport.tripApply.department': '部门',
  'tripReport.tripApply.tripPlace': '地点',
  'tripReport.tripDays': '出差天数',
  'tripReport.tripTask': '出差任务',
  tripTime: '日期',
  trafficCost: '交通费',
  stayCost: '住宿费',
  entertainCost: '业务招待费',
  otherCost: '其他费用',
  totalCost: '合计金额',
  remark: '备注'
};

exports.forms = {
  add: {
    groups: [
      {name: 'add', columns: 2}
    ],
    size: 'large'
  },
  edit: {
    groups: [
      {name: 'defaults', columns: 2},
    ],
    size: 'large'
  },
  show: {
    groups: [
      {name: 'reportInfo', columns: 2, label: '出差任务报告信息'},
      {name: 'add', columns: 2, label: '行程及差旅费报销明细'}
    ],
    size: 'large'
  },
  filter: {
    groups: [{name: 'filter', columns: 4}]
  }
};

exports.fieldGroups = {
  reportInfo: [
    'tripReport.tripApply.applier.realName', 'tripReport.tripApply.department', 'tripReport.tripApply.tripPlace',
    'tripReport.tripDays',
    {name: 'tripReport.tripTask', type: 'textarea', colspan: 2}
  ],
  add: [
    {name: 'trafficCost', validations: {rules: {required: true, number: true}}},
    {name: 'stayCost', validations: {rules: {required: true, number: true}}},
    {name: 'entertainCost', validations: {rules: {required: true, number: true}}},
    {name: 'otherCost', validations: {rules: {required: true, number: true}}},
    {name: 'totalCost', validations: {rules: {required: true, number: true}}},
    {name: 'remark', type: 'textarea', colspan: 2}
  ],
  defaults: [
    'tripReport.tripApply.applier.realName', 'tripTime', 'tripReport.tripApply.tripPlace', 'trafficCost', 'stayCost', 'entertainCost', 'otherCost', 'totalCost', {name: 'remark', type: 'textarea', colspan: 2}
  ],
  filter: [
    'tripReport.tripApply.applier.realName', 'tripReport.tripApply.department',
    {name: 'tripTime', type: 'date-range'}, 'tripReport.tripApply.tripPlace'
  ]
};

exports.grid = {
    columns: [
      {name: 'tripReport.tripApply.applier.realName', header: '申请人'},
      'tripTime',
      {name: 'tripReport.tripApply.tripPlace', header: '出差地点'},
      'trafficCost', 'stayCost', 'entertainCost', 'otherCost', 'totalCost'
    ],
    filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
};

exports['inline-grid'] = {
    columns: [
      'trafficCost', 'stayCost', 'entertainCost', 'otherCost', 'totalCost', 'remark'
    ]
};

exports.operators = {
    add: false,
    del: false
};

//相关数据处理
exports.hooks = {
  //创建数据之前执行函数
  beforeCreate: {
    defaults: mark('services', 'trip/trip-cost').on(function (tripCostSvc, tripCost) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      tripCost.creator = user.accountName;
      tripCost.creatorName = user.realName;
      tripCost.createdTime = new Date();
      tripCost.flowStatus = '0';
    })
  },

  //编辑数据之前执行函数
  beforeUpdate: {
    defaults: function (tripCost) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      tripCost.lastModifier = user.accountName;
      tripCost.lastModifierName = user.realName;
      tripCost.lastModifiedTime = new Date();
    }
  }
};

//请求处理
exports.doWithRouter = function(router) {
    router.post('/add-cost', mark('services', 'trip/trip-cost').on(function (tripCostSvc, request) {
        var data = request.params;

        tripCostSvc.saveTripCost(data);

        return json({flag: true});
    }));
    //取当前时间
    router.get('/get-current-date', mark('services', 'trip/trip-cost').on(function (tripCostSvc, request) {
        var date = new Date(),
            sd = new SimpleDateFormat("yyyy-MM-dd"),
            result = {};

            result.createdTime = sd.format(date);
        return json(result);
    }));
    //导出
    router.get('/export-excel', mark('services', 'commons/export-excel', 'trip/trip-cost').on(function (exportXlsSvc, tripCostSvc, request) {
        var options = request.params,
            result;

        options = exportXlsSvc.dealParameters(options, tripCostSvc, new tripCost());

        result = tripCostSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }));
};
