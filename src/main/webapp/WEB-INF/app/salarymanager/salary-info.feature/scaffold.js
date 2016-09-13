
exports.filters = {
	defaults: {
		'!salaryInfoFilter': [''],
		'!employeeInfoFilter': ['salaryInfos', 'department', 'otherInfos', 'attachments']
	}
}

exports.haveFilter = true

exports.entityLabel = "工资信息"

exports.labels = {
	employeeInfo: '员工姓名',
	'employeeInfo.empName': '员工姓名',
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
		'salaryTotal',
		'shouldWorks',
		'realityWorks',
		'attendeSalary',
		'gradeLevel',
		'gradeReward',
		'gradeSalary',
		'allowance',
		'other',
		'shouldSalary',
		'insuranceCom',
		'insuranceEmp',
		'accumulationFundCom',
		'accumulationFundEmp',
		'tax',
		'realitySalary',
		{name: 'remark', type: 'textarea', colspan: 2}
	 ],
	 // inlineEmpNameGrid: [
	 // 	{
	 // 		label: '选择员工'
	 // 		name: 'employeeInfo', 
	 // 		type: 'inline-grid', 
	 // 		allowPick: false, 
	 // 		allowAdd: true,
  //     		allowEdit: true
  //     	}
	 // ],
	 filter: [
	 	'employeeInfo.empName',
	 	'mounth'
	 ]
}

exports.forms = {
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
	}
}

exports.grid = {
	columns: [
		'employeeInfo', 
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

// exports.hooks = {
//   beforeCreate: {
//     defaults: mark('services', 'dealer/dealer-connection').on(function (dealerInfoSvc,dealerConnection) {
//       var subject = SecurityUtils.getSubject(),
//           user = subject.getPrincipal();

//       dealerConnection.creator = user.accountName;
//       dealerConnection.creatorName = user.realName;
//       dealerConnection.createdTime = new Date();
//     })
//   },
//   beforeUpdate: {
//     defaults: function (dealerConnection) {
//       var subject = SecurityUtils.getSubject(),
//           user = subject.getPrincipal();

//       dealerConnection.lastModifier = user.accountName;
//       dealerConnection.lastModifierName = user.realName;
//       dealerConnection.lastModifiedTime = new Date();
//     }
//   },
//   // beforeRemove: {
//   //   defaults: mark('services', 'commodity/other-prop').on(function (otherPropertySvc, commodityInfo) {
//   //      otherPropertySvc.removeOtherInfoByCommodityInfoId(commodityInfo.id);
//   //   }),
//   // }
// }