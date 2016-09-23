var _                = require('underscore');
var {createService}  = require('salarymanager/department-count.feature/service');

exports.filters = {
	defaults: {
		'!departmentCountFilter': [''],
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
	depName: '部门名称',
	'depName.name': '部门名称',
	mounth: '年月',
	memberCount: '部门成员',
	shouldSalary: '应付工资',
	insuranceEmp: '社保（个人）',
	insuranceCom: '社保（公司）',
	accumulationFundEmp: '公积金（个人）',
	accumulationFundCom: '公积金（公司）',
	tax: '个人所得税',
	realitySalary: '实发工资'

}

exports.fieldGroups = {
	 defaults: [
	 	'depName.name',
	 	'mounth',
	 	'memberCount',
	 	'shouldSalary',
	 	'insuranceEmp',
	 	'insuranceCom',
	 	'accumulationFundEmp',
	 	'accumulationFundCom',
	 	'tax',
	 	'realitySalary'
	 ],
	 filter: [
	 	'depName.name',
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
	filter: {
		groups: [
			{name: 'filter', columns: 1}
		],
		size: 'small'
	}
}

exports.grid = {
	columns: [
		{name: 'depName.name', header: '部门名称'},
		'shouldWorks', 
		'memberCount',
	 	'shouldSalary',
	 	'insuranceEmp',
	 	'insuranceCom',
	 	'accumulationFundEmp',
	 	'accumulationFundCom',
	 	'tax',
	 	'realitySalary'
	],
	
	filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
}
