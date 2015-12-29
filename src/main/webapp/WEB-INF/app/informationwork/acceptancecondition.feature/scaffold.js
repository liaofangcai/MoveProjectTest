var {mark}                    = require('cdeio/mark');


exports.filters = {
  defaults: {
    '!receivingNoteFilter': ['please'],
    '!acceptanceconditionFilter': ['']
  },
};

exports.entityLabel = '检验项目和验收情况';

exports.labels = {
  testCaseName:'产品名称',
  testCaseNo:'规格型号',
  count:'交付数量',
  result:'验收结果',
  unqualifiedCount:'不合格数量',
  mark:'备注'
};
exports.forms = {
    edit: {
        groups: [
          {name: 'defaults', columns: 2},
        ],
        size: 'large'
    },
    show: {
        groups: [
          {name: 'defaults', columns: 2},
        ],
        size: 'large'
    },
    add: {
        groups: [
          {name: 'defaults', columns: 2},
        ],
        size: 'large'
    }

};
exports.fieldGroups = {
  defaults:[
  'testCaseName', 'testCaseNo', 'count', 'unqualifiedCount',
  {name: 'result', type: 'dropdown', colspan: 2,defaultValue: 'qualified', source: [{id: '合格', text: '合格'},
  {id: '不合格', text: '不合格'}]},
  {name: 'mark', type: 'textarea', colspan: 2}
  ],
  inlineAssetStatusGrid: [{
  label: '检验项目和验收情况',
  type: 'inline-grid',
  name: 'assetStatus',
  disableShow: true,
  allowAdd: true,
  multiple: false,
  allowPick: false
}]
};

exports['inline-grid'] = {
    columns: [
      'testCaseName', 'testCaseNo', 'count', 'result'
    ]
};
