var {mark}                  = require('cdeio/mark');
var {json}                  = require('cdeio/response');
var logger = require('ringo/logging').getLogger(module.id);
var {InformationSystem}   = com.zyeeda.business.experiment.entity;
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
     in_sys_no: '编号',
     aplicationdate: '申请日期',
     in_sys_name: "信息系统名称",
     sys_condition: '系统情况说明',
     complete_test: '是否完成测试',
     test_condition: '测试情况',
     relate_sys: '上线信息系统是否涉及其他系统',
     comments: '备注'
};

exports.forms = {
 add: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication',columns: 2, label: '上线申请'},
     {name: 'examineHandle',columns:2,label:'审核意见'}
     ],
     size: 'large'
  },
 edit: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication',columns: 2, label: '上线申请'},
     {name: 'examineHandle',columns:2,label:'审核意见'}
     ],
     size: 'large'
  },
 show: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication',columns: 2, label: '上线申请'},
     {name:'examineHandle',columns:2,label: '审核意见'}
    ],
    size: 'large'
  },
 filter: {
    groups: [{name: 'filter', columns: 1}], size: 'small'
}
};

exports.fieldGroups = {
 defaults: [
     'in_sys_no',{name:'aplicationdate',type:'datepicker',label:'申请日期'}
  ],
 userApplication: [
    'in_sys_name','sys_condition',
    {name: 'complete_test', type: 'dropdown', defaultValue: '是',source:[{id:'是',text: '是'},
                                                                 {id:'否', text: '否'}
                                                                    ]},
     {name:'test_condition',type: 'textarea', colspan: 2},
     {name: 'relate_sys', type: 'dropdown', defaultValue: '是',source:[{id:'是',text: '是'},
                                                                 {id:'否', text: '否'}
                                                                    ]},
     'comments',{name : 'aplicationperson',label: "申请人" },{name: 'aplicationdept' ,label : "申请部门"}
     ],
 examineHandle: [
     {name:'dept_director',type: 'text',label:'部门主管意见'},
     {name:'dept_date',type:'datepicker',label:'日期'},
     {name:'implement_dept',type: 'text', label: '实施部门意见'},
     {name:'implement_date',type:'datepicker',label:'实施日期'},
     {name:'corportionlead',type:'text',label:'公司领导审批'},
     {name:'corportiondate',type:'datepicker',label:'公司领导审批日期'}
     ],
filter: [
     'in_sys_no','in_sys_name', 'sys_condition'
  ]
};


exports.operators = {
     exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
 };

 exports.exporting = {
     template: 'experiment/informationsystem/informationsystem.xls',
     fileName: '信息系统上线申请表'
 };

 exports.doWithRouter = function(router) {
    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/InformationSystem').on(function (exportXlsSvc, interformationSvc, request) {
        var options = request.params,
            result;
        options = exportXlsSvc.dealParameters(options, interformationSvc,new InformationSystem());

        result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }))
}