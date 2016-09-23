var {mark}                  = require('cdeio/mark');
var {createManager}         = require('cdeio/manager');
var commExpService          = require('commons/export-excel.feature/service');

var {SalaryInfo}            = com.zyeeda.business.salarymanager.entity;
var {EmployeeInfo}          = com.zyeeda.business.employee.entity;
var {EntityMetaResolver}    = com.zyeeda.cdeio.web.scaffold;

var {SecurityUtils}         = org.apache.shiro;
var {ArrayList}             = java.util;
var {HashMap}               = java.util;
var {Date}                  = java.util;
var {Boolean}               = java.lang;
var {SimpleDateFormat}      = java.text;


exports.createService = function() {
	return {
        list: mark('beans', EntityMetaResolver).mark('tx').on(function (resolver, entity, options) {
            var meta = resolver.resolveEntity(SalaryInfo),
                salaryInfoMgr = createManager(meta.entityClass),
                queryParams,
                salaryInfo,
                k,
                index,
                results;
            //如果是有日期查询条件的话，截取日期格式为年月的形式
            queryParams = options.filters
            if (queryParams) {
                if (queryParams.toString().indexOf('mounth') != -1) {
                    for(k =0; k<queryParams.length; k++){
                        if (queryParams[k].toString().indexOf('mounth') != -1) {
                            //2016-12-7
                            index = queryParams[k][2].lastIndexOf('-')//7
                            queryParams[k][2] = queryParams[k][2].substr(0,index) + '-01'                         
                        }
                    }
                }
            }
            
            options.filters = queryParams || [];
            options.orders = options.orders || [];

            if (options.filters) {
                results = salaryInfoMgr.findByEntity(options);
            } else {
                results = salaryInfoMgr.findByExample(entity, options);
            }

            return results;
        }),
        //在导入信息时用来存储实体的方法
        saveEntities: mark('managers', SalaryInfo, EmployeeInfo).mark('tx').on(function (salaryInfoMgr, employeeInfoMgr, params, entityArray, result) {
                var i, entity, empName, employeeList 

                for (i = 0; i < entityArray.length; i++) {
                    entity = entityArray[i];

                    empName = result.pickerFields[i].colName;
                    employeeList = salaryInfoMgr.getEmployeeByName({name: empName});
                    if(employeeList != null && employeeList.size() > 0){
                        //设置导入实体的的员工信息
                        entity.employeeInfo = employeeList.get(0);
                        //console.log('导入时从数据库中查出来的数据的格式测试（输出性别）:', employeeList.get(0).gender)
                        //设置导入实体的员工对应的departmentPath
                        entity.departmentPath = entity.employeeInfo.department.path
                    }
                }

                if (result.failRowIdxes.length === 0 && result.repeatRowIdxes.length === 0) {
                    salaryInfoMgr.save.apply(salaryInfoMgr.save, entityArray);
                }
                return {failRowIdxes: result.failRowIdxes, repeatRowIdxes: result.repeatRowIdxes};
        }),
        //用来处理添加和更新数据的方法
        dataHandler: function(salaryInfo, taxTag) {
            var time,
            date,
            timeArr = [],
            sdf = new SimpleDateFormat("yyyy-MM-dd")
            //处理时间，统一变为一号
            console.log('没有修改的日期****************：', salaryInfo.mounth)
            time = sdf.format(salaryInfo.mounth)
            timeArr = time.split('-')
            timeArr[2] = 1
            date = new Date(timeArr[0]-1900, timeArr[1]-1, timeArr[2])
            salaryInfo.mounth = date
            console.log('修改的日期********************：', salaryInfo.mounth)
            
            
            //工资总额自动计算
            salaryInfo.salaryTotal = salaryInfo.basicSalary + salaryInfo.levelSalary + salaryInfo.postSalary + salaryInfo.managerSalary 
            //考勤工资自动计算
            salaryInfo.attendeSalary = (salaryInfo.salaryTotal/salaryInfo.shouldWorks*salaryInfo.realityWorks).toFixed(2)
            //绩效奖自动计算
            salaryInfo.gradeReward = ((salaryInfo.gradeLevel - 1) * salaryInfo.gradeLines).toFixed(2)
            //绩效工资计算
            salaryInfo.gradeSalary = (salaryInfo.attendeSalary + salaryInfo.gradeReward).toFixed(2)
            //应付工资自动计算
            salaryInfo.shouldSalary = salaryInfo.gradeSalary + salaryInfo.other + salaryInfo.allowance
            //个人所得税计算
            salaryInfo.tax = (taxHandler((salaryInfo.shouldSalary - salaryInfo.accumulationFundEmp - salaryInfo.insuranceEmp), taxTag)).toFixed(2)
            //实发工资自动计算
            salaryInfo.realitySalary = (salaryInfo.shouldSalary - salaryInfo.insuranceEmp - salaryInfo.accumulationFundEmp - salaryInfo.tax).toFixed(2)
            //存储员工部门path
            salaryInfo.departmentPath = salaryInfo.employeeInfo.department.path

            function taxHandler(salary, taxTag) {
                var taxSalary = salary - 3500
                if(taxSalary <= 0){
                    return 0
                }
                //不含税级距的计算方式（计算个人所得税）
                if (taxTag == 'uninclude') {
                     if(taxSalary <= 1455) {
                    return taxSalary * 0.03 
                    }
                    if(taxSalary>1455 && taxSalary<=4155) {
                        return taxSalary * 0.1 - 105
                    }
                    if(taxSalary>4155 && taxSalary<=7755) {
                        return taxSalary * 0.2 - 555
                    }
                    if(taxSalary>7755 && taxSalary<=27255) {
                        return taxSalary * 0.25 - 1005
                    }
                    if(taxSalary>27255 && taxSalary<=41255) {
                        return taxSalary * 0.30 - 2755
                    }
                    if(taxSalary>41255 && taxSalary<=57505) {
                        return taxSalary * 0.35 - 5505
                    }
                    if(taxSalary>57505) {
                        return taxSalary * 0.45 - 13505
                    }
                }
                //含税级距的计算方式（计算个人所得税）
                if (taxTag == 'include') {
                     if(taxSalary <= 1500) {
                    return taxSalary * 0.03 
                    }
                    if(taxSalary>1500 && taxSalary<=4500) {
                        return taxSalary * 0.1 - 105
                    }
                    if(taxSalary>4500 && taxSalary<=9000) {
                        return taxSalary * 0.2 - 555
                    }
                    if(taxSalary>9000 && taxSalary<=35000) {
                        return taxSalary * 0.25 - 1005
                    }
                    if(taxSalary>35000 && taxSalary<=55000) {
                        return taxSalary * 0.30 - 2755
                    }
                    if(taxSalary>55000 && taxSalary<=80000) {
                        return taxSalary * 0.35 - 5505
                    }
                    if(taxSalary>80000) {
                        return taxSalary * 0.45 - 13505
                    }
                }
            }
        },


		//导出工资信息
		exportExcel: mark('beans', EntityMetaResolver).on(function (resolver, options, exportModule, exportFileName) {
            var beans = new HashMap(),
                vo, vos = new ArrayList(),
                entity, entities,
                meta = resolver.resolveEntity(SalaryInfo),
                dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
                entities = commExpService.createService().listEntities(options, meta);

            // 按照自己的要求处理数据
            for (i = 0; i < entities.size(); i++) {
                entity = entities.get(i);
                vo = commExpService.createService().convertEntityToObj(entity);
                vos.add(vo);
            }

            beans.put('SalaryInfos', vos);
            beans.put('footer', '操作时间:' + dateTimeStr);

            return commExpService.createService().exportExcel(beans, exportModule, exportFileName);
        })
	}
}