var {mark}                  = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var logger = require('ringo/logging').getLogger(module.id);
var {Sysdatachange}         = com.zyeeda.business.experiment.entity;
exports.style = 'grid';

exports.enableFrontendExtension = true;

exports.haveFilter = true;

exports.entityLabel = '系统数据变更申请';

exports.filters ={
    defaults: {
     '!sysdatachangeFilter': ['']
    }
};

exports.labels = {
     sys_no: '编号',
     aplicationdate: '申请日期',
     sys_name: "系统名称",
     ch_re_type: '变更请求类型',
     ch_ap_person: '变更申请人',
     ap_company: '申请单位',
     ch_ap_describe: '变更申请描述',
};

exports.forms = {
 add: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication', columns: 2,label: '变更申请'},
     {name: 'pleasenote', columns: 1, visible: false,labelOnTop: true,label: '请说明'},
     {name: 'Other', columns: 2}
     ],
     size: 'large'
  },
 edit: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication', columns: 2,label: '变更申请'},
     {name: 'pleasenote', columns: 1, visible: false,labelOnTop: true,label: '请说明'},
     {name: 'Other', columns: 2}
     ],
     size: 'large'
  },
 show: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication', columns: 2,label: '变更申请'},
     {name: 'pleasenote', columns: 1, visible: false,labelOnTop: true,label: '请说明'},
     {name: 'Other', columns: 2}
    ],
    size: 'large'
  },
 filter: {
    groups: [{name: 'filter', columns: 1}], size: 'small'
}
};

exports.fieldGroups = {
 defaults: [
     'sys_no',{name:'aplicationdate',type:'datepicker',label:'申请日期'}
  ],
 userApplication: [
     'sys_name',
     {name: 'ch_re_type', type: 'dropdown', defaultValue: '数据新增',source:[{id: '数据新增',text: '数据新增'},{id:'数据修改', text: '数据修改'},{id: '数据删除', text: '数据删除'},{id: '其它',text: '其它'}]}
     ],
 pleasenote: ['pleasenote'],
 Other: ['ch_ap_person','ap_company',
      {name: 'ch_ap_describe',type: 'textarea',colspan: 2, label: '变更内容描述'},
      {name: 'ch_influence',type: 'textarea', colspan: 2, label: '变更的影响(该项由维护部门填写)'},
      {name: 'dept_director_opinion',type: 'text',  label: "申请部门主管意见"},
      {name: 'director_date',type: 'datepicker',label: '日期'},
      {name: 'project_opinion',type: 'text',  label: "项目负责人意见(维护部门填写)"},
      {name: 'project_date',type: 'datepicker',label: '日期'}],
 filter: [
     'sys_no','sys_name','ch_ap_describe'
  ]
};

exports.operators = {
     exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
 };

 exports.exporting = {
     template: 'experiment/sysdatachange/sysdatachange.xls',
     fileName: '系统数据变更申请表'
 };

 exports.doWithRouter = function(router) {
    router.get('/export-excel', mark('services', 'commons/export-excel', 'experiment/sysdatachange').on(function (exportXlsSvc, interformationSvc, request) {
        var options = request.params,
            result;
        options = exportXlsSvc.dealParameters(options, interformationSvc, new Sysdatachange());

        result = interformationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }))
}