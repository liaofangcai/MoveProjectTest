var {mark}                  = require('cdeio/mark');
var {json}                  = require('cdeio/response');
var _                       = require('underscore');
var {YearsBudgetDetail}       = com.zyeeda.business.informationcycle.entity;
var {SecurityUtils}         = org.apache.shiro;
var {SimpleDateFormat}      = java.text;
var {Date}                  = java.util;

exports.filters = {
  defaults: {
    '!yearsBudgetDetailFilter': 'yearsBudget',
    '!yearsBudgetFilter': ''
  }
};

exports.entityLabel = '年度预算明细';

exports.labels = {
  demandExplain: '需求说明',
  january: '一月',
  february: '二月',
  march: '三月',
  april: '四月',
  may: '五月',
  june: '六月',
  july: '七月',
  august: '八月',
  september: '九月',
  october: '十月',
  november: '十一月',
  december: '十二月',
  total: '合计',
  remark: '备注'
};

exports.forms = {
    defaults: {
        groups: [
          {name: 'defaults', columns: 2},
        ],
        size: 'large'
    }
};

exports.fieldGroups = {
    defaults:[
      'demandExplain',
      'january','february','march','april','may','june','july','august','september','october','november',
      'december','total',
      {name: 'remark', type: 'textarea', colspan: 2}
    ]
};

exports['inline-grid'] = {
    columns: [
      'demandExplain',
      'total', 'remark'
    ]
};
