var {mark}                  = require('cdeio/mark');
var commExpService          = require('commons/export-excel.feature/service');

var {RecruitmentDemand}     = com.zyeeda.business.recruitment.entity;
var {Account}               = com.zyeeda.cdeio.commons.organization.entity;
var {Department}            = com.zyeeda.cdeio.commons.organization.entity;
var {EntityMetaResolver}    = com.zyeeda.cdeio.web.scaffold;

var {SecurityUtils}         = org.apache.shiro;
var {ArrayList}             = java.util;
var {HashMap}               = java.util;
var {Date}                  = java.util;
var {Boolean}               = java.lang;
var {SimpleDateFormat}      = java.text;

exports.createService = function() {
    return{
        demandClose: mark('managers', RecruitmentDemand).mark('tx').on(function(demandMgr, data) {
            var recruitmentDemand;

            recruitmentDemand = demandMgr.find(data.id);
            recruitmentDemand.enabled = "0";
        }),
        saveEntities: mark('managers', RecruitmentDemand, Account, Department).mark('tx').on(function (recruitmentDemandMgr, accountMgr,departmentMgr,params, entityArray, result) {
                var entity,
                    subject = SecurityUtils.getSubject(),
                    user = subject.getPrincipal(),
                    departmentName, departmentList, i;

                for (i = 0; i < entityArray.length; i++) {
                    entity = entityArray[i];
                    entity.creator = user.accountName;
                    entity.creatorName = user.realName;
                    entity.createdTime = new Date();
                    entity.lastModifiedTime = new Date();

                    departmentName = result.pickerFields[i].colName;
                    departmentList = departmentMgr.getDepartmentByName({name: departmentName});
                    if(departmentList != null && departmentList.size() > 0){
                        entity.department = departmentList.get(0);
                    }
                }

                if (result.failRowIdxes.length === 0 && result.repeatRowIdxes.length === 0) {
                    recruitmentDemandMgr.save.apply(recruitmentDemandMgr.save, entityArray);
                }
                return {failRowIdxes: result.failRowIdxes, repeatRowIdxes: result.repeatRowIdxes};
        }),
        exportExcel: mark('beans', EntityMetaResolver).on(function (resolver, options, exportModule, exportFileName) {
            var beans = new HashMap(),
                vo, vos = new ArrayList(),
                entity, entities,
                meta = resolver.resolveEntity(RecruitmentDemand),
                dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
                dateSdf = new SimpleDateFormat("yyyy-MM-dd"),
                statusMap = {
                    '1': '紧急',
                    '0': '一般'
                };
                statuschangeMap = {
                    '1': '开启',
                    '0': '关闭'
                }


            entities = commExpService.createService().listEntities(options, meta);

            // 按照自己的要求处理数据
            for (i = 0; i < entities.size(); i++) {
                entity = entities.get(i);

                vo = commExpService.createService().convertEntityToObj(entity);

                vo.isUrgent        = statusMap[entity.isUrgent];
                vo.appliedTime     = dateSdf.format(entity.appliedTime);
                vo.enabled         = statuschangeMap[entity.enabled];

                vos.add(vo);
            }

            beans.put('RecruitmentDemands', vos);
            beans.put('footer', '操作时间:' + dateTimeStr);

            return commExpService.createService().exportExcel(beans, exportModule, exportFileName);
        })

    };
}
