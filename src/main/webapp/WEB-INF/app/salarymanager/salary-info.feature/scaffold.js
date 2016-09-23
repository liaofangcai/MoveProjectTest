var {mark}                      = require('cdeio/mark');
var {json}                      = require('cdeio/response');
var _                           = require('underscore');
var fs                          = require('fs');
var objects                     = require('cdeio/util/objects');
var response                    = require('ringo/jsgi/response');
var {getOptionInProperties}     = require('cdeio/config');
var {join}                      = require('cdeio/util/paths');
var {createService}             = require('salarymanager/salary-info.feature/service');
var cdeio                       = require('cdeio/config').cdeio;

var {SalaryInfo, DepartmentCount}                = com.zyeeda.business.salarymanager.entity;
var {SecurityUtils}             = org.apache.shiro;

var {SimpleDateFormat}          = java.text;
var {Date}                      = java.util;
var {ArrayList}                 = java.util;
var URLDecoder                  = java.net.URLDecoder;

var {Boolean}                   = java.lang;

exports.filters = {
	defaults: {
		'!salaryInfoFilter': [''],
		'!employeeInfoFilter': ['otherInfos', 'attachments'],
		'!departmentFilter': ['parent(1)', 'children', 'accounts']
	}
}

exports.service = function(service){
    return _.extend(service, createService());
}

exports.haveFilter = true

exports.enableFrontendExtension = true

exports.entityLabel = "工资信息"

exports.labels = {
	employeeInfo: '员工姓名',
	'employeeInfo.empName': '员工姓名',
	'employeeInfo.department': '部门',
	'employeeInfo.department.name': '部门',
	mounth: '月份',
	basicSalary: '基本工资',
	levelSalary: '级别工资',
	postSalary: '岗位工资',
	managerSalary: '管理工资',
	salaryTotal: '工资总额',
	gradeLines: '绩效工资额度',
	shouldWorks: '应出勤天数',
	realityWorks: '实际出勤天数',
	attendeSalary: '考勤工资',
	gradeLevel: '绩效系数',
	gradeReward: '绩效奖',
	gradeSalary: '绩效工资',
	allowance: '补助',
	other: '其他',
	shouldSalary: '应付工资',
	insuranceCom: '社保(公司)',
	insuranceEmp: '社保(个人)',
	accumulationFundCom: '公积金(公司)',
	accumulationFundEmp: '公积金(个人)',
	tax: '个人所得税',
	realitySalary: '实发工资',
	remark: '备注'
}

exports.fieldGroups = {
	 defaults: [
	 	{name: 'employeeInfo', displayString: '{{empName}}'},
		'mounth',
		'basicSalary',
		'levelSalary',
		'postSalary',
		'managerSalary',
		'gradeLines',
		'gradeLevel',
		'allowance',
		'other',
		{name: 'shouldWorks', type: 'number', default: 0},
		{name: 'realityWorks', type: 'number', default: 0},
		'insuranceCom',
		'insuranceEmp',
		'accumulationFundCom',
		'accumulationFundEmp',
		{name: 'remark', type: 'textarea', colspan: 2}
	 ],
	 disabledGroup: [ //不可编辑的控件
	 	'tax',
	 	'salaryTotal',
	 	'attendeSalary',
	 	'gradeReward',
		'gradeSalary',
		'shouldSalary',
		'realitySalary'
	 ],
	  show: [
	 	'employeeInfo.empName',
		'mounth',
		'basicSalary',
		'levelSalary',
		'postSalary',
		'managerSalary',
		'gradeLines',
		'gradeLevel',
		'allowance',
		'other',
		{name: 'shouldWorks', type: 'number', default: 0},
		{name: 'realityWorks', type: 'number', default: 0},
		'insuranceCom',
		'insuranceEmp',
		'accumulationFundCom',
		'accumulationFundEmp',
		{name: 'remark', type: 'textarea', colspan: 2}
	 ],
	 filter: [
	 	'employeeInfo.empName',
	 	'employeeInfo.department.name',
	 	'mounth'
	 ]
}

exports.forms = {
	defaults: {
		groups: [
			{name: 'defaults', columns: 2}
			
		],
		size: 'large'
	},
	edit: {
		groups: [
			{name: 'defaults', columns: 2}
		],
		 size: 'large'
	},
	add: {
		groups: [
			{name: 'defaults', columns: 2}
		],
		size: 'large'
	},
	filter: {
		groups: [
			{name: 'filter', columns: 1}
		],
		size: 'small'
	},
	show: {
		groups: [
			{name: 'show', columns: 2},
			{name: 'disabledGroup', columns: 2}
		],
		size: 'large'
	}
}

exports.grid = {
	columns: [
		{name: 'employeeInfo.empName', header: '员工姓名'},
		'shouldWorks', 
		'realityWorks',
		'salaryTotal', 
		'realitySalary', 
		'remark'
	],
	
	filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
}

exports.operators = {
    downloadImportTemplate: {label: '下载导入模板', icon: 'icon-cloud-download', group: '30-refresh', style: 'btn-info', show: 'unselected', order: 100},
    importXls: {label: '导入', icon: 'icon-download-alt', group: '30-refresh', style: 'btn-warning', show: 'unselected', order: 200},
    exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
}

