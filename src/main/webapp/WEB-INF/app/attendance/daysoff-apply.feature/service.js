var {mark}             = require('cdeio/mark');
var commExpService     = require('commons/export-excel.feature/service');
var {createManager}    = require('cdeio/manager');

var {Department}         = com.zyeeda.cdeio.commons.organization.entity;
var {Account}            = com.zyeeda.cdeio.commons.organization.entity;

var {DaysoffApply}       = com.zyeeda.business.attendance.entity;
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
            var meta = resolver.resolveEntity(DaysoffApply),
                daysoffApplyMgr = createManager(meta.entityClass),

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
                results = daysoffApplyMgr.findByEntity(options);
            } else {
                results = daysoffApplyMgr.findByExample(entity, options);
            }

            if (!options.fetchCount) {
                for (i = 0; i < results.size(); i++) {
                    results.get(i).approvalHistories = apprHisMgr.getApprovalHistorysByEntryId({entryId: results.get(i).id});
                }
            }

            return results;
        }),
        autoGenerateNo: mark('managers', DaysoffApply).mark('tx').on(function (daysoffApplyMgr) {
            var date = new Date(),
                sd = new SimpleDateFormat("yyyyMMdd"),
                currentDate = sd.format(date),
                todayMaxDaysoffApplyNo,
                i,
                applyNo;

            // 取当天最大表单号
            todayMaxDaysoffApplyNo = daysoffApplyMgr.getTodayMaxDaysoffApplyNo({currentDate: currentDate + '%' }, 1);

            // 截取表单号最后编号 (201403210001) 0001，如果为 null 则默认0
            todayMaxDaysoffApplyNo = (todayMaxDaysoffApplyNo == null) ? 0 : todayMaxDaysoffApplyNo.substring(currentDate.length);
            todayMaxDaysoffApplyNo = Integer.parseInt(todayMaxDaysoffApplyNo) + 1;

            // 转成字符串
            applyNo = todayMaxDaysoffApplyNo.toString();

            // 不足3位补0
            for (i = applyNo.length; i < 3; i++) {
                applyNo = '0' + applyNo;
            };

            // return 最新的单号
            applyNo = currentDate + applyNo;

            return applyNo;
        }),
        getDaysoffApplyByIds: mark('managers', DaysoffApply).mark('tx').on(function (daysoffApplyMgr, entryIds){
            return daysoffApplyMgr.find.apply(daysoffApplyMgr, entryIds);
        }),
        // 根据ID查找
        getById: mark('managers', DaysoffApply).mark('tx').on(function (daysoffApplyMgr, id) {
            return daysoffApplyMgr.find(id);
        }),
        saveEntities: mark('managers', DaysoffApply, Account, Department).mark('tx').on(function (daysoffApplyMgr, accountMgr, departmentMgr, params, entityArray, result) {
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
                entity.flowStatus = '0';

                applierName = result.pickerFields[i * 2].colName;
                applierList = accountMgr.getAccountByName({name: applierName});
                applyCount  = daysoffApplyMgr.getDaysoffApplyCountByApplyNo({applyNo: entity.applyNo});

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
                daysoffApplyMgr.save.apply(daysoffApplyMgr.save, entityArray);
            }
            return {failRowIdxes: result.failRowIdxes, repeatRowIdxes: result.repeatRowIdxes};
        }),

        exportExcel: mark('beans', EntityMetaResolver).on(function (resolver, options, exportModule, exportFileName) {
            var beans = new HashMap(),
                vo, vos = new ArrayList(),
                entity, entities,
                meta = resolver.resolveEntity(DaysoffApply),
                dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
                dateSdf = new SimpleDateFormat("yyyy-MM-dd");

            entities = commExpService.createService().listEntities(options, meta);

            // 按照自己的要求处理数据
            for (i = 0; i < entities.size(); i++) {
                entity = entities.get(i);

                vo = commExpService.createService().convertEntityToObj(entity);

                if(null !== entity.daysoffEndDate ){
                  vo.daysoffEndDate  = dateSdf.format(entity.daysoffEndDate);
                }
                if(null !== entity.daysoffBeginDate){
                  vo.daysoffBeginDate =  dateSdf.format(entity.daysoffBeginDate);
                }
                if(null !== entity.appliedDate){
                  vo.appliedDate = dateSdf.format(entity.appliedDate);
                }
                vos.add(vo);
            }

            beans.put('daysoffApplies', vos);
            beans.put('footer', '操作时间:' + dateTimeStr);

            return commExpService.createService().exportExcel(beans, exportModule, exportFileName);
        })
    };
}
