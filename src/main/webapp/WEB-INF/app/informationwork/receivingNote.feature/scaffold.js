var {mark}                               = require('cdeio/mark');
var {json}                                 = require('cdeio/response');
var _                                         = require('underscore');
var fs                                        = require('fs');
var objects                               = require('cdeio/util/objects');
var response                            = require('ringo/jsgi/response');
var {getOptionInProperties}     = require('cdeio/config');
var {join}                                   = require('cdeio/util/paths');
var {createService}                  = require('informationwork/engineroom-log.feature/service');
var {ReceivingNote}                 = com.zyeeda.business.informationwork.entity;
var {SecurityUtils}                    = org.apache.shiro;
var {SimpleDateFormat}           = java.text;
var {Date}                                  = java.util;
var {ArrayList}                           = java.util;
var URLDecoder                       = java.net.URLDecoder;

exports.style = 'grid';

exports.enableFrontendExtension = true;

exports.haveFilter = true;

exports.entityLabel = '验收单';

exports.filters = {
  defaults: {
    '!receivingNoteFilter': [''],
    '!acceptanceConditionFilter': ['ple']
  }
};

exports.service = function(service){
  return _.extend(service, createService());
};

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

  testConclusion_Date:'校验日期',
  auditor:'审核人',
  auditorDate:'审核日期',
  purchasingAgent:'采购人',
  checker:'验收人',
  charge:'部门主管'
};

exports.forms = {
  edit: {
    groups: [
    {name: 'defaults', columns: 2},
    {name: 'inlineAssetStatusGrid', labelOnTop: true,columns: 2,label: '检验项目和验收情况'},
    {name : 'testConclusion', labelOnTop: true, label: '校验结论',columns:2},
    {name : 'unqualifiedDeals',  visible: false, labelOnTop: true, label: '不合格的处理', columns: 2}
    ],
    size: 'medium'
  },

  show: {
    groups: [
    {name: 'defaults', columns: 2},
    {name: 'inlineAssetStatusGrid', labelOnTop: true, columns: 2,label: '检验项目和验收情况'},
    {name : 'testConclusion',labelOnTop: true, label: '校验结论', columns:2},
    {name : 'unqualifiedDeals',  visible: true, labelOnTop: true, label: '不合格的处理', columns: 2}
    ],
    size: 'medium'
  },

  add: {
    groups: [
    {name: 'defaults', columns: 2},
    {name: 'inlineAssetStatusGrid', labelOnTop: true, columns: 2,label: '检验项目和验收情况'},
    {name : 'testConclusion', labelOnTop: true, label: '校验结论', columns: 2},
    {name : 'unqualifiedDeals',  visible: false, labelOnTop: true, label: '不合格的处理', columns: 2}
    ],
    size: 'medium'
  },

  filter: {
    groups: [{name: 'filter'}],
    size: 'medium'
  }
};

exports.fieldGroups = {
  defaults: [
  'receivingNoteNo', 'receivingNoteName', 'orderQuantity', 'inspectionBasis',
  'arrivalTime', 'purchasingAgent', 'checker', 'charge'
  ],

  testConclusion: [
  {name: 'testConclusion', type: 'dropdown', defaultValue: 'qualified', source: [{id: 'qualified', text: '合格'},
  {id: 'unqualified', text: '不合格'}]}, 'testConclusion_Date'
  ],

  unqualifiedDeals: [ 'auditor', 'auditorDate',
  {name: 'unqualifiedDeal', type: 'dropdown', colspan: 2,defaultValue: '',
  source: [{id: 'eturnGoods', text: '退货'}, {id: 'pickingUp', text: '捡用'}, {id: 'concessionReception', text: '让步接收'},
  {id: 'scrap', text: '报废'}, {id: 'overAgain', text: '返工'}, {id: 'repair', text: '返修'}]}
  ],

  inlineRecruitmentInterviewGrid: [
  'testCaseName', 'testCaseNo', 'count', 'unqualifiedCount',
  {name: 'result', type: 'dropdown', colspan: 2,defaultValue: 'qualified', source: [{id: 'qualified', text: '合格'},
  {id: 'unqualified', text: '不合格'}]}, {name : 'mark',type :'textarea',colspan :2}
  ],

  filter: [
  'receivingNoteNo', 'receivingNoteName', 'inspectionBasis', {name: 'arrivalTime', type: 'date-range'}
  ],

inlineAssetStatusGrid:[
     {label: '检验项目和验收情况', type: 'inline-grid', name: 'please', allowPick: false, allowAdd: true, allowEdit: true}
  ]

};

exports.grid = {
  columns: ['receivingNoteNo', 'receivingNoteName', 'orderQuantity', 'inspectionBasis', 'arrivalTime',
  {name: 'testConclusion', renderer: 'modifyEnabled'}
  ],
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
  router.get('/export-excel', mark('services', 'commons/export-excel', 'informationwork/receivingNote').on(function (exportXlsSvc, receivingNoteSvc, request) {
    var options = request.params, result;

    options = exportXlsSvc.dealParameters(options, receivingNoteSvc, new ReceivingNote());
    result = receivingNoteSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

    return json({flag: result.flag, filename: result.filename});
  }))
}