exports.hooks = {
  	beforeCreate: {
	    defaults: mark('services', 'salarymanager/salary-info', 'salarymanager/department-count').on(function (salaryInfoSvc, departmentCountSvc, salaryInfo) {
	       var addSalaryInfo = [salaryInfo]
	        salaryInfoSvc.dataHandler(salaryInfo, cdeio.taxTag)
			departmentCountSvc.saveDepCountEntities(addSalaryInfo)	        
    	})
  	},
  	beforeUpdate: {
	    defaults: mark('services', 'salarymanager/salary-info', 'salarymanager/department-count').on(function (salaryInfoSvc, departmentCountSvc, salaryInfo) {
	        salaryInfoSvc.dataHandler(salaryInfo, cdeio.taxTag)
	        
    	})
  	},
  	afterUpdate: {
  		defaults: mark('services', 'salarymanager/department-count').on(function (departmentCountSvc, salaryInfo) {
	      var beforeSalaryInfo
	      beforeSalaryInfo = departmentCountSvc.updateBeforeInfo()
	      departmentCountSvc.updateBySalaryInfo(salaryInfo, upadateTag)
    	})
  	}

}

exports.exporting = {
    template: 'salarymanager/salary-info/salaryinfo.xls',
    fileName: 'salaryinfo'
}

exports.importing = {
    module: 'salaryInfo',
    enable: true,
    dateFormat: 'yyyy/MM/dd',
    template: 'salarymanager/salary-info/salaryinfo.xls',
    startRow: 2,
    mapping: [
        {name: 'employeeInfo', column: 1, tileName: '员工姓名', type: 'picker', isNull: false},
        {name: 'mounth', column: 2, tileName: '月份', type: 'date', isNull: true},
        {name: 'basicSalary', column: 3, tileName: '基本工资', type: 'double', isNull: false},
        {name: 'levelSalary', column: 4, tileName: '级别工资', type: 'double', isNull: false},
        {name: 'postSalary', column: 5, tileName: '岗位工资', type: 'double', isNull: false},
        {name: 'managerSalary', column: 6, tileName: '管理工资', type: 'double', isNull: false},
        {name: 'salaryTotal', column: 7, tileName: '工资总额', type: 'double', isNull: false},
        {name: 'gradeLines', column: 8, tileName: '绩效工资额度', type: 'double', isNull: true},
        {name: 'shouldWorks', column: 9, tileName: '应出勤天数', type: 'double', isNull: false},
        {name: 'realityWorks', column: 10, tileName: '实际出勤天数', type: 'double', isNull: false},
        {name: 'attendeSalary', column: 11, tileName: '考勤工资', type: 'double', isNull: true},
        {name: 'gradeLevel', column: 12, tileName: '绩效系数', type: 'double', isNull: false},
        {name: 'gradeReward', column: 13, tileName: '绩效奖', type: 'double', isNull: true},
        {name: 'gradeSalary', column: 14, tileName: '绩效工资', type: 'double', isNull: true},
        {name: 'allowance', column: 15, tileName: '补助', type: 'double', isNull: false},
        {name: 'other', column: 16, tileName: '其他', type: 'double', isNull: true},
        {name: 'shouldSalary', column: 17, tileName: '应付工资', type: 'double', isNull: true},
        {name: 'insuranceCom', column: 18, tileName: '社保（公司）', type: 'double', isNull: false},
        {name: 'insuranceEmp', column: 19, tileName: '社保（个人）', type: 'double', isNull: false},
        {name: 'accumulationFundCom', column: 20, tileName: '公积金（公司）', type: 'double', isNull: false},
        {name: 'accumulationFundEmp', column: 21, tileName: '公积金（个人）', type: 'double', isNull: false},
        {name: 'tax', column: 22, tileName: '个人所得税', type: 'double', isNull: false},
        {name: 'realitySalary', column: 23, tileName: '实发工资', type: 'double', isNull: true},
        {name: 'remark', column: 24, tileName: '备注', type: 'string', isNull: true},
    ]
}

exports.doWithRouter = function(router) {

	//导出数据
    router.get('/export-excel', mark('services', 'commons/export-excel', 'salarymanager/salary-info').on(function (exportXlsSvc, salaryInfoSvc, request) {
        var options = request.params,
            result;

        options = exportXlsSvc.dealParameters(options, salaryInfoSvc, new SalaryInfo());

        result = salaryInfoSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }))

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

            templateFilePath = join(getOptionInProperties('cdeio.webapp.path'), 'WEB-INF/module/import', getFileDirectoryByFilePath(exports.importing.template), URLDecoder.decode(getFileNameByFilePath(exports.importing.template), 'utf-8'));

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

        templateFilePath = join(getOptionInProperties('cdeio.webapp.path'), 'WEB-INF/module/import', getFileDirectoryByFilePath(exports.importing.template), URLDecoder.decode(getFileNameByFilePath(exports.importing.template), 'utf-8'));

        if(!fs.exists(templateFilePath)){
            return {result: "附件不存在"};
        }

        return response["static"](join(getOptionInProperties('cdeio.webapp.path'), 'WEB-INF/module/import', getFileDirectoryByFilePath(exports.importing.template), URLDecoder.decode(getFileNameByFilePath(exports.importing.template), 'utf-8')), 'application/vnd.ms-excel');
    })

    //导入已有数据
    router.post('/import-excel', mark('services', 'commons/import-excel', 'salarymanager/salary-info').on(function (importXlsSvc, salaryInfoSvc, request) {
        var result, result2, saveAndCheckResult,
            rowNum, entityArray, i;

        entityArray = [];

        result = importXlsSvc.importExcel(request.params, exports.importing);

        rowNum = result.rowNum;

        for (i = 0; i < rowNum; i++) {
            entityArray.push(new SalaryInfo());
        }

        result2 = importXlsSvc.fillEntity(result.rowDataArray, exports.importing, entityArray);

        saveAndCheckResult = salaryInfoSvc.saveEntities(request.params, result2.entityArray, result);
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


}