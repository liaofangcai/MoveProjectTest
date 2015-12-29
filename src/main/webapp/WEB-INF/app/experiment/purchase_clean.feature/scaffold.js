var {mark}                    = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var {PurchaseCleanSingle}     = com.zyeeda.business.experiment.entity;
var {SecurityUtils}           = org.apache.shiro;

var {SimpleDateFormat}        = java.text;
var {Date}                    = java.util;
var {ArrayList}               = java.util;

exports.filters = {
  defaults: {
    '!purchaseCleanSingleFilter': [''],
    '!purchaseDetailedFilter': ['pu']
  }
};
exports.haveFilter = true;

exports.enableFrontendExtension = true;

exports.entityLabel = '采购单';

exports.labels = {
  purchaseNumber: '编号',
  seller: '供应商名称',
  sellerContacts: '联系人',
  buyers: '需求方名称',
  buyersContacts: '联系人',
  telephone: '联系电话',
  contactsNumber: '联系电话',
  purchaseDate: '日期',
  deliveryDate: '交货日期',
  remanks: '备注',
  aplicationPreson: '申请人',
  deptDrictor: '部门主管',
  purchase: '采购',
  check: '复核',
  generalManager: '总经理'
};

exports.forms = {
  defaults: {
      groups: [
        {name: 'defaults', columns: 2},
        {name: 'confession', label: '供货方' , columns: 2},
        {name: 'demand', label: '需求方' , columns: 2},
        {name: 'other', label: '其它' ,columns: 2},
        {name: 'inlineAssetStatusGrid',label: '采购明细'}
      ],
    size: 'large'
  },
  filter: {
     groups: [{name: 'filter'}],
    size: 'large'
  }
};

exports.fieldGroups = {
  defaults: [
     'purchaseNumber',  'purchaseDate'
  ],
  demand: ['buyers', 'buyersContacts', 'contactsNumber'],
  confession: ['seller', 'sellerContacts', 'telephone'],
  other: ['deliveryDate', {name: 'remanks', type: 'textarea', colspan: 2}, 'aplicationPreson', 'deptDrictor', 'purchase', 'check', 'generalManager'],
  filter: [
     'purchaseNumber', 'seller', 'sellerContacts'
   ],
  inlineAssetStatusGrid: [
     {label: '采购明细', type: 'inline-grid', name: 'pude', allowPick: false, allowAdd: true, allowEdit: true}
  ]
};

exports.grid = {
  columns: ['purchaseNumber', 'seller', 'sellerContacts', 'buyers', 'buyersContacts'],
  filterToolbar: true,
  fixedHeader: true,
  numberColumn: true,
  multiple: true,
  defaultOrder: 'deliveryDate-desc'
};

exports.operators = {
  exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
};

exports.exporting = {
  template: 'experiment/purchase_clean/purchase_clean.xls',
  fileName: '采购单表'
};


exports.doWithRouter = function(router) {
  router.get('/get-current-info', function (request) {
        var date = new Date(),
            sd = new SimpleDateFormat("yyyy-MM-dd"),
            createdTime,
            result = {};
            result.createdTime =  sd.format(date);
        return json({result: result}, exports.filters.accountsFilter);
    });

    //导出数据
    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/purchase_clean').on(function (exportXlsSvc, interformationSvc, request) {
         var options = request.params,result;
           options = exportXlsSvc.dealParameters(options, interformationSvc, 
            new PurchaseCleanSingle());
           result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);
           return json({flag: result.flag, filename: result.filename});
    }))
}


