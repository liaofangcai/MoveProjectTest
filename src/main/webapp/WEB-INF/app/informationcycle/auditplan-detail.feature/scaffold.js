var {mark}                  = require('cdeio/mark');
var {json}                  = require('cdeio/response');
var _                       = require('underscore');
var {AuditPlanDetail}       = com.zyeeda.business.informationcycle.entity;
var {SecurityUtils}         = org.apache.shiro;
var {SimpleDateFormat}      = java.text;
var {Date}                  = java.util;

exports.filters = {
  defaults: {
    '!auditPlanDetailFilter': 'auditPlan',
    '!auditPlanFilter': ''
  }
};

exports.entityLabel = '稽核计划明细明细';

exports.labels = {
  auditNum: '稽核编号',
  auditProject: '稽核项目',
  auditDate: '预定稽核期间',
  auditStartDate: '实际稽核开始日期',
  auditEndDate: '实际稽核结束日期',
  interiorMatter: '内部控制缺失及异常事项',
  measuresAndPlan: '应行处理措施及改善计划',
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
    {name: 'auditNum', colspan: 2},
     'auditProject','auditDate','auditStartDate','auditEndDate',
    {name: 'interiorMatter', type: 'textarea', colspan: 2},
    {name: 'measuresAndPlan', type: 'textarea', colspan: 2},
    {name: 'remark', type: 'textarea', colspan: 2}
  ]
};

exports['inline-grid'] = {
  columns: [
    'auditNum', 'auditProject', 'auditDate', 'auditStartDate', 'auditEndDate'
  ]
};
