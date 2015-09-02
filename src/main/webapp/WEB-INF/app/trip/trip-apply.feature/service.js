var {mark}             = require('cdeio/mark');
var commExpService     = require('commons/export-excel.feature/service');
var {createManager}    = require('cdeio/manager');

var {Account}            = com.zyeeda.cdeio.commons.organization.entity;
var {Department}         = com.zyeeda.cdeio.commons.organization.entity;

var {TripApply}          = com.zyeeda.business.trip.entity;
var {EntityMetaResolver} = com.zyeeda.cdeio.web.scaffold;
var {ApprovalHistory}    = com.zyeeda.business.process.entity;

var {SecurityUtils}      = org.apache.shiro;
var {Integer}            = java.lang;
var {SimpleDateFormat}   = java.text;
var {ArrayList}          = java.util;
var {HashMap}            = java.util;
var {Date}               = java.util;

exports.createService = function () {
    return {
        list: mark('beans', EntityMetaResolver).mark('tx').on(function (resolver, entity, options) {
            var meta = resolver.resolveEntity(TripApply),
                tripApplyMgr = createManager(meta.entityClass),

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
                results = tripApplyMgr.findByEntity(options);
            } else {
                results = tripApplyMgr.findByExample(entity, options);
            }

            if (!options.fetchCount) {
                for (i = 0; i < results.size(); i++) {
                    results.get(i).approvalHistories = apprHisMgr.getApprovalHistorysByEntryId({entryId: results.get(i).id});
                }
            }

            return results;
        }),
        // 自动生成单号
        autoGenerateNo: mark('managers', TripApply).mark('tx').on(function (tripApplyMgr) {
            var date = new Date(),
                sd = new SimpleDateFormat("yyyyMMdd"),
                currentDate = sd.format(date),
                todayMaxScrapApplyNo,
                i,
                applyNo;

            // 取当天最大表单号
            todayMaxTripApplyNo = tripApplyMgr.getTodayMaxTripApplyNo({currentDate: currentDate + '%' }, 1);

            // 截取表单号最后编号 (201403210001) 0001，如果为 null 则默认0
            todayMaxTripApplyNo = (todayMaxTripApplyNo == null) ? 0 : todayMaxTripApplyNo.substring(currentDate.length);
            todayMaxTripApplyNo = Integer.parseInt(todayMaxTripApplyNo) + 1;

            // 转成字符串
            applyNo = todayMaxTripApplyNo.toString();

            // 不足3位补0
            for (i = applyNo.length; i < 3; i++) {
                applyNo = '0' + applyNo;
            };

            // return 最新的单号
            applyNo = currentDate + applyNo;

            return applyNo;
        }),
        getTripApplyByIds: mark('managers', TripApply).mark('tx').on(function (tripApplyMgr, entryIds){
            return tripApplyMgr.find.apply(tripApplyMgr, entryIds);
        }),
        // 根据ID查找
        getById: mark('managers', TripApply).mark('tx').on(function (tripApplyMgr, id) {
            return tripApplyMgr.find(id);
        }),
        // 导出数据处理
        exportExcel: mark('beans', EntityMetaResolver).on(function (resolver, options, exportModule, exportFileName) {
            var beans = new HashMap(),
                vo, vos = new ArrayList(),
                entity, entities,
                meta = resolver.resolveEntity(TripApply),
                dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
                dateSdf = new SimpleDateFormat("yyyy-MM-dd"),
                statusMap = {
                    '-2': '审批完成',
                    '-1': '退回',
                    '0': '初始'
                };

            entities = commExpService.createService().listEntities(options, meta);

            //  按照自己的要求处理数据
            for (i = 0; i < entities.size(); i++) {
                entity = entities.get(i);

                vo = commExpService.createService().convertEntityToObj(entity);

                vo.flowStatus = statusMap[entity.flowStatus] || '审批中';
                if (null !== entity.applyTime) {
                    vo.applyTime = dateSdf.format(entity.applyTime);
                }
                if (null !== entity.transferTime) {
                    vo.transferTime = dateSdf.format(entity.transferTime);
                }
                vos.add(vo);
            }

            beans.put('applys', vos);
            beans.put('footer', '操作时间:' + dateTimeStr);

            return commExpService.createService().exportExcel(beans, exportModule, exportFileName);
        }),
        saveEntities: mark('managers', TripApply, Account, Department).mark('tx').on(function (tripApplyMgr, accountMgr, departmentMgr, params, entityArray, result) {
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
                applyCount  = tripApplyMgr.getTripApplyCountByApplyNo({applyNo: entity.applyNo});

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
                tripApplyMgr.save.apply(tripApplyMgr.save, entityArray);
            }
            return {failRowIdxes: result.failRowIdxes, repeatRowIdxes: result.repeatRowIdxes};
        })
    };
};
