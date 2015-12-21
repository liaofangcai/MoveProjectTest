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
     sys_no: '编号',
     make_date: '制表日期',
     in_sys_name: "信息系统名称",
     server: '服务器',
     tran_start_data: '转换开始时间',
     tran_complete_data: '转换完成时间',
     data_tran_handle: '数据转换处理人',
     data_conversion_details: '数据转换详情',
     validation_content: '验证内容',
     validation_conclusion: '验证结论',
     validation_person: '验证人',
     validation_data: '验证时间'
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
     'sys_no',{name:'make_date',type:'datepicker'}
  ],
 userApplication: [
     'in_sys_name','server',
     {name:'tran_start_data',type:'datepicker'},
     {name:'tran_complete_data',type:'datepicker'},
     'data_tran_handle',
     {name: 'data_conversion_details',type: 'textarea',colspan: 2}
     ],
 Other: [
     {name: 'validation_content',type: 'textarea',colspan: 2},
     {name: 'validation_conclusion',type: 'textarea',colspan: 2},
     {name: 'validation_person',type: 'text'},
     {name: 'validation_data',type: 'datepicker',label: '日期'}
     ],
 filter: [
     'sys_no','in_sys_name','server'
  ]
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