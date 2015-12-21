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
     sys_no: '编号',
     make_date: '制表日期',
     maintain_date: '维护日期',
     maintion_person: "维护人",
     host_name: '主机名称',
     maintion_reason: '维护原因',
     maintion_content: '维护内容',
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
     'sys_no',{name:'make_date',type:'datepicker'},{name:'maintain_date',type:'datepicker'},
     'maintion_person','host_name','maintion_reason','maintion_content','remarks'
  ],
 filter: [
     'sys_no','maintion_person','host_name'
  ]
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