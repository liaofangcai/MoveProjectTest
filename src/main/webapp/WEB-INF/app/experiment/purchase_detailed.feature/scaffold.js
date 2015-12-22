var {mark}                    = require('cdeio/mark');

exports.filters = {
  defaults: {
    '!purchaseDetailedFilter': [''],
    '!purchaseCleanSingleFilter': ['pude']
  },
};

exports.entityLabel = '采购明细';

exports.labels = {
  goodsName : '物品名称',
  modelStandard : '规格型号',
  company: '单位',
  number: '数量',
  univalent: '单价',
  money: '金额'
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
      'goodsName' , 'modelStandard' , 'company' , 'number' , 'univalent', 'money'
    ],
    inlineAssetStatusGrid: [{
      label: '采购明细',
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
      'goodsName', 'modelStandard', 'company', 'number'
    ]
};
