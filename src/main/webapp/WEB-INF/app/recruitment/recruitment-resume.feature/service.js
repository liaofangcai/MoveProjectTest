var {mark}                  = require('cdeio/mark');
var commExpService          = require('commons/export-excel.feature/service');

var {Account}               = com.zyeeda.cdeio.commons.organization.entity;

var {RecruitmentResume}     = com.zyeeda.business.recruitment.entity;
var {EntityMetaResolver}    = com.zyeeda.cdeio.web.scaffold;

var {SecurityUtils}         = org.apache.shiro;
var {Integer}               = java.lang;
var {SimpleDateFormat}      = java.text;
var {ArrayList}             = java.util;
var {HashMap}               = java.util;
var {Date}                  = java.util;
var {Boolean}               = java.lang;

exports.createService = function() {
    return{
        saveEntities: mark('managers', RecruitmentResume, Account).mark('tx').on(function (recruitmentResumeMgr, accountMgr, params, entityArray, result) {
            var entity,
                subject = SecurityUtils.getSubject(),
                user = subject.getPrincipal(), i;

            for (i = 0; i < entityArray.length; i++) {
                entity = entityArray[i];
                entity.creator = user.accountName;
                entity.creatorName = user.realName;
                entity.createdTime = new Date();
                entity.lastModifiedTime = new Date();
            }

            if (result.failRowIdxes.length === 0 && result.repeatRowIdxes.length === 0) {
                recruitmentResumeMgr.save.apply(recruitmentResumeMgr.save, entityArray);
            }
            return {failRowIdxes: result.failRowIdxes, repeatRowIdxes: result.repeatRowIdxes};
        }),
        exportExcel: mark('beans', EntityMetaResolver).on(function (resolver, options, exportModule, exportFileName) {
            var beans = new HashMap(),
                vo, vos = new ArrayList(),
                entity, entities,
                meta = resolver.resolveEntity(RecruitmentResume),
                dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
                dateSdf = new SimpleDateFormat("yyyy-MM-dd"),
                genderMap = {
                    '1': '男',
                    '0': '女'
                };

            entities = commExpService.createService().listEntities(options, meta);

            // 按照自己的要求处理数据
            for (i = 0; i < entities.size(); i++) {
                entity = entities.get(i);

                vo = commExpService.createService().convertEntityToObj(entity);

                vo.gender           = genderMap[entity.gender];
                vo.timeToWork       = dateSdf.format(entity.timeToWork);
                vo.buildTime        = dateSdf.format(entity.buildTime);

                vos.add(vo);
            }

            beans.put('recruitmentResumes', vos);
            beans.put('footer', '操作时间:' + dateTimeStr);

            return commExpService.createService().exportExcel(beans, exportModule, exportFileName);
        })
    };
};

