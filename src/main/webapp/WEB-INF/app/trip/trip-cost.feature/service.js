var {mark}                  = require('cdeio/mark');
var commExpService          = require('commons/export-excel.feature/service');
var {createManager}         = require('cdeio/manager');

var {Account}            = com.zyeeda.cdeio.commons.organization.entity;
var {Department}         = com.zyeeda.cdeio.commons.organization.entity;

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
        list: mark('beans', EntityMetaResolver).mark('tx').on(function (resolver, entity, options) {
            var meta = resolver.resolveEntity(TripCost),
                tripCostMgr = createManager(meta.entityClass),
                accountMeta = resolver.resolveEntity(Account),
                accountMgr = createManager(accountMeta.entityClass),
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
                    options.filters.push(['eq', 'tripReport.tripApply.applier.id', currentUser.id]);
                }
            }

            if (options.filters) {
                results = tripCostMgr.findByEntity(options);
            } else {
                results = tripCostMgr.findByExample(entity, options);
            }

            return results;
        }),
        saveTripCost: mark('managers', TripReport, TripCost).mark('tx').on(function(tripReportMgr, tripCostMgr, data) {
            var tripReport, tripCost,
                subject = SecurityUtils.getSubject(),
                tripCosts,
                user = subject.getPrincipal();

            tripReport = tripReportMgr.find(data.tripReportId);

            tripCost = new TripCost();
            tripCost.tripReport = tripReport;
            tripCost.tripPlace = data.tripPlace;
            tripCost.trafficCost = data.trafficCost;
            tripCost.stayCost = data.stayCost;
            tripCost.entertainCost = data.entertainCost;
            tripCost.otherCost = data.otherCost;
            tripCost.totalCost =  data.totalCost;
            tripCost.tripTime = new SimpleDateFormat("yyyy-MM-dd").parse(data.tripTime);
            tripCost.remark = data.remark;
            tripCost.creator = user.accountName;
            tripCost.creatorName = user.realName;
            tripCost.createdTime = new Date();
            tripCostMgr.save(tripCost);
            tripReport.flowStatus = "-2";
            tripReport.haveCosts = true;
        }),
        // 根据ID查找
        getById: mark('managers', TripCost).mark('tx').on(function (tripCostMgr, id) {
            return tripCostMgr.find(id);
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
                    '-2': '审批完成(未填写报告)',
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
        saveEntities: mark('managers', TripCost, TripReport).mark('tx').on(function (tripCostMgr, tripReportMgr, params, entityArray, result) {
            var entity,
                trpReportList, applyNo,
                repeatRowNum = 0 ,
                subject = SecurityUtils.getSubject(),
                user = subject.getPrincipal();

            for (var i = 0; i < entityArray.length; i++) {
                entity = entityArray[i];
                entity.creator = user.accountName;
                entity.creatorName = user.realName;
                entity.createdTime = new Date();
                entity.lastModifiedTime = new Date();
                entity.totalCost = entity.trafficCost + entity.stayCost + entity.entertainCost+entity.otherCost;
                applyNo = result.pickerFields[i].colName;
                trpReportList = tripReportMgr.getTripReportByApplyNo({applyNo: applyNo});

                if(trpReportList != null && trpReportList.size() > 0){
                    entity.tripReport = trpReportList.get(0);
                    entity.tripReport.flowStatus = "-2";
                    entity.tripReport.haveCosts  = true;
                }
            }

            if (result.failRowIdxes.length === 0 && result.repeatRowIdxes.length === 0) {
                tripCostMgr.save.apply(tripCostMgr.save, entityArray);
            }
            return {failRowIdxes: result.failRowIdxes, repeatRowIdxes: result.repeatRowIdxes};
        })
    };
};
