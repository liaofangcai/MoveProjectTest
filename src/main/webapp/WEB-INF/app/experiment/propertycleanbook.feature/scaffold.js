var {mark}                  = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var logger = require('ringo/logging').getLogger(module.id);
var {PropertyCleanBook}     = com.zyeeda.business.experiment.entity;

exports.style = 'grid';

exports.enableFrontendExtension = true;

exports.haveFilter = true;

exports.entityLabel = '资产清册';

exports.filters ={
    defaults: {
        '!propertyCleanBookFilter': ['']
    }
};

exports.labels = {
     propertyDate : '录入日期',
     propertyNumber : '资产编号',
     propertyName : '资产名称',
     modelNorms : '规格型号',
     safekeepingPerson : '保管人',
     produceVender : '生产厂家',
     company : '单位',
     purchaseDate: '购置日期',
     purchasePrice : '采购价格(元)',
     contaceinFormation : '联系方式',
     site: '地点',
     remark: '备注'
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
}
};

exports.fieldGroups = {
 defaults: [
     'propertyNumber', 'propertyName', 'modelNorms', 'safekeepingPerson', 'produceVender',
     'company', 'propertyDate',
     {name: 'purchaseDate',type: 'datepicker'}, 'purchasePrice',
     'contaceinFormation',
     'site',
     {name: 'remark', type: 'textarea', colspan: 2}
  ],
filter: [
     'propertyDate', 'propertyName'
  ]
};

exports.grid = {
  columns: ['propertyDate', 'propertyNumber', 'modelNorms', 'safekeepingPerson', 'produceVender', 'company'],
  filterToolbar: true,
  fixedHeader: true,
  numberColumn: true,
  multiple: true,
  defaultOrder: 'propertyDate-desc'
};

exports.operators = {
     exportExcel:
      { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
};

exports.exporting = {
    template: 'experiment/propertycleanbook/propertycleanbook.xls',
    fileName: '资产清册表'
};

exports.doWithRouter = function(router) {

    //导出数据
    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/propertycleanbook').on(function (exportXlsSvc, interformationSvc, request) {
        var options = request.params,
            result;
        options = exportXlsSvc.dealParameters(options, interformationSvc, new PropertyCleanBook());

        result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }))
}