var {mark}                    = require('cdeio/mark');


exports.filters = {
  defaults: {
    '!pleaseEnoughDataFilter': ['please'],
    '!pleaseEnoughDatumFilter': ['']
  },
};

exports.entityLabel = '请购明细';

exports.labels = {
  goodsName : '物品名称',
  standardModel : '规格型号',
  company: '单位',
  number: '数量',
  estimatePrice: '预计价格',
  estimateCost: '预计费用'
};
exports.forms = {
    edit: {
        groups: [
          {name: 'defaults'},
        ],
        size: 'large'
    },
    show: {
        groups: [
          {name: 'defaults'},
        ],
        size: 'large'
    },
    add: {
        groups: [
          {name: 'defaults'},
        ],
        size: 'large'
    }

};
exports.fieldGroups = {
    defaults:[
      'goodsName', 'standardModel', 'company', 'number', 'estimatePrice', 'estimateCost'
    ],
    inlineAssetStatusGrid: [{
      label: '请购明细',
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
      'goodsName', 'standardModel', 'company', 'number'
    ]
};
