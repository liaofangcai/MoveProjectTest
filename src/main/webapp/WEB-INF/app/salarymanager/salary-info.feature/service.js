var {mark}                  = require('cdeio/mark');
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
        //在导入信息是用来存储实体的方法
        saveEntities: mark('managers', SalaryInfo, EmployeeInfo).mark('tx').on(function (salaryInfoMgr, employeeInfoMgr, params, entityArray, result) {
                var i, entity, empName, employeeList 

                for (i = 0; i < entityArray.length; i++) {
                    entity = entityArray[i];

                    empName = result.pickerFields[i].colName;
                    employeeList = salaryInfoMgr.getEmployeeByName({name: empName});
                    if(employeeList != null && employeeList.size() > 0){
                        entity.employeeInfo = employeeList.get(0);
                    }
                }

                if (result.failRowIdxes.length === 0 && result.repeatRowIdxes.length === 0) {
                    salaryInfoMgr.save.apply(salaryInfoMgr.save, entityArray);
                }
                return {failRowIdxes: result.failRowIdxes, repeatRowIdxes: result.repeatRowIdxes};
        }),

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