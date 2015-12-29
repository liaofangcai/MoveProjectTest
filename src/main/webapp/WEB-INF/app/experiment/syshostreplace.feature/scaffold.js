var {mark}                    = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var logger = require('ringo/logging').getLogger(module.id);
var {SysHostReplace}= com.zyeeda.business.experiment.entity;

var {SimpleDateFormat}          = java.text;
var {Date}                      = java.util;

exports.style = 'grid';
exports.enableFrontendExtension = true;
exports.haveFilter = true;

exports.entityLabel = '系统主机更新记录';

exports.filters ={
    defaults: {
     '!sysHostReplaceFilter': ['']
    }
};

exports.labels = {
     sysNumber: '编号',
     sysName: '系统名称',
     hostNmae: "主机名称",
     hostUrl: '主机地址',
     operationPerson: '操作人',
     operationDate: '操作时间',
     updateContent: '更新内容(文件)',
     remarks: '备注'
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
     'sysNumber', 'sysName', 'hostUrl', 'hostNmae', 'operationPerson',
     {name: 'operationDate', type: 'datepicker'},
     {name: 'updateContent', type: 'textarea', colspan: 2},
     {name: 'remarks',type: 'textarea', colspan: 2}
  ],
 filter: [
     'sysNumber', 'hostUrl', 'hostNmae'
  ]
};

exports.grid = {
     columns: ['sysNumber', 'sysName', 'hostNmae', 'hostUrl', 'operationPerson'],
     filterToolbar: true,
     fixedHeader: true,
     numberColumn: true,
     multiple: true,
     defaultOrder: 'operationDate-desc'
};

exports.operators = {
     exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
 };

 exports.exporting = {
     template: 'experiment/syshostreplace/syshostreplace.xls',
     fileName: '系统(主机)更新记录表'
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
    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/syshostreplace').on(function (exportXlsSvc, interformationSvc, request) {
        var options = request.params,
            result;
        options = exportXlsSvc.dealParameters(options, interformationSvc, new SysHostReplace());

        result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }))
}