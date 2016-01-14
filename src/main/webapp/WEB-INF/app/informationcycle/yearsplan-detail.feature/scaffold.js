var {mark}                  = require('cdeio/mark');
var {json}                  = require('cdeio/response');
var _                       = require('underscore');
var {YearsPlanDetail}       = com.zyeeda.business.informationcycle.entity;
var {SecurityUtils}         = org.apache.shiro;
var {SimpleDateFormat}      = java.text;
var {Date}                  = java.util;

exports.filters = {
  defaults: {
    '!yearsPlanDetailFilter': 'yearsPlan',
    '!yearsPlanFilter': ''
  }
};

exports.entityLabel = '年度计划明细';

exports.labels = {
  emphasisWork: '重点工作项目',
  principal: '专案负责人',
  forecastedDate: '预定完成日期',
  remark: '其他说明'
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
      'emphasisWork',
      'principal',
      'forecastedDate',
      {name: 'remark', type: 'textarea', colspan: 2}
    ]
};

exports['inline-grid'] = {
    columns: [
      'emphasisWork',
      'principal', 'forecastedDate', 'remark'
    ]
};
