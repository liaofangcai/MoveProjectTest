var {mark}                  = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var logger = require('ringo/logging').getLogger(module.id);
var {SysHostMaintain}         = com.zyeeda.business.experiment.entity;
exports.style = 'grid';

exports.enableFrontendExtension = true;

exports.haveFilter = true;

exports.entityLabel = '系统主机维护记录';

exports.filters ={
    defaults: {
     '!sysHostMaintainFilter': ['']
    }
};

exports.labels = {
     sysName: '编号',
     makeDate: '制表日期',
     maintainDate: '维护日期',
     maintionPerson: "维护人",
     hostName: '主机名称',
     maintionReason: '维护原因',
     maintionContent: '维护内容',
     remarks: '备注',
};

exports.forms = {
 defaults: {
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
     'sysName',
     {name: 'makeDate', type: 'datepicker'},
     {name: 'maintainDate', type: 'datepicker'},
     'maintionPerson', 'hostName', 'maintionReason', 
     {name: 'maintionContent', type: 'textarea', colspan: 2},
     {name: 'remarks', type: 'textarea', colspan: 2}
  ],
 filter: [
     'sysName', 'makeDate', 'hostName'
  ]
};

exports.grid = {
  columns: ['sysName', 'makeDate', 'maintionPerson', 'hostName', 'maintionReason'],
  filterToolbar: true,
  fixedHeader: true,
  numberColumn: true,
  multiple: true,
  defaultOrder: 'makeDate-desc'
};

exports.operators = {
     exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
 };

 exports.exporting = {
     template: 'experiment/syshostmaintain/syshostmaintain.xls',
     fileName: '系统主机维护记录表'
 };
 
exports.doWithRouter = function(router) {
    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/syshostmaintain').on(function (exportXlsSvc, interformationSvc, request) {
        var options = request.params,
            result;
        options = exportXlsSvc.dealParameters(options, interformationSvc, new SysHostMaintain());
        result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }))
}