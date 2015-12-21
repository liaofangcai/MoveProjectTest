var {mark}                    = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var _                         = require('underscore');
var fs                        = require('fs');
var objects                   = require('cdeio/util/objects');
var response                  = require('ringo/jsgi/response');
var {getOptionInProperties}   = require('cdeio/config');
var {join}                    = require('cdeio/util/paths');
var {createService}           = require('informationwork/engineroom-log.feature/service');

var {ReceivingNote}             = com.zyeeda.business.informationwork.entity;
var {SecurityUtils}           = org.apache.shiro;

var {SimpleDateFormat}        = java.text;
var {Date}                    = java.util;
var {ArrayList}               = java.util;
var URLDecoder                = java.net.URLDecoder;

exports.style = 'grid';
//启用前台交互扩展，这样就可以给按钮添加事件了
exports.enableFrontendExtension = true;

exports.haveFilter = true;
exports.filters = {
  defaults: {
    '!receivingNoteFilter': ['']
  }
};
/*
exports.service = function(service){
    return _.extend(service, createService());
};
*/
exports.entityLabel = '验收单';

exports.labels = {
  receivingNoteNo: '编号',
  receivingNoteName: '供应商名称',
  orderQuantity: '订购数量',
  inspectionBasis:'校验依据',
  arrivalTime:'到货日期',
  testConclusion:'校验结论',
  unqualifiedDeal: '不合格处理',

  testCaseName:'产品名称',
  testCaseNo:'规格型号',
  count:'交付数量',
  result:'验收结果',
  unqualifiedCount:'不合格数量',
  mark:'备注',

  testConclusion_Date:'日期',
  auditor:'审核人',
  auditorDate:'日期',
  purchasingAgent:'采购人',
  checker:'验收人',
  charge:'部门主管'



};

exports.forms = {
  edit: {
      groups: [
        {name: 'defaults', columns: 2},
        {name: 'inlineRecruitmentInterviewGrid', columns: 2,label: '检验情况'},
        {name : 'testConclusions',label: '校验结论',columns:2},
        {name : 'unqualifiedDeals',label: '处理'}
      ],
      size: 'medium'
  },
  show: {
      groups: [
        {name: 'defaults', columns: 2},
        {name: 'inlineRecruitmentInterviewGrid', columns: 2,label: '检验情况'},
        {name : 'testConclusions',label: '校验结论'},
        {name : 'unqualifiedDeals',label: '处理'}
      ],
      size: 'medium'
  },
  add: {
      groups: [
        {name: 'defaults', columns: 2},
        {name: 'inlineRecruitmentInterviewGrid', columns: 2,label: '检验情况'},
        {name : 'testConclusions',label: '校验结论'},
        {name : 'unqualifiedDeals',label: '处理'}
      ],
      size: 'medium'
  },
  filter: {
    groups: [{name: 'filter'}],
    size: 'medium'
  }
};

exports.fieldGroups = {
  defaults:[
  'receivingNoteNo', 'receivingNoteName','orderQuantity','inspectionBasis',
  'arrivalTime','purchasingAgent','checker','charge'],
  testConclusions:[{name: 'testConclusion', type: 'dropdown', defaultValue: 1, source: [{id: '合格', text: '合格'}, {id: '不合格', text: '不合格'}]},'testConclusion_Date'],
  unqualifiedDeals:[{name: 'unqualifiedDeal', type: 'dropdown', defaultValue: 1,
  source: [{id: '退货', text: '退货'}, {id: '捡用', text: '捡用'},{id: '让步接收', text: '让步接收'},{id: '报废', text: '报废'},{id: '返工', text:
    '返工'},{id: '返修', text: '返修'}]},'auditor','auditorDate'],
  //配置查询条件
  filter: [
    'receivingNoteNo', 'receivingNoteName', {name: 'arrivalTime', type: 'date-range'}
   ],
   inlineRecruitmentInterviewGrid:[
      'testCaseName', 'testCaseNo','count',
      {name: 'result', type: 'dropdown', defaultValue: 1, source: [{id: '合格', text: '合格'}, {id: '不合格', text: '不合格'}]},
      'unqualifiedCount','mark'
  ]

};
exports.grid = {
    columns: ['receivingNoteNo', 'receivingNoteName','orderQuantity','inspectionBasis','arrivalTime',
    'testConclusion','unqualifiedDeal'],
    filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
};

exports.exporting = {
  template: 'informationwork/receivingNote/receivingNoteModule.xls',
  fileName: '验收单'
};
exports.operators = {
    exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
};
exports.doWithRouter = function(router) {
  //导出
  router.get('/export-excel', mark('services', 'commons/export-excel', 'informationwork/receivingNote').on(function (exportXlsSvc, receivingNoteSvc, request) {
      var options = request.params,
          result;

      options = exportXlsSvc.dealParameters(options, receivingNoteSvc, new ReceivingNote());

      result = receivingNoteSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

      return json({flag: result.flag, filename: result.filename});
  }))
}
