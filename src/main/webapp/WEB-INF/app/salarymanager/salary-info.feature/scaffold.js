var {mark}                      = require('cdeio/mark');
var {json}                      = require('cdeio/response');
var _                           = require('underscore');
var fs                          = require('fs');
var objects                     = require('cdeio/util/objects');
var response                    = require('ringo/jsgi/response');
var {getOptionInProperties}     = require('cdeio/config');
var {join}                      = require('cdeio/util/paths');
var {createService}             = require('salarymanager/salary-info.feature/service');

var {SalaryInfo}                = com.zyeeda.business.salarymanager.entity;
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
	 	'employeeInfo',
		'mounth',
		'basicSalary',
		'levelSalary',
		'postSalary',
		'managerSalary',
		'shouldWorks',
		'realityWorks',
		'gradeLevel',
		'allowance',
		'other',
		'insuranceCom',
		'insuranceEmp',
		'accumulationFundCom',
		'accumulationFundEmp',
		'tax',
		{name: 'remark', type: 'textarea', colspan: 2}
	 ],
	 employeeName: [
	 	'employeeInfo',
	 	'mounth',
		'basicSalary',
		'levelSalary',
		'postSalary',
		'managerSalary',
		'shouldWorks',
		'realityWorks',
		'gradeLevel',
		'allowance',
		'other',
		'insuranceCom',
		'insuranceEmp',
		'accumulationFundCom',
		'accumulationFundEmp',
		'tax',
		{name: 'remark', type: 'textarea', colspan: 2}
	 ],
	 disabledGroup: [ //不可编辑的控件
	 	'salaryTotal',
	 	'attendeSalary',
	 	'gradeReward',
		'gradeSalary',
		'shouldSalary',
		'realitySalary'
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
			{name: 'employeeName', columns: 2},
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

exports.hooks = {
  beforeCreate: {
    defaults: mark('services', 'salarymanager/salary-info').on(function (salaryInfoSvc,salaryInfo) {
        var subject = SecurityUtils.getSubject(),
          	user = subject.getPrincipal();
      	
      	//工资总额自动计算
	    salaryInfo.salaryTotal = salaryInfo.basicSalary + salaryInfo.levelSalary + salaryInfo.postSalary + salaryInfo.managerSalary 
	 	//考勤工资自动计算
	 	salaryInfo.attendeSalary = salaryInfo.salaryTotal/salaryInfo.shouldWorks*salaryInfo.realityWorks
	 	//绩效工资计算
	 	//salaryInfo.gradeSalary = 
	 	//绩效奖自动计算
	 	//salaryInfo.gradeReward = (salaryInfo.gradeLevel - 1)*salaryInfo.gradeSalary
      

      
    })
  }
}