var {mark}                  = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var logger = require('ringo/logging').getLogger(module.id);
var {SystemRemoteVisit}         = com.zyeeda.business.experiment.entity;
exports.style = 'grid';

exports.enableFrontendExtension = true;

exports.haveFilter = true;

exports.entityLabel = '系统远程访问申请单';

exports.filters ={
    defaults: {
     '!systemRemoteVisitFilter': ['']
    }
};

exports.labels = {
     vi_no: '编号',
     ap_date: '申请日期',
     in_ap_name: "系统名称",
     server_url: '服务器地址',
     server_uses: '服务器用途',
     visit_reason: '访问原因',
     operation_content: '操作内容',
     ap_person: '申请人',
     ap_dept: '申请部门',
     dept_charge_opinion: '部门主管意见',
     dept_date: '日期',
     in_dept_opinion: '信息部门意见',
     in_dept_opinion: '日期',
     company_leader: '公司领导审批',
     leader_date: '日期'

};

exports.forms = {
 add: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication', columns: 2,label: '远程访问申请'},
     {name: 'Other', columns: 2,label: '审核意见'}
     ],
     size: 'large'
  },
 edit: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication', columns: 2,label: '远程访问申请'},
     {name: 'Other', columns: 2,label: '审核意见'}
     ],
     size: 'large'
  },
 show: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication', columns: 2,label: '远程访问申请'},
     {name: 'Other', columns: 2,label: '审核意见'}
    ],
    size: 'large'
  },
 filter: {
    groups: [{name: 'filter', columns: 1}], size: 'small'
}
};

exports.fieldGroups = {
 defaults: [
     'vi_no',{name:'ap_date',type:'datepicker',label:'申请日期'}
  ],
 userApplication: [
     'in_ap_name','server_url','server_uses',
     {name: 'visit_reason',type: 'textarea',colspan: 2},
     {name: 'operation_content',type: 'textarea',colspan: 2},
     'ap_person','ap_dept'
     ],
 Other: [
     {name: 'dept_charge_opinion',type: 'text', label: '部门主管意见'},
     {name: 'ch_influence',type: 'datepicker',  label: '日期'},
     {name: 'in_dept_opinion',type: 'text',  label: "信息部门意见"},
     {name: 'in_date',type: 'datepicker',label: '日期'},
     {name: 'company_leader',type: 'text',  label: "公司领导审批"},
     {name: 'leader_date',type: 'datepicker',label: '日期'}],
 filter: [
     'vi_no','in_ap_name','server_uses'
  ]
};

exports.operators = {
     exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
 };

 exports.exporting = {
     template: 'experiment/systemremotevisit/systemremotevisit.xls',
     fileName: '系统数据变更申请表'
 };


exports.doWithRouter = function(router) {
    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/systemremotevisit').on(function (exportXlsSvc, interformationSvc, request) {
        var options = request.params,
            result;
        options = exportXlsSvc.dealParameters(options, interformationSvc, new SystemRemoteVisit());

        result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }))
}