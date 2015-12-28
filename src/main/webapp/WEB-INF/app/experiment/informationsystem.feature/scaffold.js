var {mark}                  = require('cdeio/mark');
var {json}                  = require('cdeio/response');
var logger = require('ringo/logging').getLogger(module.id);
var {InformationSystem}   = com.zyeeda.business.experiment.entity;

var {SimpleDateFormat}          = java.text;
var {Date}                      = java.util;

exports.style = 'grid';
exports.enableFrontendExtension = true;
exports.haveFilter = true;

exports.entityLabel = '信息系统上线申请';

exports.filters ={
    defaults: {
     '!informationSystemFilter': ['']
    }
};

exports.labels = {
     inSysNumber: '编号',
     aplicationDate: '申请日期',
     inSysName: "信息系统名称",
     sysCondition: '系统情况说明',
     completeTest: '是否完成测试',
     testCondition: '测试情况',
     relateSys: '上线信息系统是否涉及其他系统',
     comments: '备注',
     depeHandle: '处理人',
     impleHandle: '处理人',
     corportionPerson: '处理人',
     aplicationPerson: '申请人'
};

exports.forms = {
 add: {
    groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication', columns: 2, label: '上线申请'},
     {name: 'examineHandle', columns:2,label:'审核意见'}
     ],
     size: 'large'
  },
 edit: {
    groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication', columns: 2, label: '上线申请'},
     {name: 'examineHandle', columns:2, label: '审核意见'}
     ],
     size: 'large'
  },
 show: {
   groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication', columns: 2, label: '上线申请'},
     {name:'examineHandle', columns:2, label: '审核意见'}
    ],
    size: 'large'
  },
 filter: {
    groups: [{name: 'filter', columns: 1}], size: 'small'
}
};

exports.fieldGroups = {
 defaults: [
     'inSysNumber', {name: 'aplicationDate', type:'datepicker',label: '申请日期'}
  ],

 userApplication: [
     'inSysName', 
     {name: 'sysCondition', type: 'textarea', colspan: 2},
     {name: 'completeTest', type: 'dropdown', defaultValue: '是',source: [{id:'是', text: '是'},{id:'否', text: '否'}]},
     {name: 'relateSys', type: 'dropdown', defaultValue: '是',source: [{id:'是', text: '是'},{id:'否', text: '否'}]},
     {name: 'testCondition', type: 'textarea', colspan: 2},
     {name: 'comments', type: 'textarea', colspan: 2, label: '备注'},
     {name : 'aplicationPerson', label: "申请人" },{name: 'aplicationDept' , label: "申请部门"}],

 examineHandle: [
     {name: 'deptDirector', type: 'textarea', colspan: 2, label: '部门主管意见'},
     'depeHandle',
     {name: 'deptDate', type: 'datepicker',label: '处理日期'},
     {name: 'implementDept', type: 'textarea', colspan: 2, label: '实施部门意见'},
     'impleHandle',
     {name: 'implementDate', type: 'datepicker', label: '处理日期'},
     {name: 'corportionlead', type: 'textarea', colspan: 2, label: '公司领导审批'},
     'corportionPerson',
     {name: 'corportionDate', type: 'datepicker', label: '处理日期'}
     ],
filter: [
     'inSysNumber', 'inSysName', 'sysCondition'
  ]
};

exports.grid = {
  columns: ['inSysNumber', 'aplicationDate', 'inSysName', 'aplicationPerson', 'completeTest'],
  filterToolbar: true,
  fixedHeader: true,
  numberColumn: true,
  multiple: true,
  defaultOrder: 'aplicationDate-desc'
};

exports.operators = {
     exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
 };

 exports.exporting = {
     template: 'experiment/informationsystem/informationsystem.xls',
     fileName: '信息系统上线申请表'
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
    
    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/InformationSystem').on(function (exportXlsSvc, interformationSvc, request) {
        var options = request.params,
            result;
        options = exportXlsSvc.dealParameters(options, interformationSvc,new InformationSystem());
        result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);
        return json({flag: result.flag, filename: result.filename});
    }))
}