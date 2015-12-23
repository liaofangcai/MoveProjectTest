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
     sysNumber: '编号',
     aplicationDate: '申请日期',
     sysNmae: "系统名称",
     chReType: '变更请求类型',
     pleaseNote: '请说明',
     chApPerson: '申请人',
     apCompany: '申请单位',
     chApDescribe: '变更申请描述',
     chInfluence: '变更影响',
     deptDirectorOpinion: '申请部门主管意见'
};

exports.forms = {
 defaults: {
     groups: [
     {name: 'defaults', columns: 2},
     {name: 'userApplication', columns: 2,label: '变更申请'},
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
     'sysNumber', {name: 'aplicationDate', type: 'datepicker',label: '申请日期'}
  ],
 userApplication: [
     'sysNmae',
     {name: 'chReType', type: 'dropdown', defaultValue: '数据新增',source: [{id: '数据新增',text: '数据新增'}, {id:'数据修改', text: '数据修改'},{id: '数据删除', text: '数据删除'},{id: '其它',text: '其它'}]}, 'pleaseNote'
     ],
 Other: ['chApPerson','apCompany',
      {name: 'chApDescribe', type: 'textarea',colspan: 2, label: '变更内容描述'},
      {name: 'chInfluence', type: 'textarea', colspan: 2, label: '变更的影响(该项由维护部门填写)'},
      {name: 'deptDirectorOpinion', type: 'text',  label: "申请部门主管意见"},
      {name: 'directorDate', type: 'datepicker', label: '日期'},
      {name: 'projectOpinion', type: 'text',  label: "项目负责人意见(维护部门填写)"},
      {name: 'projectDate', type: 'datepicker', label: '日期'}],
 filter: [
     'sysNumber', 'sysNmae', 'apCompany'
  ]
};

exports.grid = {
  columns: ['sysNumber', 'aplicationDate', 'sysNmae', 'chApPerson', 'apCompany'],
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