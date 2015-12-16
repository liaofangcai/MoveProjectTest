var {mark}                  = require('cdeio/mark');
var commExpService          = require('commons/export-excel.feature/service');

var {ResearchDemand}         = com.zyeeda.business.experiment.entity;
var {EntityMetaResolver}    = com.zyeeda.cdeio.web.scaffold;

var {SecurityUtils}         = org.apache.shiro;
var {ArrayList}             = java.util;
var {HashMap}               = java.util;
var {Date}                  = java.util;
var {Boolean}               = java.lang;
var {SimpleDateFormat}      = java.text;

exports.createService = function() {
    return{
        exportExcel: mark('beans',EntityMetaResolver).on(function (resolver, options, exportModule, exportFileName) {
            var beans = new HashMap(),
                vo, vos = new ArrayList(),
                entity, entities,
                meta = resolver.resolveEntity(ResearchDemand),
                dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
                dateSdf = new SimpleDateFormat("yyyy-MM-dd")

            entities = commExpService.createService().listEntities(options, meta);

            // 按照自己的要求处理数据
            for (i = 0; i < entities.size(); i++) {
                entity = entities.get(i);

                vo = commExpService.createService().convertEntityToObj(entity);
                if(null !== entity.make_date){
                     vo.make_date = dateSdf.format(entity.make_date);
                 }
                 if (null!==entity.demand_forword_date) {
                    vo.demand_forword_date=dateSdf.format(entity.demand_forword_date);
                 };
                 if(null!=entity.examine_date){
                     vo.examine_date=dateSdf.format(entity.examine_date);
                 }
                 if(null!=entity.ratify_date){
                    vo.ratify_date=dateSdf.format(entity.ratify_date);
                 }
                vos.add(vo);
            }

            beans.put('researchs', vos);
            beans.put('footer', '操作时间:' + dateTimeStr);

            return commExpService.createService().exportExcel(beans, exportModule, exportFileName);
        })

    };
}
