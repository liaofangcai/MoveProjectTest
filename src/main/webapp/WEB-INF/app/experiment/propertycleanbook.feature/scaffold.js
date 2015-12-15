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
     property_no : '编号',
     property_date : '日期',
     property_number : '生产编号',
     property_name : '资产名称',
     modelnorms : '型号规格',
     safekeepingperson : '保管人',
     producevender : '生产厂家',
     company: '单位',
     purchasedate: '购置日期',
     purchaseprice : '采购价格',
     contaceinformation : '联系方式',
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
     'property_no',{name:'property_date',type:'datepicker',label:'日期'},'property_number',
     'property_name','modelnorms','safekeepingperson','producevender','company',{name:'purchasedate',type:'datepicker',label:'日期'},'purchaseprice','contaceinformation'
     ,'site','remark'
  ],
filter: [
     'property_no','property_name'
  ]
};

exports.operators = {
     exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
};

exports.exporting = {
    template: 'experiment/propertycleanbook/propertycleanbook.xls',
    fileName: '系统权限管理表'
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