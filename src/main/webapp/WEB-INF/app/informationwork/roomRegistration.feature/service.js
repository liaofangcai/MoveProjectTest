var {mark}                                   = require('cdeio/mark');
var commExpService                 = require('commons/export-excel.feature/service');
var {Boolean}                              = java.lang;
var {HashMap}                            = java.util;
var {ArrayList}                             = java.util;
var {Date}                                    = java.util;
var {SimpleDateFormat}              = java.text;
var {SecurityUtils}                        = org.apache.shiro;
var {RoomRegistration}                = com.zyeeda.business.informationwork.entity;
var {EntityMetaResolver}              = com.zyeeda.cdeio.web.scaffold;

exports.createService = function() {
  return {
    exportExcel: mark('beans', EntityMetaResolver).on(function (resolver, options, exportModule, exportFileName) {
        var beans = new HashMap(), vo, vos = new ArrayList(), entity, entities,

        meta = resolver.resolveEntity(RoomRegistration),
        dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
        dateTimeStrs = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"),
        dateSdf = new SimpleDateFormat("yyyy-MM-dd"),
        entities = commExpService.createService().listEntities(options, meta);
        for (i = 0; i < entities.size(); i++) {
            entity = entities.get(i);
            vo = commExpService.createService().convertEntityToObj(entity);
            if(null !== entity.systemUpdateRecordsName ){
               vo.systemUpdateRecordsName  = dateSdf.format(entity.systemUpdateRecordsName);
            } else if (null !== entity.address ) {
               vo.address  = dateTimeStrs.format(entity.address);
            }else if (null !== entity.updateContent ) {
                vo.updateContent  = dateTimeStrs.format(entity.updateContent);
            }
            vos.add(vo);
        }
        beans.put('roomRegistration', vos);
        beans.put('footer', '操作时间:' + dateTimeStr);

        return commExpService.createService().exportExcel(beans, exportModule, exportFileName);
    })
  };
}
