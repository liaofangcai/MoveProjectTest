var {mark}                  = require('cdeio/mark');
var {json}                  = require('cdeio/response');
var logger = require('ringo/logging').getLogger(module.id);
var {ResearchDemand}        = com.zyeeda.business.experiment.entity;
exports.style = 'grid';

exports.enableFrontendExtension = true;

exports.haveFilter = true;

exports.entityLabel = '研发需求申请';

exports.filters = {
    defaults: {
     '!researchDemandFilter': ['']
    }
};

exports.labels = {
     researchNumber: '编号',
     makeDate: '制表日期',
     brifeIntroduction: "事由简述",
     projectType: '项目类别',
     demandPutForword: '需求提出人',
     demandForworDate: '需求提出时间',
     atttibuteDept: '属于部门',
     contactInformating: '联系方式',
     reason: '主要原因或背景 (识别并确认客户或者系统产品开发的要求，市场应用定位等)',
     function: '功能/性能/业务、通信规约、交互接口、技术规范等需求（如果有单独的需求类文档，均可以附件的形式，此时本处只需要填写附件的名称即可)',
     completeTask: '完成任务（客户/系统产品开发）的进度要求',
     examineOpinion: '研发部（包含系统软件开发部、开发测试部开发组、预付费产品开发组）审核意见',
     examineSign: '签字',
     examineDate: '日期',
     ratifyOpinion: '批准意见',
     ratifySign: '签字',
     ratifyDate: '日期'
};

exports.forms = {
 defaults: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'basicDocument', columns: 2,label: '基本资料'},
     {name: 'userApplication', columns: 2,label: '审批'}
    ],
     size: 'large'
  },
 filter: {
     groups: [{name: 'filter', columns: 1}], size: 'small'
  } 
};

exports.fieldGroups = {
 defaults: [
     'researchNumber', {name: 'makeDate', type: 'datepicker',label: '制表日期'}
  ],
 basicDocument:['brifeIntroduction', 'projectType', 'demandPutForword',
     {name: 'demandForworDate', type: 'datepicker', label: '需求提出时间'}, 'atttibuteDept','contactInformating'],
 userApplication: [
     {name: 'reason',type: 'textarea',colspan: 2},
     {name: 'function',type: 'textarea',colspan: 2},
     {name: 'completeTask',type: 'textarea',colspan: 2},
     {name: 'examineOpinion',type: 'textarea',colspan: 2},'examineSign',
     {name:'examineDate',type:'datepicker'},
     {name: 'ratifyOpinion',type: 'textarea',colspan: 2},'ratifySign',
     {name:'ratifyDate',type:'datepicker'}
     ],
 filter: [
     'researchNumber','makeDate','projectType'
  ]
};

exports.grid = {
    columns: [
     'researchNumber',{name:'makeDate',type:'datepicker',label:'制表日期'},'brifeIntroduction','projectType','demandPutForword'
    ],
    events: {
     'system/departments#tree:onClick': 'departmentChanged'
    },
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
     template: 'experiment/researchdemand/researchdemand.xls',
     fileName: '研发需求申请表'
 };

 exports.doWithRouter = function(router) {
    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/researchdemand').on(function (exportXlsSvc, interformationSvc, request) {
     var options = request.params,
            result;
     options = exportXlsSvc.dealParameters(options, interformationSvc, new ResearchDemand());

     result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

     return json({flag: result.flag, filename: result.filename});
    }))
}