var {mark}             = require('cdeio/mark');
var commExpService     = require('commons/export-excel.feature/service');
var {createManager}    = require('cdeio/manager');

var {Department}         = com.zyeeda.cdeio.commons.organization.entity;
var {Account}            = com.zyeeda.cdeio.commons.organization.entity;

var {SigninExplain}       = com.zyeeda.business.attendance.entity;
var {EntityMetaResolver} = com.zyeeda.cdeio.web.scaffold;
var {ApprovalHistory}    = com.zyeeda.business.process.entity;

var {SecurityUtils}      = org.apache.shiro;
var {Integer}            = java.lang;
var {SimpleDateFormat}   = java.text;
var {ArrayList}          = java.util;
var {HashMap}            = java.util;
var {Date}               = java.util;

exports.createService = function() {
    return {
        list: mark('beans', EntityMetaResolver).mark('tx').on(function (resolver, entity, options) {
            var meta = resolver.resolveEntity(SigninExplain),
                signinExplainMgr = createManager(meta.entityClass),

                accountMeta = resolver.resolveEntity(Account),
                accountMgr = createManager(accountMeta.entityClass),

                apprHisMeta = resolver.resolveEntity(ApprovalHistory),
                apprHisMgr = createManager(apprHisMeta.entityClass),

                currentUser = SecurityUtils.getSubject().getPrincipal(),
                account,
                role,
                roles,
                iterator,
                results;

            options.filters = options.filters || [];

            account = accountMgr.find(currentUser.id);
            roles = account.roles;

            iterator = roles.iterator();

            while (iterator.hasNext()) {
                role = iterator.next();
                if ("普通用户" === role.name){
                    options.filters.push(['eq', 'applier.id', currentUser.id]);
                }
            }

            if (options.filters) {
                results = signinExplainMgr.findByEntity(options);
            } else {
                results = signinExplainMgr.findByExample(entity, options);
            }

            if (!options.fetchCount) {
                for (i = 0; i < results.size(); i++) {
                    results.get(i).approvalHistories = apprHisMgr.getApprovalHistorysByEntryId({entryId: results.get(i).id});
                }
            }

            return results;
        }),
        autoGenerateNo: mark('managers', SigninExplain).mark('tx').on(function (signinExplainMgr) {
            var date = new Date(),
                sd = new SimpleDateFormat("yyyyMMdd"),
                currentDate = sd.format(date),
                todayMaxSigninExplainNo,
                i,
                applyNo;

            // 取当天最大表单号
            todayMaxSigninExplainNo = signinExplainMgr.getTodayMaxSigninExplainNo({currentDate: currentDate + '%' }, 1);

            // 截取表单号最后编号 (201403210001) 0001，如果为 null 则默认0
            todayMaxSigninExplainNo = (todayMaxSigninExplainNo == null) ? 0 : todayMaxSigninExplainNo.substring(currentDate.length);
            todayMaxSigninExplainNo = Integer.parseInt(todayMaxSigninExplainNo) + 1;

            // 转成字符串
            applyNo = todayMaxSigninExplainNo.toString();

            // 不足3位补0
            for (i = applyNo.length; i < 3; i++) {
                applyNo = '0' + applyNo;
            };

            // return 最新的单号
            applyNo = currentDate + applyNo;

            return applyNo;
        }),
        getSigninExplainByIds: mark('managers', SigninExplain).mark('tx').on(function (signinExplainMgr, entryIds){
            return signinExplainMgr.find.apply(signinExplainMgr, entryIds);
        }),
        // 根据ID查找
        getById: mark('managers', SigninExplain).mark('tx').on(function (signinExplainMgr, id) {
            return signinExplainMgr.find(id);
        }),
        saveEntities: mark('managers', SigninExplain, Account, Department).mark('tx').on(function (signinExplainMgr, accountMgr, departmentMgr, params, entityArray, result) {
            var entity,
                applierList, applierName,
                departmentList, departmentName,
                subject = SecurityUtils.getSubject(),
                user = subject.getPrincipal(),
                applyCount, i;

            for (i = 0; i < entityArray.length; i++) {
                entity = entityArray[i];
                entity.creator = user.accountName;
                entity.creatorName = user.realName;
                entity.createdTime = new Date();
                entity.lastModifiedTime = new Date();
                entity.flowStatus = '-2';

                applierName = result.pickerFields[i * 2].colName;
                applierList = accountMgr.getAccountByName({name: applierName});
                applyCount  = signinExplainMgr.getSigninExplainCountByApplyNo({applyNo: entity.applyNo});

                if(applyCount.get(0) > 0){
                   result.repeatRowIdxes.push(i + 1);
                }

                if(applierList != null && applierList.size() > 0){
                    entity.applier = applierList.get(0);
                }

                departmentName = result.pickerFields[(i * 2) + 1].colName;
                departmentList = departmentMgr.getDepartmentByName({name: departmentName});
                if(departmentList != null && departmentList.size() > 0){
                    entity.department = departmentList.get(0);
                }
            }

            if (result.failRowIdxes.length === 0 && result.repeatRowIdxes.length === 0) {
                signinExplainMgr.save.apply(signinExplainMgr.save, entityArray);
            }
            return {failRowIdxes: result.failRowIdxes, repeatRowIdxes: result.repeatRowIdxes};
        }),

        exportExcel: mark('beans', EntityMetaResolver).on(function (resolver, options, exportModule, exportFileName) {
            var beans = new HashMap(),
                vo, vos = new ArrayList(),
                entity, entities,
                meta = resolver.resolveEntity(SigninExplain),
                dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
                dateSdf = new SimpleDateFormat("yyyy-MM-dd"),
                statusMap = {
                    '0': '上班卡',
                    '1': '下班卡',
                    '2': '整个工作日',

                };
            entities = commExpService.createService().listEntities(options, meta);

            // 按照自己的要求处理数据
            for (i = 0; i < entities.size(); i++) {
                entity = entities.get(i);

                vo = commExpService.createService().convertEntityToObj(entity);

                vo.signinTime  = statusMap[entity.signinTime];
                if(null !== entity.signinDate ){
                  vo.signinDate  = dateSdf.format(entity.signinDate);
                }
                if(null !== entity.appliedDate){
                  vo.appliedDate = dateSdf.format(entity.appliedDate);
                }
                vos.add(vo);
            }

            beans.put('signinExplains', vos);
            beans.put('footer', '操作时间:' + dateTimeStr);

            return commExpService.createService().exportExcel(beans, exportModule, exportFileName);
        })
    };
}
