var {mark}                  = require('cdeio/mark');
var {createManager}         = require('cdeio/manager');
var commExpService          = require('commons/export-excel.feature/service');

var {DepartmentCount}       = com.zyeeda.business.salarymanager.entity;
var {SalaryInfo}            = com.zyeeda.business.salarymanager.entity;
var {Department}            = com.zyeeda.cdeio.commons.organization.entity;
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
            var meta = resolver.resolveEntity(DepartmentCount),
                departmentCountMrg = createManager(meta.entityClass),
                queryParams,
                salaryInfo,
                k,
                index,
                results;

            queryParams = options.filters
            if (queryParams) {
                if (queryParams.toString().indexOf('year') != -1) {
                    for(k =0; k<queryParams.length; k++){
                        if (queryParams[k].toString().indexOf('year') != -1) {
                            queryParams[k][0] = 'eq'                 
                        }
                    }
                }

                if (queryParams.toString().indexOf('mounth') != -1) {
                    for(k =0; k<queryParams.length; k++){
                        if (queryParams[k].toString().indexOf('mounth') != -1) {
                            queryParams[k][0] = 'eq'                  
                        }
                    }
                }
            }
            
            options.filters = queryParams || [];
            options.orders = options.orders || [];

            if (options.filters) {
                results = departmentCountMrg.findByEntity(options);
            } else {
                results = departmentCountMrg.findByExample(entity, options);
            }

            return results;
        }),
        updateInfo: mark('managers', Department, SalaryInfo, DepartmentCount).mark('tx').on(function(departmentMgr, salaryInfoMgr, departmentCountMrg) {
            var cleanDate, cleanDateArr = [], departmentName, i, departmentCountDateList, k,
                departmentCountArr = [], departmentCount;
            cleanDate = departmentCountMrg.getAllDepartmentCountInfo()

            if (cleanDate) {//清空departmentCount中的数据
                for (i = 0; i < cleanDate.size(); i++) {
                    cleanDateArr[i] = cleanDate.get(i)
                }
                departmentCountMrg.remove.apply(departmentCountMrg.remove, cleanDateArr)
            }
            departmentCountDateList = departmentCountMrg.getDepartmentCountSumDate()
            for(k = 0; k < departmentCountDateList.size(); k++){
                var tag,
                departmentCount = new DepartmentCount();

                tag = departmentCountDateList.get(k)[0]

                //给实体赋值
                departmentCount.departmentPath = tag.split('-')[0]
                departmentName = departmentCountMrg.getDepartmentNameByPath({path: tag.split('-')[0]})
                departmentCount.depName = departmentName.get(0)
                departmentCount.year = parseInt(tag.split('-')[1])
                departmentCount.mounth = parseInt(tag.split('-')[2])
                departmentCount.memberCount = departmentCountDateList.get(k)[1]
                departmentCount.shouldSalary = departmentCountDateList.get(k)[2]
                departmentCount.insuranceEmp = departmentCountDateList.get(k)[3]
                departmentCount.insuranceCom = departmentCountDateList.get(k)[4]
                departmentCount.accumulationFundEmp = departmentCountDateList.get(k)[5]
                departmentCount.accumulationFundCom = departmentCountDateList.get(k)[6]
                departmentCount.tax = departmentCountDateList.get(k)[7]
                departmentCount.realitySalary = departmentCountDateList.get(k)[8]
                departmentCountArr.push(departmentCount)
            }

            if(departmentCountArr.length){
                departmentCountMrg.save.apply(departmentCountMrg.save, departmentCountArr);
                return {result: 'successful'}
            }else {
                return {result: 'failed'}
            }
        })
        
    } 
}