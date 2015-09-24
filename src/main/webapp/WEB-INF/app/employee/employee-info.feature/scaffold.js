var {mark}                    = require('cdeio/mark');
var {json}                    = require('cdeio/response');
var _                         = require('underscore');
var fs                        = require('fs');
var objects                   = require('cdeio/util/objects');
var response                  = require('ringo/jsgi/response');
var {getOptionInProperties}   = require('cdeio/config');
var {join}                    = require('cdeio/util/paths');
var {createService}           = require('employee/employee-info.feature/service');

var {EmployeeInfo}            = com.zyeeda.business.employee.entity;

var {SecurityUtils}           = org.apache.shiro;

var {SimpleDateFormat}        = java.text;
var {Date}                    = java.util;
var {ArrayList}               = java.util;
var {Boolean}                 = java.lang;
var URLDecoder                = java.net.URLDecoder;


exports.filters = {
  defaults: {
    '!employeeInfoFilter': [''],
    '!departmentFilter': ['parent(1)', 'children', 'accounts'],
    '!roleFilter': ['accounts', 'permissions'],
    '!otherInfoFilter': ['employeeInfo'],
    '!attachmentFilter': ['']
  }
};

exports.service = function(service){
    return _.extend(service, createService());
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
  bankNum: '工行卡号',
  insuranceNum: '社保电脑号',
  accumulationFund: '公积金号',
  attribution: '归属地',
  department: '部门',
  'department.name': '部门',
  'department.id': '部门',
  post: '岗位',
  grade: '级别',
  job: '职务',
  entryTime: '入职日期',
  seniority: '在职工龄',
  probation: '试用期(月)',
  positiveDate: '转正日期',
  agreementDate: '合同起始',
  agreementLast: '合同期限(年)',
  agreementEnd: '合同结束',
  graduateSchool: '毕业学校',
  graduateTime: '毕业时间',
  education: '学历',
  major: '专业',
  accountLocation: '户籍地址',
  locationKind: '户籍类型',
  adress: '现住址',
  emergency: '紧急联系人',
  emergencyRelation: '关系',
  emergencyTel: '紧急联系方式',
  remark: '备注',
  attachments: '附件',
  leaveDate: '离职日期',
  leaveProve: '离职证明',
  leaveReason: '离职原因',
  whetherLeaved: '状态'
};

