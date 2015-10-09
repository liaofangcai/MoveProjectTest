var {mark}             = require('cdeio/mark');
var commExpService     = require('commons/export-excel.feature/service');
var {createManager}    = require('cdeio/manager');

var {Department}         = com.zyeeda.cdeio.commons.organization.entity;
var {Account}            = com.zyeeda.cdeio.commons.organization.entity;

var {OverWorkApply}       = com.zyeeda.business.attendance.entity;
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
        check: mark('managers', OverWorkApply).mark('tx').on(function(overWorkApplyMgr, data) {

           employeeInfo = overWorkApplyMgr.find(data.overworkapplyId);
           employeeInfo.beginTime = new Date(data.beginTime.replace(/-/g,   "/"));
           employeeInfo.endTime = new Date(data.endTime.replace(/-/g,   "/"));
           employeeInfo.totalTime = data.totalTime;
        }),
        list: mark('beans', EntityMetaResolver).mark('tx').on(function (resolver, entity, options) {
            var meta = resolver.resolveEntity(OverWorkApply),
                overWorkApplyMgr = createManager(meta.entityClass),

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
                results = overWorkApplyMgr.findByEntity(options);
            } else {
                results = overWorkApplyMgr.findByExample(entity, options);
            }

            if (!options.fetchCount) {
                for (i = 0; i < results.size(); i++) {
                    results.get(i).approvalHistories = apprHisMgr.getApprovalHistorysByEntryId({entryId: results.get(i).id});
                }
            }

            return results;
        }),
        autoGenerateNo: mark('managers', OverWorkApply).mark('tx').on(function (overWorkApplyMgr) {
            var date = new Date(),
                sd = new SimpleDateFormat("yyyyMMdd"),
                currentDate = sd.format(date),
                todayMaxOverWorkApplyNo,
                i,
                applyNo;

            // 取当天最大表单号
            todayMaxOverWorkApplyNo = overWorkApplyMgr.getTodayMaxOverWorkApplyNo({currentDate: currentDate + '%' }, 1);

            // 截取表单号最后编号 (201403210001) 0001，如果为 null 则默认0
            todayMaxOverWorkApplyNo = (todayMaxOverWorkApplyNo == null) ? 0 : todayMaxOverWorkApplyNo.substring(currentDate.length);
            todayMaxOverWorkApplyNo = Integer.parseInt(todayMaxOverWorkApplyNo) + 1;

            // 转成字符串
            applyNo = todayMaxOverWorkApplyNo.toString();

            // 不足3位补0
            for (i = applyNo.length; i < 3; i++) {
                applyNo = '0' + applyNo;
            };

            // return 最新的单号
            applyNo = currentDate + applyNo;

            return applyNo;
        }),
        getTripApplyByIds: mark('managers', OverWorkApply).mark('tx').on(function (overWorkApplyMgr, entryIds){
            return overWorkApplyMgr.find.apply(overWorkApplyMgr, entryIds);
        }),
        // 根据ID查找
        getById: mark('managers', OverWorkApply).mark('tx').on(function (overWorkApplyMgr, id) {
            return overWorkApplyMgr.find(id);
        }),
        saveEntities: mark('managers', OverWorkApply, Account, Department).mark('tx').on(function (overWorkApplyMgr, accountMgr, departmentMgr, params, entityArray, result) {
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
                applyCount  = overWorkApplyMgr.getOverWorkApplyCountByApplyNo({applyNo: entity.applyNo});

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
                overWorkApplyMgr.save.apply(overWorkApplyMgr.save, entityArray);
            }
            return {failRowIdxes: result.failRowIdxes, repeatRowIdxes: result.repeatRowIdxes};
        }),
        exportExcel: mark('beans', EntityMetaResolver).on(function (resolver, options, exportModule, exportFileName) {
            var beans = new HashMap(),
                vo, vos = new ArrayList(),
                entity, entities,
                meta = resolver.resolveEntity(OverWorkApply),
                dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
                dateSdf = new SimpleDateFormat("yyyy-MM-dd"),
                statusMap = {
                    '0': '工作日',
                    '1': '周末',
                    '2': '法定节假日'
                };
            entities = commExpService.createService().listEntities(options, meta);

            // 按照自己的要求处理数据
            for (i = 0; i < entities.size(); i++) {
                entity = entities.get(i);

                vo = commExpService.createService().convertEntityToObj(entity);

                vo.overTime  = statusMap[entity.overTime];
                if(null !== entity.expectedBeginTime ){
                  vo.expectedBeginTime  = dateSdf.format(entity.expectedBeginTime);
                }
                if(null !== entity.expectedEndTime){
                  vo.expectedEndTime =  dateSdf.format(entity.expectedEndTime);
                }
                if(null !== entity.appliedDate){
                  vo.appliedDate = dateSdf.format(entity.appliedDate);
                }
                if(null !== entity.beginTime ){
                  vo.beginTime  = dateSdf.format(entity.beginTime);
                }
                if(null !== entity.endTime){
                  vo.endTime =  dateSdf.format(entity.endTime);
                }
                vos.add(vo);
            }

            beans.put('OverWorkApplys', vos);
            beans.put('footer', '操作时间:' + dateTimeStr);

            return commExpService.createService().exportExcel(beans, exportModule, exportFileName);
        })
    };
}
