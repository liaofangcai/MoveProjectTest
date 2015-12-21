var {mark}                  = require('cdeio/mark');
var commExpService          = require('commons/export-excel.feature/service');

var {SystemRemoteVisit}     = com.zyeeda.business.experiment.entity;
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
                meta = resolver.resolveEntity(SystemRemoteVisit),
                dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
                dateSdf = new SimpleDateFormat("yyyy-MM-dd")

            entities = commExpService.createService().listEntities(options, meta);

            // 按照自己的要求处理数据
            for (i = 0; i < entities.size(); i++) {
                entity = entities.get(i);

                vo = commExpService.createService().convertEntityToObj(entity);
                if(null !== entity.ap_date){
                     vo.ap_date = dateSdf.format(entity.ap_date);
                 }
                 if (null!==entity.dept_date) {
                    vo.dept_date=dateSdf.format(entity.dept_date);
                 };
                 if(null!=entity.in_date){
                     vo.in_date=dateSdf.format(entity.in_date);
                 }
                 if(null!=entity.leader_date){
                    vo.leader_date=dateSdf.format(entity.leader_date);
                 }
                vos.add(vo);
            }

            beans.put('Sysdatachanges', vos);
            beans.put('footer', '操作时间:' + dateTimeStr);

            return commExpService.createService().exportExcel(beans, exportModule, exportFileName);
        })

    };
}
