var {mark}                    = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var _                         = require('underscore');

var {employeeInfo}            = com.zyeeda.business.employee.entity;

var {SecurityUtils}           = org.apache.shiro;
var {getOptionInProperties}   = require('cdeio/config');
var {join}                    = require('cdeio/util/paths');
var {SimpleDateFormat}        = java.text;
var {Date}                    = java.util;
var {ArrayList}               = java.util;
var URLDecoder                = java.net.URLDecoder;
var fs                        = require('fs');
var objects                   = require('cdeio/util/objects');
var response                  = require('ringo/jsgi/response');

exports.filters = {
  defaults: {
    '!employeeInfoFilter': [''],
    '!departmentFilter': ['parent(1)', 'children', 'accounts'],
    '!roleFilter': ['accounts', 'permissions'],
    '!otherInfoFilter': ['employeeInfo']
  }
};

exports.haveFilter = true;

exports.enableFrontendExtension = true;

exports.entityLabel = '员工信息';

exports.labels = {
  empName: '姓名',
  membership: '隶属',
  gender: '性别',
  origin: '籍贯',
  nation: '民族',
  marriage: '婚姻状况',
  phoneNum: '联系方式',
  idNum: '身份证号',
  birthday: '生日',
  bankNum: '银行卡号',
  insuranceNum: '社保电脑号',
  accumulationFund: '公积金号',
  attribution: '归属地',
  department: '部门',
  'department.name': '部门',
  'department.id': '部门',
  post: '岗位',
  grade: '级别',
  job: '职务',
  entryTime: '入职时间',
  seniority: '在职工龄',
  probation: '试用期',
  positiveDate: '转正日期',
  agreementDate: '合同起始日期',
  agreementLast: '合同年限',
  agreementEnd: '合同结束日期',
  graduateSchool: '毕业院校',
  graduateTime: '毕业时间',
  education: '学历',
  major: '专业',
  accountLocation: '户籍地址',
  locationKind: '户籍类型',
  adress: '现地址',
  emergency: '紧急联系人',
  emergencyRelation: '紧急联系人关系',
  emergencyTel: '紧急联系方式',
  remark: '备注',
  attachments: '附件',
  leaveDate: '离职日期',
  leaveProve: '是否开证明',
  leaveReason: '离职原因'
};

exports.forms = {
  edit: {
      groups: [
        {name: 'defaults', columns: 2},
        'inlineOtherInfoGrid'
      ],
      size: 'large'
  },
  show: {
      groups: [
        {name: 'defaults', columns: 2},
        'inlineOtherInfoGrid'
      ],
      size: 'large'
  },
  add: {
      groups: [
        {name: 'defaults', columns: 2},
        'inlineOtherInfoGrid'
      ],
      size: 'large'
  },
  leave: {
      groups: [{name:'leave',columns: 2}],
      size: 'large',
  }
};

exports.feature = {
  views: ['form:leave']
};

exports.fieldGroups = {
    defaults:[
     'empName','membership','department',{name: 'gender', type: 'dropdown', defaultValue: true, source: [{id: true, text: '男'}, {id: false, text: '女'}]},'origin',
      'nation','marriage','phoneNum','idNum','birthday','bankNum','insuranceNum','accumulationFund',
      'attribution','post','grade','job','entryTime','seniority','probation','positiveDate','agreementDate','agreementLast','agreementEnd','graduateSchool','graduateTime','education',
      'major','accountLocation','locationKind','adress','emergency','emergencyRelation',
      'emergencyTel',{name: 'remark', type: 'textarea', colspan: 2},
       {name: 'attachments',
        colspan: 2,
        type: 'file-picker',
        multiple: true,
        url: 'invoke/system/upload',
        acceptFileTypes: "(\\.|\\/)(swf|mp4|avi|wmv|doc|docx|xls|xlsx|ppt|pptx|zip|rar|7z|pdf|txt|jpg|jpeg|png|gif)$"}
    ],
    inlineOtherInfoGrid:[
      {label: '其他说明', type: 'inline-grid', name: 'otherInfos', allowPick: false, allowAdd: true}
    ],
    leave:['empName','membership','leaveDate',{name: 'leaveProve', type: 'dropdown', defaultValue: true, source: [{id: true, text: '是'}, {id: false, text: '否'}]},{name:'leaveReason', type: 'textarea',colspan: 2}]
};


exports.grid = {
    columns: [
      'empName','membership',{name: 'department.name', header: '部门'},'phoneNum','attribution'
    ],
    events: {
        'system/departments#tree:onClick': 'departmentChanged'
    },
    filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
};

// exports['inline-grid'] = {
//     columns: [
//         'empName','membership',{name: 'department.name', header: '部门'},'phoneNum','attribution'
//     ]
// };

exports.picker = {
    grid: {
        columns: [
            { name: 'department.name', header: '部门', defaultContent: '', sortable: false, filter: 'text' }
        ]
    },
};

exports.operators = {
    leave: { label: '离职', icon: 'icon-leaf', style: 'btn-success', group: '20-selected',show: 'single-selected'}
};


exports.hooks = {
  beforeCreate: {
    defaults: mark('services', 'emoloyee/employee-info').on(function (employeeInfoSvc,employeeInfo) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      employeeInfo.creator = user.accountName;
      employeeInfo.creatorName = user.realName;
      employeeInfo.createdTime = new Date();
    })
  },
  beforeUpdate: {
    defaults: function (employeeInfo) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      employeeInfo.lastModifier = user.accountName;
      employeeInfo.lastModifierName = user.realName;
      employeeInfo.lastModifiedTime = new Date();
    }
  },
  beforeRemove: {
    defaults: mark('services', 'employee/other-info').on(function (otherInfoSvc, employeeInfo) {

      otherInfoSvc.removeOtherInfoByEmployeeId(employeeInfo.id);
    }),
  }
};

exports.doWithRouter = function(router) {
    router.post('/emp-leave', mark('services', 'employee/employee-info').on(function (employeeInfoSvc, request) {
        var data = request.params;

        employeeInfoSvc.employeeLeave(data);

        return json({flag: true});
    }));
};
