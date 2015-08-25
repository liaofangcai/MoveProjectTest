var {mark}                  = require('cdeio/mark');
var {json}                  = require('cdeio/response');
var _                       = require('underscore');
var {TripApply}             = com.zyeeda.business.trip.entity;
var {TripCost}              = com.zyeeda.business.trip.entity;
var {TripReport}            = com.zyeeda.business.trip.entity;
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
var {createService}         = require('trip/trip-cost.feature/service');
exports.haveFilter = true;

exports.enableFrontendExtension = true;

exports.service = function(service){
    return _.extend(service, createService());
};

exports.filters = {
  defaults: {
    '!tripCostFilter': '',
    '!departmentFilter': ['parent(1)', 'children', 'accounts'],
    '!accountFilter': [''],
    '!roleFilter': ['department', 'accounts'],
    '!permissionFilter': ['roles'],
    '!tripReportFilter': ['tripCosts','attachment'],
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
  tripPlace: '出差地点',
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
    groups: [{name: 'filter', columns: 1}], size: 'small'
  }

};

exports.fieldGroups = {
  reportInfo: [
    'tripReport.tripApply.applier.realName', 'tripReport.tripApply.department', 'tripReport.tripApply.tripPlace',
    'tripReport.tripDays',
    {name: 'tripReport.tripTask', type: 'textarea', colspan: 2}
  ],
  add: [
    {name: 'tripTime', validations: {rules: {required: true }}},
    {name: 'tripPlace', validations: {rules: {required: true }}},
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
      {name: 'tripTime',width:100},
      {name: 'tripReport.tripApply.tripPlace', header: '出差地点'},
      {name: 'trafficCost', renderer: 'trafficCostValue'},
      {name: 'stayCost', renderer: 'styleCostValue'},
      {name: 'entertainCost', renderer: 'entertainCostValue'},
      {name: 'otherCost', renderer: 'otherCostValue'},
      {name: 'totalCost', renderer: 'totalCostValue'}
    ],
    filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
};

exports['inline-grid'] = {
    columns: [
      {name:'tripTime', width:90}, {name:'tripPlace',width:80}, 'trafficCost', 'stayCost', 'entertainCost', 'otherCost', 'totalCost', 'remark'
    ]
};

exports.operators = {
    add: false,
    del: false,
    downloadImportTemplate: {label: '下载导入模板', icon: 'icon-cloud-download', group: '30-refresh', style: 'btn-info', show: 'unselected', order: 100},
    importXls: {label: '导入', icon: 'icon-download-alt', group: '30-refresh', style: 'btn-warning', show: 'unselected', order: 200},
    print: {label: '打印', icon: 'icon-print', group: '30-custom', order: 200, show: 'selected', style: 'btn-info'}
};
// 导出 excel 相关配置
exports.exporting = {
    template: 'trip/trip-cost/tripCostModule.xls',
    fileName: '出差任务行程及差旅费报销明细表'
};
// 报告导入
exports.importing = {
    module: 'tripCost',
    enable: true  ,
    dateFormat: 'yyyy/MM/dd',
    template: 'trip/trip-cost/出差任务行程及差旅费报销明细表.xls',
    startRow: 2,
    mapping: [
        {name: 'tripApply.applyNo', column: 1, tileName: '申请单号', type: 'picker', isNull: false, unique: true },
        {name: 'tripTime', column: 2, tileName: '日期', type: 'date', isNull: false },
        {name: 'tripPlace', column: 3, tileName: '地点', type: 'string', isNull: false },
        {name: 'trafficCost', column: 4, tileName: '交通费', type: 'double', isNull: true },
        {name: 'stayCost', column: 5, tileName: '住宿费', type: 'double', isNull: true },
        {name: 'entertainCost', column: 6, tileName: '业务招待费', type: 'double', isNull: true },
        {name: 'otherCost', column: 7, tileName: '其他费用', type: 'double', isNull: true },
        {name: 'remark', column: 8, tileName: '备注', type: 'string', isNull: true }
    ]
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
    //导入已有数据
    router.post('/import-excel', mark('services', 'commons/import-excel', 'trip/trip-cost').on(function (importXlsSvc, tripCostSvc, request) {
        var result, result2, saveAndCheckResult,
            rowNum, entityArray, i;

        entityArray = [];

        result = importXlsSvc.importExcel(request.params, exports.importing);

        rowNum = result.rowNum;

        for (i = 0; i < rowNum; i++) {
            entityArray.push(new TripCost());
        }

        result2 = importXlsSvc.fillEntity(result.rowDataArray, exports.importing, entityArray);

        saveAndCheckResult = tripCostSvc.saveEntities(request.params, result2.entityArray, result);
        result.failRowIdxes = saveAndCheckResult.failRowIdxes;
        result.repeatRowIdxes = saveAndCheckResult.repeatRowIdxes;

        return json({
            entityArray: result2.entityArray,
            pickerFields: result.pickerFields,
            specialFields: result.specialFields,
            failRowIdxes: result.failRowIdxes,
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
