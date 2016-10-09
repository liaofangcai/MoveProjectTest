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
                        //设置创建时间
                        entity.createdTime = new Date()
                        //设置导入实体的的员工信息
                        entity.employeeInfo = employeeList.get(0);
                        //设置导入实体的员工对应的departmentPath,只拿取主部门的path
                        entity.departmentPath = '/' + (entity.employeeInfo.department.path).split('/')[1] + '/'
                        //设置部门统计时使用的tag
                        entity.tag = entity.departmentPath + '-' + entity.year + '-' + entity.mounth
                    }
                }

                if (result.failRowIdxes.length === 0 && result.repeatRowIdxes.length === 0) {
                    salaryInfoMgr.save.apply(salaryInfoMgr.save, entityArray);
                }
                return {failRowIdxes: result.failRowIdxes, repeatRowIdxes: result.repeatRowIdxes};
        }),
        //用来处理添加和更新数据的方法
        dataHandler: function(salaryInfo, taxTag) {

            //设置创建时间
            salaryInfo.createdTime = new Date()
            //存储员工部门path,只拿取主部门的path
            salaryInfo.departmentPath = '/' + (salaryInfo.employeeInfo.department.path).split('/')[1] + '/'
            //设置部门统计时使用的tag
            salaryInfo.tag = salaryInfo.departmentPath + '-' + salaryInfo.year + '-' + salaryInfo.mounth
            //设置默认值
            salaryInfo.allowance = salaryInfo.allowance || 0.00
            salaryInfo.other = salaryInfo.other || 0.00
            salaryInfo.insuranceCom = salaryInfo.insuranceCom || 0.00
            salaryInfo.insuranceEmp = salaryInfo.insuranceEmp || 0.00
            salaryInfo.accumulationFundCom = salaryInfo.accumulationFundCom || 0.00
            salaryInfo.accumulationFundEmp = salaryInfo.accumulationFundEmp || 0.00
            salaryInfo.gradeLines = salaryInfo.gradeLines || 0.00
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