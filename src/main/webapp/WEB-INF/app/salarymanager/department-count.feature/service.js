var {mark}                  = require('cdeio/mark');
var {createManager}         = require('cdeio/manager');
var commExpService          = require('commons/export-excel.feature/service');

var {DepartmentCount}       = com.zyeeda.business.salarymanager.entity;
var {SalaryInfo}            = com.zyeeda.business.salarymanager.entity;
var {EntityMetaResolver}    = com.zyeeda.cdeio.web.scaffold;

var {SecurityUtils}         = org.apache.shiro;
var {ArrayList}             = java.util;
var {HashMap}               = java.util;
var {Date}                  = java.util;
var {Boolean}               = java.lang;
var {SimpleDateFormat}      = java.text;


exports.createService = function() {
    var beforeSalaryInfo
	return {
        list: mark('beans', EntityMetaResolver).mark('tx').on(function (resolver, entity, options) {
            var meta = resolver.resolveEntity(DepartmentCount),
                departmentCountMgr = createManager(meta.entityClass),
                queryParams,
                salaryInfo,
                k,
                index,
                results;
            //如果是有日期查询条件的话，截取日期格式为年月的形式
            queryParams = options.filters
            //xxxx = queryParams.length
            if (queryParams) {
                if (queryParams.toString().indexOf('mounth') != -1) {
                    for(k =0; k<queryParams.length; k++){
                        if (queryParams[k].toString().indexOf('mounth') != -1) {
                            //2016-12-7
                            index = queryParams[k][2].lastIndexOf('-')
                            queryParams[k][2] = queryParams[k][2].substr(0,index) + '-01'                         
                        }
                    }
                }
            }
            
            options.filters = queryParams || [];
            options.orders = options.orders || [];

            if (options.filters) {
                results = departmentCountMgr.findByEntity(options);
            } else {
                results = departmentCountMgr.findByExample(entity, options);
            }

            return results;
        }),

        //在导入信息是用来存储实体的方法
        saveDepCountEntities: mark('managers', DepartmentCount).mark('tx').on(function (departmentCountMgr, salaryInfoArr) {
                var i, salaryInfo, result, departmentCountItems,departmentCountArray = []
                var sdf, timeArr, date ,time, mounth, departmentPath
                for (i = 0; i < salaryInfoArr.length; i++) {
                    salaryInfo = salaryInfoArr[i];
                    //处理时间，存入薪资管理>部门统计中的工资汇总信息的日期的day统一为1号
                    sdf = new SimpleDateFormat("yyyy-MM-dd")
                    time = sdf.format(salaryInfo.mounth)
                    timeArr = time.split('-')
                    timeArr[2] = 1
                    date = new Date(timeArr[0]-1900, timeArr[1]-1, timeArr[2])
                    mounth = date

                    departmentPath = salaryInfo.departmentPath
                    departmentCountItems = departmentCountMgr.getSumSalaryByPathAndMounth({depPath: departmentPath, mounth: mounth});
                    
                    if(departmentCountItems != null && departmentCountItems.size() > 0){//部门统计表中已经存在该部门该月份的工资汇总信息的时候，此时只需要做修改操作
                        result = (departmentCountItems.get(0))

                        result.memberCount =11 
                        result.shouldSalary = salaryInfo.shouldSalary + result.shouldSalary
                        result.insuranceEmp = salaryInfo.insuranceEmp + result.insuranceEmp
                        result.insuranceCom = salaryInfo.insuranceCom + result.insuranceCom
                        result.accumulationFundEmp = salaryInfo.accumulationFundEmp + result.accumulationFundEmp
                        result.accumulationFundCom = salaryInfo.accumulationFundCom + result.accumulationFundCom
                        result.tax = salaryInfo.tax + result.tax
                        result.realitySalary = salaryInfo.realitySalary + result.realitySalary
                        
                    }else {//部门统计表中没有存在该部门该月份的工资汇总信息的时候，此时只需要做添加操作
                        var departmentCount = new DepartmentCount()
                        salaryInfo.insuranceEmp = salaryInfo.insuranceEmp || 0
                        salaryInfo.insuranceCom = salaryInfo.insuranceCom || 0
                        salaryInfo.accumulationFundEmp = salaryInfo.accumulationFundEmp || 0
                        salaryInfo.accumulationFundCom = salaryInfo.accumulationFundCom || 0
                        departmentCount.depName = salaryInfo.employeeInfo.department                       
                        departmentCount.departmentPath = salaryInfo.departmentPath
                        departmentCount.mounth = mounth
                        departmentCount.memberCount =11 
                        departmentCount.shouldSalary = salaryInfo.shouldSalary 
                        departmentCount.insuranceEmp = salaryInfo.insuranceEmp 
                        departmentCount.insuranceCom = salaryInfo.insuranceCom 
                        departmentCount.accumulationFundEmp = salaryInfo.accumulationFundEmp 
                        departmentCount.accumulationFundCom = salaryInfo.accumulationFundCom 
                        departmentCount.tax = salaryInfo.tax 
                        departmentCount.realitySalary = salaryInfo.realitySalary 
                        departmentCountArray.push(departmentCount)
                    }
                }
                departmentCountMgr.save.apply(departmentCountMgr.save, departmentCountArray)
        }),
        
        //返回修改前的数据
        updateBeforeInfo: mark('managers', SalaryInfo, DepartmentCount).mark('tx').on(function (salaryInfoMgr, departmentCountMgr, salaryInfo) {
            return salaryInfo
        }),

        //修改工资信息时修改薪资信息>部门统计中的数据，根据id判断是修改那个一的信息
        updateBySalaryInfo: mark('managers', SalaryInfo, DepartmentCount).mark('tx').on(function (salaryInfoMgr, departmentCountMgr, salaryInfo) {

            // var sqlSalaryInfo = salaryInfoMgr.getSalaryInfoByNAM({id: salaryInfo.id}).get(0)

            // var localRemark = salaryInfo.remark
            // var sqlRemark = sqlSalaryInfo.remark

            var afterSalaryInfo, updateDepartmentCount
            // beforeSalaryInfo = new SalaryInfo()
            // afterSalaryInfo = new SalaryInfo()
            if (tag == 'before') {//如果是修改以前，拿到修改之前的数据
                console.log('comeing in upadateBefore ...')
                //从薪资信息表中根据员工姓名和添加工资的年月获取要修改的数据
                beforeSalaryInfo = salaryInfo //(salaryInfoMgr.getSalaryInfoByNAM({name: salaryInfo.employeeInfo.empName, mounth: salaryInfo.mounth})).get(0)
                console.log('tag----------------', tag)
                console.log('修改以前--------------', beforeSalaryInfo.insuranceEmp)
                
            }
            if (tag == 'after') {//如果是修改以后，修改数据
                console.log('comeing in upadateAfter ...')
                afterSalaryInfo = salaryInfo
                console.log('tag----------------', tag)
                console.log('修改以前--------------', beforeSalaryInfo.insuranceEmp)
                console.log('修改以后--------------', afterSalaryInfo.insuranceEmp)
                
                //console.log('comeing in upadateAfter ...', beforeSalaryInfo.shouldSalary + "*** " + beforeSalaryInfo.insuranceEmp + "*** "  )
                //根据该员工所在的部门和按哪年那月的统计信息中获取薪资信息统计
                updateDepartmentCount = (departmentCountMgr.getSumSalaryByPathAndMounth({depPath: afterSalaryInfo.departmentPath, mounth: afterSalaryInfo.mounth})).get(0)
                //原来的信息和修改后的信息做差值以后对统计表中的信息进行更新
                updateDepartmentCount.memberCount =11 
                updateDepartmentCount.shouldSalary = updateDepartmentCount.shouldSalary + (afterSalaryInfo.shouldSalary - beforeSalaryInfo.shouldSalary) 
                updateDepartmentCount.insuranceEmp = updateDepartmentCount.insuranceEmp + (afterSalaryInfo.insuranceEmp - beforeSalaryInfo.insuranceEmp) 
                updateDepartmentCount.insuranceCom = updateDepartmentCount.insuranceCom + (afterSalaryInfo.insuranceCom - beforeSalaryInfo.insuranceCom) 
                updateDepartmentCount.accumulationFundEmp = updateDepartmentCount.accumulationFundEmp + (afterSalaryInfo.accumulationFundEmp - beforeSalaryInfo.accumulationFundEmp) 
                updateDepartmentCount.accumulationFundCom = updateDepartmentCount.accumulationFundCom + (afterSalaryInfo.accumulationFundCom - beforeSalaryInfo.accumulationFundCom) 
                updateDepartmentCount.tax = updateDepartmentCount.tax + (afterSalaryInfo.tax - beforeSalaryInfo.tax)
                updateDepartmentCount.realitySalary = updateDepartmentCount.realitySalary + (afterSalaryInfo.realitySalary - beforeSalaryInfo.realitySalary) 
            }   
        })
    } 
}