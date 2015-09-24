var {mark}               = require('cdeio/mark');
var commExpService       = require('commons/export-excel.feature/service');

var {Boolean}            = java.lang;
var {HashMap}            = java.util;
var {ArrayList}          = java.util;
var {Date}               = java.util;
var {SimpleDateFormat}   = java.text;
var {SecurityUtils}      = org.apache.shiro;

var {Account}            = com.zyeeda.cdeio.commons.organization.entity;
var {EmployeeInfo}       = com.zyeeda.business.employee.entity;
var {Department}         = com.zyeeda.cdeio.commons.organization.entity;
var {EntityMetaResolver} = com.zyeeda.cdeio.web.scaffold;

exports.createService = function() {
  return{
    employeeLeave: mark('managers', EmployeeInfo).mark('tx').on(function(employeeInfoMgr, data) {
      var date = new Date(),
          sd = new SimpleDateFormat("yyyy-MM-dd");

      if(!data.leaveDate){
          data.leaveDate = sd.format(date);
      }
      employeeInfo = employeeInfoMgr.find(data.employeeInfoId);
      employeeInfo.leaveDate = new Date(data.leaveDate.replace(/-/g,   "/"));
      employeeInfo.leaveProve = new Boolean(data.leaveProve);
      employeeInfo.leaveReason = data.leaveReason;
      employeeInfo.whetherLeaved = false;
    }),
    saveEntities: mark('managers', EmployeeInfo, Account, Department).mark('tx').on(function (employeeInfoMgr, accountMgr, departmentMgr, params, entityArray, result) {
          var entity,
              subject = SecurityUtils.getSubject(),
              user = subject.getPrincipal(), i;

          for (i = 0; i < entityArray.length; i++) {
              entity = entityArray[i];
              entity.creator = user.accountName;
              entity.creatorName = user.realName;
              entity.createdTime = new Date();
              entity.lastModifiedTime = new Date();
              entity.whetherLeaved = new Boolean(true);

              departmentName = result.pickerFields[i].colName;
              departmentList = departmentMgr.getDepartmentByName({name: departmentName});
              if(departmentList != null && departmentList.size() > 0){
                  entity.department = departmentList.get(0);
              }
          }

          if (result.failRowIdxes.length === 0 && result.repeatRowIdxes.length === 0) {
              employeeInfoMgr.save.apply(employeeInfoMgr.save, entityArray);
          }
          return {failRowIdxes: result.failRowIdxes, repeatRowIdxes: result.repeatRowIdxes};
    }),
    exportExcel: mark('beans', EntityMetaResolver).on(function (resolver, options, exportModule, exportFileName) {
            var beans = new HashMap(),
                vo, vos = new ArrayList(),
                entity, entities,
                meta = resolver.resolveEntity(EmployeeInfo),
                dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
                dateSdf = new SimpleDateFormat("yyyy-MM-dd"),
                genderMap = {
                    '1': '紧急',
                    '0': '一般'
                };

            entities = commExpService.createService().listEntities(options, meta);

            // 按照自己的要求处理数据
            for (i = 0; i < entities.size(); i++) {
                entity = entities.get(i);

                vo = commExpService.createService().convertEntityToObj(entity);

                vo.gender           = genderMap[entity.gender];
                if(!null == entity.entryTime){
                  vo.entryTime = dateSdf.format(entity.entryTime);
                }
                if(!null == entity.positiveDate){
                  vo.positiveDate  = dateSdf.format(entity.positiveDate);
                }
                if(!null == entity.agreementDate){
                  vo.agreementDate = dateSdf.format(entity.agreementDate);
                }
                if(!null == entity.agreementEnd ){
                  vo.agreementEnd  = dateSdf.format(entity.agreementEnd);
                }
                vos.add(vo);
            }

            beans.put('employeeInfos', vos);
            beans.put('footer', '操作时间:' + dateTimeStr);

            return commExpService.createService().exportExcel(beans, exportModule, exportFileName);
        })
  }
};
