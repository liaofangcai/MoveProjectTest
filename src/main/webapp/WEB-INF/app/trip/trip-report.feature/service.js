var {mark}                  = require('cdeio/mark');
var commExpService          = require('commons/export-excel.feature/service');
var {createManager}         = require('cdeio/manager');

var {TripReport}            = com.zyeeda.business.trip.entity;
var {TripApply}             = com.zyeeda.business.trip.entity;
var {TripCost}              = com.zyeeda.business.trip.entity;
var {EntityMetaResolver}    = com.zyeeda.cdeio.web.scaffold;
var {SecurityUtils}         = org.apache.shiro;
var {Integer}               = java.lang;
var {SimpleDateFormat}      = java.text;
var {ArrayList}             = java.util;
var {HashMap}               = java.util;
var {Date}                  = java.util;

exports.createService = function () {
    return {
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
        saveTripReport: mark('managers', TripReport, TripApply).mark('tx').on(function(tripReportMgr, tripApplyMgr, data) {
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
            tripReport.flowStatus = '0';
            tripApply.flowStatus = '-3';

            return tripReportMgr.save(tripReport);
        }),
        saveEntities: mark('managers', TripApply, TripReport).mark('tx').on(function (tripApplyMgr, tripReportMgr, params, entityArray, result) {
            var entity,
                trpApplyList, applyNo,
                repeatRowNum = 0 ,
                subject = SecurityUtils.getSubject(),
                user = subject.getPrincipal();

            for (var i = 0; i < entityArray.length; i++) {
                entity = entityArray[i];
                entity.creator = user.accountName;
                entity.creatorName = user.realName;
                entity.createdTime = new Date();
                entity.lastModifiedTime = new Date();
                entity.tripDays =  Math.floor((entity.endTime.getTime() - entity.startTime.getTime())/(24*3600*1000)) + 1;
                applyNo = result.pickerFields[i].colName;
                trpApplyList = tripReportMgr.getTripApplyByApplyNo({applyNo: applyNo});

                if(trpApplyList != null && trpApplyList.size() > 0){
                    entity.tripApply = trpApplyList.get(0);
                }
            }

            if (result.failRowIdxes.length === 0 && result.repeatRowIdxes.length === 0) {
                tripApplyMgr.save.apply(tripApplyMgr.save, entityArray);
            }
            return {failRowIdxes: 0, repeatRowIdxes: 0, repeatRowNum: 0};
        })
    };
};
