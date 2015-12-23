var {mark}                    = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var logger = require('ringo/logging').getLogger(module.id);
var {SystemDataTransformation}= com.zyeeda.business.experiment.entity;
exports.style = 'grid';

exports.enableFrontendExtension = true;

exports.haveFilter = true;

exports.entityLabel = '系统数据转换确认单';

exports.filters ={
    defaults: {
     '!systemDataTransformationFilter': ['']
    }
};

exports.labels = {
     sysName: '编号',
     makeDate: '制表日期',
     inSysName: "信息系统名称",
     server: '服务器',
     tranStartData: '转换开始时间',
     tranCompleteData: '转换完成时间',
     dataTranHandle: '数据转换处理人',
     dataConversionDetails: '数据转换详情',
     validationContent: '验证内容',
     validationConclusion: '验证结论',
     validationPerson: '验证人',
     validationData: '验证时间'
};

exports.forms = {
 defaults: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication', columns: 2,label: '系统数据转换情况'},
     {name: 'Other', columns: 2,label: '验证意见'}
     ],
     size: 'large'
  },
 filter: {
    groups: [{name: 'filter', columns: 1}], size: 'small'
}
};

exports.fieldGroups = {
 defaults: [
     'sysName', {name: 'makeDate', type:'datepicker'}
  ],
 userApplication: [
     'inSysName', 'server',
     {name: 'tranStartData', type: 'datepicker'},
     {name: 'tranCompleteData', type: 'datepicker'},
     'dataTranHandle',
     {name: 'dataConversionDetails', type: 'textarea', colspan: 2}
     ],
 Other: [
     {name: 'validationContent', type: 'textarea', colspan: 2},
     {name: 'validationConclusion', type: 'textarea', colspan: 2},
     {name: 'validationPerson', type: 'text'},
     {name: 'validationData', type: 'datepicker', label: '日期'}
     ],
 filter: [
     'sysName', 'makeDate', 'inSysName'
  ]
};


exports.grid = {
  columns: ['sysName', 'makeDate', 'inSysName', 'tranStartData', 'dataTranHandle'],
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
     template: 'experiment/systemdatatransformation/systemdatatransformation.xls',
     fileName: '系统数据转换确认表'
 };


exports.doWithRouter = function(router) {
    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/systemdatatransformation').on(function (exportXlsSvc, interformationSvc, request) {
        var options = request.params,
            result;
        options = exportXlsSvc.dealParameters(options, interformationSvc, new SystemDataTransformation());

        result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }))
}