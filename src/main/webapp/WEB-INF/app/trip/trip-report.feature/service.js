var {mark}                  = require('cdeio/mark');
var commExpService          = require('commons/export-excel.feature/service');
var {createManager}         = require('cdeio/manager');

var {Account}               = com.zyeeda.cdeio.commons.organization.entity;
var {Department}            = com.zyeeda.cdeio.commons.organization.entity;
var {Attachment}            = com.zyeeda.cdeio.commons.resource.entity;

var {TripReport}            = com.zyeeda.business.trip.entity;
var {TripApply}             = com.zyeeda.business.trip.entity;
var {TripCost}              = com.zyeeda.business.trip.entity;
var {EntityMetaResolver}    = com.zyeeda.cdeio.web.scaffold;
var {ApprovalHistory}       = com.zyeeda.business.process.entity;

var {SecurityUtils}         = org.apache.shiro;
var {Integer}               = java.lang;
var {SimpleDateFormat}      = java.text;
var {ArrayList}             = java.util;
var {HashMap}               = java.util;
var {Date}                  = java.util;

exports.createService = function () {
    return {
        list: mark('beans', EntityMetaResolver).mark('tx').on(function (resolver, entity, options) {
            var meta = resolver.resolveEntity(TripReport),
                tripReportMgr = createManager(meta.entityClass),

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
                    options.filters.push(['eq', 'tripApply.applier.id', currentUser.id]);
                }
            }

            if (options.filters) {
                results = tripReportMgr.findByEntity(options);
            } else {
                results = tripReportMgr.findByExample(entity, options);
            }

            if (!options.fetchCount) {
                for (i = 0; i < results.size(); i++) {
                    results.get(i).approvalHistories = apprHisMgr.getApprovalHistorysByEntryId({entryId: results.get(i).id});
                }
            }

            return results;
        }),
        getTripReportByIds: mark('managers', TripReport).mark('tx').on(function (tripReportMgr, entryIds){
            return tripReportMgr.find.apply(tripReportMgr, entryIds);
        }),
        // 根据ID查找
        getById: mark('managers', TripReport).mark('tx').on(function (tripReportMgr, id) {
            return tripReportMgr.find(id);
        }),
        //根据Id查询归还申请模块关联该借出申请单的数量是否为0
        isEmpty: mark('managers', TripCost).on(function (tripCostMgr, tripReport) {
            var tripCostCount = tripCostMgr.getTripReportCountById({ tripReportId: tripReport.getId() }, 1);
            return tripCostCount === 0;
        }),
        // 导出数据处理
        exportExcel: mark('beans', EntityMetaResolver).on(function (resolver, options, exportModule, exportFileName) {
            var beans = new HashMap(),
                vo, vos = new ArrayList(),
                entity, entities,
                meta = resolver.resolveEntity(TripReport),
                dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
                dateSdf = new SimpleDateFormat("yyyy-MM-dd"),
                statusMap = {
                    '-3': '审批完成（已填写报告）',
                    '-2': '审批完成（未填写报告）',
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
        saveTripReport: mark('managers', TripReport, TripApply, Attachment).mark('tx').on(function(tripReportMgr, tripApplyMgr, attachmentMgr, data) {
            var tripReport, tripApply,
                subject = SecurityUtils.getSubject(),
                user = subject.getPrincipal();

            tripApply = tripApplyMgr.find(data.tripApplyId);
            tripReport = new TripReport();
            tripReport.tripApply = tripApply;
            tripReport.startTime = new SimpleDateFormat("yyyy-MM-dd").parse(data.startTime);
            tripReport.endTime = new SimpleDateFormat("yyyy-MM-dd").parse(data.endTime);
            tripReport.tripDays = data.tripDays;
            tripReport.tripTask = data.tripTask;
            tripReport.completion = data.completion;
            tripReport.creator = user.accountName;
            tripReport.creatorName = user.realName;
            tripReport.createdTime = new Date();
            tripApply.flowStatus = "-2";

            if(data.attachment.id){
                tripReport.attachment = attachmentMgr.find(data.attachment.id);
            }

            tripReport.flowStatus = '0';
            tripApply.haveReport  = true;

            return tripReportMgr.save(tripReport);
        }),
        saveEntities: mark('managers', TripApply, TripReport).mark('tx').on(function (tripApplyMgr, tripReportMgr, params, entityArray, result) {
            var entity,
                trpApplyList, applyNo, trpApply,
                repeatRowNum = 0 ,
                subject = SecurityUtils.getSubject(),
                user = subject.getPrincipal(),
                i, tripReportCount;

            for (i = 0; i < entityArray.length; i++) {
                entity = entityArray[i];
                entity.creator = user.accountName;
                entity.creatorName = user.realName;
                entity.createdTime = new Date();
                entity.lastModifiedTime = new Date();

                entity.tripDays =  Math.floor((entity.endTime.getTime() - entity.startTime.getTime())/(24*3600*1000)) + 1;
                applyNo = result.pickerFields[i].colName;
                trpApplyList = tripApplyMgr.getTripApplyByApplyNo({applyNo: applyNo});

                if(trpApplyList != null && trpApplyList.size() > 0){
                    entity.tripApply = trpApplyList.get(0);
                    entity.tripApply.flowStatus = "-2";
                    entity.tripApply.haveReport = true;
                    tripReportCount = tripReportMgr.getTripReportCountByApplyNo({applyNo: applyNo}, 1);

                    if(tripReportCount > 0){
                       result.repeatRowIdxes.push(i + 1);
                    }
                }
            }

            if (result.failRowIdxes.length === 0 && result.repeatRowIdxes.length === 0) {
                tripReportMgr.save.apply(tripReportMgr.save, entityArray);
            }
            return {failRowIdxes: result.failRowIdxes, repeatRowIdxes: result.repeatRowIdxes};
        })
    };
};