exports.forms = {
  edit: {
      groups: [
        {name: 'defaults', columns: 2},
        {name: 'inlineOtherInfoGrid', label: '其他说明'}
      ],
      size: 'large'
  },
  show: {
      groups: [
        {name: 'defaults', columns: 2},
        {name: 'inlineOtherInfoGrid', label: '其他说明'}
      ],
      size: 'large'
  },
  add: {
      groups: [
        {name: 'defaults', columns: 2},
        {name: 'inlineOtherInfoGrid',label: '其他说明'}
      ],
      size: 'large'
  },
  filter: {
    groups: [{name: 'filter', columns: 1}],
    size: 'small'
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
     'empName','membership',{name: 'gender', type: 'dropdown', defaultValue: 1, source: [{id: 1, text: '男'}, {id: 0, text: '女'}]},'origin',
      'nation','marriage','phoneNum',{name:'idNum', statusChanger: true},'birthday','bankNum',
      'insuranceNum','accumulationFund',
      'attribution','department','post','grade','job',
      {name:'entryTime',statusChanger: true},
      'seniority',  'probation','positiveDate',
      {name:'agreementDate',statusChanger: true},
      {name:'agreementLast',statusChanger: true},
      'agreementEnd','graduateSchool','graduateTime','education',
      'major','accountLocation','locationKind','adress','emergency',
      'emergencyRelation','emergencyTel',
      {name: 'remark', type: 'textarea', colspan: 2},
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
    leave:['empName','membership','leaveDate',{name: 'leaveProve', type: 'dropdown', defaultValue: true, source: [{id: true, text: '是'}, {id: false, text: '否'}]},{name:'leaveReason', type: 'textarea',colspan: 2}],
    filter: [
      'empName', 'membership', 'department.name', 'phoneNum',{name: 'whetherLeaved', type: 'dropdown', defaultValue: true, source: [{id: 1, text: '在职'}, {id: 0, text: '离职'}]}
    ]
};


exports.grid = {
    columns: [
      'empName','membership','phoneNum','idNum','attribution',
      {name: 'department.name', header: '部门'},{name:'whetherLeaved', renderer: 'modifyLeaved'}
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

exports.picker = {
    grid: {
        columns: [
            { name: 'department.name', header: '部门', defaultContent: '', sortable: false, filter: 'text' }
        ]
    },
};

exports.operators = {
    leave: { label: '离职', icon: 'icon-leaf', style: 'btn-success', group: '20-selected',show: 'single-selected'},
    downloadImportTemplate: {label: '下载导入模板', icon: 'icon-cloud-download', group: '30-refresh', style: 'btn-info', show: 'unselected', order: 100},
    importXls: {label: '导入', icon: 'icon-download-alt', group: '30-refresh', style: 'btn-warning', show: 'unselected', order: 200},
    exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
};

exports.hooks = {
  beforeCreate: {
    defaults: mark('services', 'employee/employee-info').on(function (employeeInfoSvc,employeeInfo) {
      var subject = SecurityUtils.getSubject(),
          user = subject.getPrincipal();

      employeeInfo.creator = user.accountName;
      employeeInfo.creatorName = user.realName;
      employeeInfo.createdTime = new Date();
      employeeInfo.whetherLeaved = new Boolean(true)
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
exports.exporting = {
    template: 'employee/employee-info/employeeInfoModule.xls',
    fileName: '员工信息表'
};
exports.importing = {
    module: 'employeeInfo',
    enable: true,
    dateFormat: 'yyyy/MM/dd',
    template: 'employee/employee-info/员工信息.xls',
    startRow: 2,
    mapping: [
        {name: 'empName', column: 1, tileName: '姓名', type: 'string', isNull: false},
        {name: 'membership', column: 2, tileName: '隶属', type: 'string', isNull: false},
        {name: 'gender', column: 3, tileName: '性别', type: 'dropdown', isNull: false,
          source: [{id: '1', text: '男'}, {id: '0', text: '女'}]
        },
        {name: 'origin', column: 4, tileName: '籍贯', type: 'string', isNull: false},
        {name: 'nation', column: 5, tileName: '民族', type: 'string', isNull: false},
        {name: 'marriage', column: 6, tileName: '婚姻状况', type: 'string', isNull: false},
        {name: 'phoneNum', column: 7, tileName: '联系方式', type: 'string', isNull: false},
        {name: 'idNum', column: 8, tileName: '身份证号', type: 'string', isNull: false},
        {name: 'birthday', column: 9, tileName: '生日（阳历）', type: 'date', isNull: true},
        {name: 'bankNum', column: 10, tileName: '工行卡号', type: 'string', isNull: true},
        {name: 'insuranceNum', column: 11, tileName: '社保电脑号', type: 'string', isNull: true},
        {name: 'accumulationFund', column: 12, tileName: '公积金号', type: 'string', isNull: true},
        {name: 'attribution', column: 13, tileName: '归属地', type: 'string', isNull: true},
        {name: 'department', column: 14, tileName: '部门', type: 'picker', isNull: true},
        {name: 'post', column: 15, tileName: '岗位', type: 'string', isNull: true},
        {name: 'grade', column: 16, tileName: '级别', type: 'string', isNull: true},
        {name: 'job', column: 17, tileName: '职务', type: 'string', isNull: true},
        {name: 'entryTime', column: 18, tileName: '入职日期', type: 'date', isNull: true},
        {name: 'probation', column: 19, tileName: '试用期（月）', type: 'string', isNull: true},
        {name: 'positiveDate', column: 20, tileName: '转正日期', type: 'date', isNull: true},
        {name: 'agreementDate', column: 21, tileName: '合同起始', type: 'date', isNull: true},
        {name: 'agreementLast', column: 22, tileName: '合同期限（年）', type: 'int', isNull: true},
        {name: 'agreementEnd', column: 23, tileName: '合同结束', type: 'date', isNull: true},
        {name: 'graduateSchool', column: 24, tileName: '毕业学校', type: 'string', isNull: true},
        {name: 'graduateTime', column: 25, tileName: '毕业时间', type: 'date', isNull: true},
        {name: 'education', column: 26, tileName: '学历', type: 'string', isNull: true},
        {name: 'major', column: 27, tileName: '专业', type: 'string', isNull: true},
        {name: 'accountLocation', column: 28, tileName: '户籍地址', type: 'string', isNull: true},
        {name: 'locationKind', column: 29, tileName: '户籍类型', type: 'string', isNull: true},
        {name: 'adress', column: 30, tileName: '现住址', type: 'string', isNull: true},
        {name: 'emergency', column: 31, tileName: '紧急联系人', type: 'string', isNull: true},
        {name: 'emergencyRelation', column: 32, tileName: '关系', type: 'string', isNull: true},
        {name: 'emergencyTel', column: 33, tileName: '紧急联系方式', type: 'string', isNull: true},
        {name: 'remark', column: 34, tileName: '备注', type: 'string', isNull: true}

    ]
};

exports.doWithRouter = function(router) {
    router.post('/emp-leave', mark('services', 'employee/employee-info').on(function (employeeInfoSvc, request) {
        var data = request.params;

        employeeInfoSvc.employeeLeave(data);

        return json({flag: true});
    }));
     //导入已有数据
    router.post('/import-excel', mark('services', 'commons/import-excel', 'employee/employee-info').on(function (importXlsSvc, employeeInfoSvc, request) {
        var result, result2, saveAndCheckResult,
            rowNum, entityArray, i;

        entityArray = [];
        result = importXlsSvc.importExcel(request.params, exports.importing);
        rowNum = result.rowNum;

        for (i = 0; i < rowNum; i++) {
            entityArray.push(new EmployeeInfo());
        }

        result2 = importXlsSvc.fillEntity(result.rowDataArray, exports.importing, entityArray);
        saveAndCheckResult = employeeInfoSvc.saveEntities(request.params, result2.entityArray, result);
        result.failRowIdxes = saveAndCheckResult.failRowIdxes;
        result.repeatRowIdxes = saveAndCheckResult.repeatRowIdxes;

        return json({
            entityArray: result2.entityArray,
            pickerFields: result.pickerFields,
            specialFields: result.specialFields,
            failRowIdxes: result.failRowIdxes,
            repeatRowIdxes: result.repeatRowIdxes,
            successNum: result2.entityArray.length
        }, exports.filters.defaults);
    }));
    //下载导入模板地址设置
    router.get('/configuration/importsettings', function (request) {
        var getFileDirectoryByFilePath, getFileNameByFilePath, templateFilePath;

        getFileDirectoryByFilePath = function(filePath) {
            return filePath.substring(0, filePath.lastIndexOf('/'));
        };
        getFileNameByFilePath = function(filePath) {
            return filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
        };

        if(exports.importing && exports.importing.enable === true){

            templateFilePath = join(getOptionInProperties('cdeio.webapp.path'), 'module/import', getFileDirectoryByFilePath(exports.importing.template), URLDecoder.decode(getFileNameByFilePath(exports.importing.template), 'utf-8'));

            if(!fs.exists(templateFilePath)){
                return json({templateExists: false});
            }

            return json(objects.extend(exports.importing, {filename: getFileNameByFilePath(exports.importing.template)}));
        }

        return json({exportEnable: false});
    });

    //下载导入模板
    router.get('/down-import-template/:filename', function(request, filename) {
        var getFileDirectoryByFilePath, getFileNameByFilePath, templateFilePath;

        getFileDirectoryByFilePath = function(filePath) {
            return filePath.substring(0, filePath.lastIndexOf('/'));
        };
        getFileNameByFilePath = function(filePath) {
            return filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
        };

        templateFilePath = join(getOptionInProperties('cdeio.webapp.path'), 'module/import', getFileDirectoryByFilePath(exports.importing.template), URLDecoder.decode(getFileNameByFilePath(exports.importing.template), 'utf-8'));

        if(!fs.exists(templateFilePath)){
            return {result: "附件不存在"};
        }

        return response["static"](join(getOptionInProperties('cdeio.webapp.path'), 'module/import', getFileDirectoryByFilePath(exports.importing.template), URLDecoder.decode(getFileNameByFilePath(exports.importing.template), 'utf-8')), 'application/vnd.ms-excel');
    });
    //导出
    router.get('/export-excel', mark('services', 'commons/export-excel', 'employee/employee-info').on(function (exportXlsSvc, employeeInfoSvc, request) {
        var options = request.params,
            result;

        options = exportXlsSvc.dealParameters(options, employeeInfoSvc, new EmployeeInfo());

        result = employeeInfoSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }))
};
