var _                = require('underscore');
var {mark}           = require('cdeio/mark');
var {json}           = require('cdeio/response');
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

exports.entityLabel = "部门统计信息"

exports.labels = {
	depName: '部门名称',
	//'depName.id': '部门编号',
	'depName.name': '部门名称',
	year: '年份',
	mounth: '月份',
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
	 	'depName',
	 	'year',
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
	 	'depName',
	 	{name: 'year', type: 'number'},
	 	{name: 'mounth', type: 'number'}
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
		//{name: 'depName.id', header: '部门编号'},
		{name: 'depName', header: '部门名称'},
		{name: 'year', align: 'right'},
		{name: 'mounth', align: 'right'},
		{name: 'memberCount', align: 'right'},
		{name: 'shouldSalary', align: 'right'},
		{name: 'insuranceEmp', align: 'right'},
		{name: 'insuranceCom', align: 'right'},
		{name: 'accumulationFundEmp', align: 'right'},
		{name: 'accumulationFundCom', align: 'right'},
		{name: 'realitySalary', align: 'right'}
	],
	
	filterToolbar: true,
    fixedHeader: true,
    numberColumn: true,
    multiple: true,
    defaultOrder: 'createdTime-desc'
}

exports.operators = {
    updateInfo: { label: '更新', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
}

exports.doWithRouter = function(router) {
	router.post('/updateDepartmentCountInfo', mark('services','salarymanager/department-count').on(function (departmentCountSvc, request){
        var result;
        //插入数据后返回信息
		result = departmentCountSvc.updateInfo()
        return json({result: result});
    }))
}