var {mark}                    = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var _                         = require('underscore');
var fs                        = require('fs');
var objects                   = require('cdeio/util/objects');
var response                  = require('ringo/jsgi/response');
var {getOptionInProperties}   = require('cdeio/config');
var {join}                    = require('cdeio/util/paths');
var {createService}           = require('asset/asset-manage.feature/service');

var {AssetManage}             = com.zyeeda.business.asset.entity;
var {SecurityUtils}           = org.apache.shiro;

var {SimpleDateFormat}        = java.text;
var {Date}                    = java.util;
var {ArrayList}               = java.util;
var URLDecoder                = java.net.URLDecoder;

exports.filters = {
  defaults: {
    '!assetManageFilter': [''],
    '!assetStatusFilter': ['assetManage']
  }
};

exports.service = function(service){
    return _.extend(service, createService());
};

exports.haveFilter = true;

exports.enableFrontendExtension = true;

exports.entityLabel = '资产信息';

exports.labels = {
  equipmentNo: '资产编号',
  equipmentName: '资产名称',
  equipmentVersion: '规格型号',
  equipmentId: '序列号',
  manufacturer: '生产厂家',
  unit: '单位',
  purchaseDate: '购置日期',
  price: '采购价格(元)',
  attachment: '附件配备',
  providerName: '供应商名称',
  providerAddress: '供应商地址',
  contacts: '联系人',
  phoneNum: '联系方式',
  address: '地点',
  status: '状态',
  remark: '备注',
  latelyUser: '最近使用人'
};
exports.forms = {
  edit: {
      groups: [
        {name: 'defaults', columns: 2},
        {name:'inlineAssetStatusGrid',label: '使用情况'}
      ],
      size: 'large'
  },
  show: {
      groups: [
        {name: 'defaults', columns: 2},
        {name:'inlineAssetStatusGrid',label: '使用情况'}
      ],
      size: 'large'
  },
  add: {
      groups: [
        {name: 'defaults', columns: 2},
        {name:'inlineAssetStatusGrid',label: '使用情况'}
      ],
      size: 'large'
  },
  filter: {
    groups: [{name: 'filter', columns: 2}],
    size: 'large'
  }
};

exports.fieldGroups = {
  defaults:[
  'equipmentNo', 'equipmentName', {name:'equipmentVersion',type: 'textarea', colspan: 2},
  'equipmentId', 'manufacturer', 'unit', 'purchaseDate', 'price', 'attachment', 'providerName',
  'providerAddress', 'contacts', 'phoneNum', 'address', {name: 'status', type: 'dropdown', defaultValue: 1, source: [{id: 0, text: '闲置'}, {id: 1, text: '使用中'}, {id: 2,text: '待维修'}, {id: 3, text: '转移'}, {id: 4, text: '报废'}]}, {name: 'remark', type: 'textarea', colspan: 2}
  ],
  filter: [
    'equipmentNo', 'equipmentName', 'equipmentId',{name: 'purchaseDate', type: 'date-range'},
    'address', {name: 'status', type: 'dropdown', defaultValue: 1, source: [{id: 0, text: '闲置'}, {id: 1, text: '使用中'}, {id: 2,text: '待维修'}, {id: 3, text: '转移'}, {id: 4, text: '报废'}]},
   ],
  inlineAssetStatusGrid:[
    {label: '使用情况', type: 'inline-grid', name: 'assetStatus', allowPick: false, allowAdd: true, allowEdit: true}
  ]
};

exports.grid = {
    columns: ['equipmentNo', 'equipmentName', {name: 'latelyUser', sortable: false},  'purchaseDate', 'address',
    {name: 'status',renderer: 'modifyStatus'}],
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
};
exports.hooks = {
  beforeCreate: {
    defaults: mark('services', 'asset/asset-manage').on(function (assetManageSvc,assetManage) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      assetManage.creator = user.accountName;
      assetManage.creatorName = user.realName;
      assetManage.createdTime = new Date();
    })
  },
  beforeUpdate: {
    defaults: function (assetManage) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      assetManage.lastModifier = user.accountName;
      assetManage.lastModifierName = user.realName;
      assetManage.lastModifiedTime = new Date();
    }
  },
  beforeRemove: {
    defaults: mark('services', 'asset/asset-status').on(function (assetStatusSvc, assetManage) {
      assetStatusSvc.removeAssetStatusByAssetManageId(assetManage.id);
    }),
  },
};
exports.exporting = {
  template: 'asset/asset-manage/assetmanage.xls',
  fileName: 'assetmanage'
};
exports.importing = {
  module: 'assetManage',
  enable: true,
  dateFormat: 'yyyy/MM/dd',
  template: 'asset/asset-manage/assetmanage.xls',
  startRow: 2,
  mapping: [
      {name: 'equipmentNo', column: 1, tileName: '资产编号', type: 'string', isNull: false},
      {name: 'equipmentName', column: 2, tileName: '资产名称', type: 'string', isNull: false},
      {name: 'equipmentVersion', column: 3, tileName: '规格型号', type: 'string', isNull: false},
      {name: 'equipmentId', column: 4, tileName: '序列号', type: 'string', isNull: true},
      {name: 'manufacturer', column: 5, tileName: '生产厂家', type: 'string', isNull: true },
      {name: 'unit', column: 6, tileName: '单位', type: 'string', isNull: false },
      {name: 'purchaseDate', column: 7, tileName: '购置日期', type: 'date', isNull: false },
      {name: 'price', column: 8, tileName: '采购价格', type: 'double', isNull: true },
      {name: 'attachment', column: 9, tileName: '附件配备', type: 'string', isNull: true },
      {name: 'providerName', column: 10, tileName: '供应商名称', type: 'string', isNull: true },
      {name: 'providerAddress', column: 11, tileName: '供应商地址', type: 'string', isNull: true },
      {name: 'contacts', column: 12, tileName: '联系人', type: 'string', isNull: true },
      {name: 'phoneNum', column: 13, tileName: '联系方式', type: 'string', isNull: true },
      {name: 'address', column: 14, tileName: '地点', type: 'string', isNull: true },
      {name: 'status', column: 15, tileName: '状态', type: 'dropdown', isNull: false,
        source: [{id: '0', text: '闲置'}, {id: '1', text: '使用中'}, {id:'2', text: '待维修'},
        {id:'3', text: '转移'}, {id:'4', text: '报废'}]
      },
      {name: 'remark', column: 16, tileName: '备注', type: 'string', isNull: true }
  ]
};

exports.doWithRouter = function(router) {
   //导入已有数据
  router.post('/import-excel', mark('services', 'commons/import-excel', 'asset/asset-manage').on(function (importXlsSvc, assetManageSvc, request) {
      var result, result2, saveAndCheckResult,
          rowNum, entityArray, i;

      entityArray = [];
      result = importXlsSvc.importExcel(request.params, exports.importing);
      rowNum = result.rowNum;

      for (i = 0; i < rowNum; i++) {
          entityArray.push(new AssetManage());
      }

      result2 = importXlsSvc.fillEntity(result.rowDataArray, exports.importing, entityArray);
      saveAndCheckResult = assetManageSvc.saveEntities(request.params, result2.entityArray, result);
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
  router.get('/export-excel', mark('services', 'commons/export-excel', 'asset/asset-manage').on(function (exportXlsSvc, assetManageSvc, request) {
      var options = request.params,
          result;

      options = exportXlsSvc.dealParameters(options, assetManageSvc, new AssetManage());

      result = assetManageSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

      return json({flag: result.flag, filename: result.filename});
  }))
}


