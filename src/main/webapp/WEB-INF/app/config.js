var config = require('cdeio/config');
var logger = require('ringo/logging').getLogger(module.id);
var {mark} = require('cdeio/mark');

var {SecurityUtils}             = org.apache.shiro;

var {FrontendSettingsCollector} = com.zyeeda.cdeio.web;

exports.cdeio = {
  entityPackages: [
    'com.zyeeda.cdeio.commons.authz.entity',
    'com.zyeeda.cdeio.commons.resource.entity',
    'com.zyeeda.cdeio.commons.organization.entity',
    'com.zyeeda.business.commons.entity',
    'com.zyeeda.business.notice.entity',
    'com.zyeeda.business.process.entity',

    // 出差
    'com.zyeeda.business.trip.entity',
    'com.zyeeda.business.employee.entity',
    'com.zyeeda.business.recruitment.entity'
  ],

  orms: [

    // 系统
    'src/main/resources/META-INF/mappings/system/account-department.orm.xml',
    'src/main/resources/META-INF/mappings/system/account.orm.xml',
    'src/main/resources/META-INF/mappings/system/notice.orm.xml',
    'src/main/resources/META-INF/mappings/system/my-notice.orm.xml',

    // 流程
    'src/main/resources/META-INF/mappings/process/businessDefinition.orm.xml',
    'src/main/resources/META-INF/mappings/process/processDefinition.orm.xml',
    'src/main/resources/META-INF/mappings/process/processInstance.orm.xml',
    'src/main/resources/META-INF/mappings/process/processTaskInfo.orm.xml',
    'src/main/resources/META-INF/mappings/process/processSettingItem.orm.xml',
    'src/main/resources/META-INF/mappings/process/approvalHistory.orm.xml',

    // 数据字典
    'src/main/resources/META-INF/mappings/dictionary/main-dictionary.orm.xml',

    // 出差
    'src/main/resources/META-INF/mappings/trip/trip-apply.orm.xml',
    'src/main/resources/META-INF/mappings/trip/trip-cost.orm.xml',
    'src/main/resources/META-INF/mappings/trip/trip-report.orm.xml',
    //员工管理
    'src/main/resources/META-INF/mappings/employee/other-info.orm.xml',
    //档案管理
    'src/main/resources/META-INF/mappings/recruitment/recruitment-interview.orm.xml',
  ],

  disableAuthz: false,

  defaultOperators: {
    add: {
      label: '添加', icon: 'icon-plus', group: '10-add', style: 'btn-success', show: 'unselected', order: 100
    },
    show: {
      label: '查看', icon: 'icon-eye-open', group: '20-selected', style: 'btn-info', show: 'single-selected', order: 100
    },
    edit: {
      label: '编辑', icon: 'icon-edit', group: '20-selected', style: 'btn-warning', show: 'single-selected', order: 200
    },
    del: {
      label: '删除', icon: 'icon-minus', group: '20-selected', style: 'btn-danger', show: 'single-selected', order: 300
    },
    refresh: {
      label: '刷新', icon: 'icon-refresh', group: '40-refresh', style: 'btn-purple', show: 'always', order: 100
    }
  },

  useOwnUnitProcessTaskRoles: [

  ],

  haveSystemMenuRoles: [
    '系统管理员'
  ]
};

FrontendSettingsCollector.add('collector', 'registered in collector');

exports.frontendSettings = {
  'cdeio.application.name': 'cdeio.application.name',
  'cdeio.sso.rp.base.path': 'cdeio.sso.rp.base.path',
  'cdeio.upload.path': function(context){
    return config.getOptionInProperties('cdeio.upload.path');
  },
  'cdeio.webapp.path': function(context){
    return config.getOptionInProperties('cdeio.webapp.path');
  },
  'collector': 'collector',
  currentUser: function(context) {
    var subject = SecurityUtils.getSubject(),
      p = subject.getPrincipal(),
      isAdmin;

    if (p == null) {
      return {};
    }

    if ('admin' === (p.getAccountName()).toLowerCase()) {
      isAdmin = true;
    }

    return {
      accountName: p.getAccountName(),
      realName: p.getRealName(),
      email: p.getEmail(),
      isAdmin: isAdmin
    };
  },
  signOutUrl: mark('beans', 'openIdProvider').on(function(openIdProvider, context) {
    return openIdProvider.getSignOutUrl();
  })
};
