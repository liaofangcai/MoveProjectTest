var {mark}                  = require('cdeio/mark');
var commExpService          = require('commons/export-excel.feature/service');

var {Account}               = com.zyeeda.cdeio.commons.organization.entity;

var {RecruitmentResume}     = com.zyeeda.business.recruitment.entity;

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
        })
    };
};

