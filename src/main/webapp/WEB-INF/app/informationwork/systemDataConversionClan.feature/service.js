var {mark}                                           = require('cdeio/mark');
var commExpService                         = require('commons/export-excel.feature/service');
var {Boolean}                                      = java.lang;
var {HashMap}                                    = java.util;
var {ArrayList}                                     = java.util;
var {Date}                                            = java.util;
var {SimpleDateFormat}                      = java.text;
var {SecurityUtils}                                = org.apache.shiro;
var {SystemDataConversionClan}      = com.zyeeda.business.informationwork.entity;
var {EntityMetaResolver}                     = com.zyeeda.cdeio.web.scaffold;

exports.createService = function() {
  return {
    exportExcel: mark('beans', EntityMetaResolver).on(function (resolver, options, exportModule, exportFileName) {
        var beans = new HashMap(),  vo, vos = new ArrayList(),  entity, entities,

        meta = resolver.resolveEntity(SystemDataConversionClan),
        dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
        dateSdf = new SimpleDateFormat("yyyy-MM-dd"),
        entities = commExpService.createService().listEntities(options, meta);
        for (i = 0; i < entities.size(); i++) {
            entity = entities.get(i);
            vo = commExpService.createService().convertEntityToObj(entity);
            if(null !== entity.proposer ){
               vo.proposer  = dateSdf.format(entity.proposer);
            }else if (null !== entity.applicationDepartment ) {
               vo.applicationDepartment  = dateSdf.format(entity.applicationDepartment);
            }else if (null !== entity.identifierTime ) {
                vo.identifierTime  = dateSdf.format(entity.identifierTime);
            }else if(null !== entity.headdate ){
                vo.headdate  = dateSdf.format(entity.headdate);
            }else if(null !== entity.departmentdate ){
                vo.departmentdate  = dateSdf.format(entity.departmentdate);
            }else if(null !== entity.approvaldate ){
                vo.approvaldate  = dateSdf.format(entity.approvaldate);
            }else if(null !== entity.maketable ){
                vo.maketable  = dateSdf.format(entity.maketable);
            }
            vos.add(vo);
        }
        beans.put('systemDataConversionClan', vos);
        beans.put('footer', '操作时间:' + dateTimeStr);

        return commExpService.createService().exportExcel(beans, exportModule, exportFileName);
    })
  };
}
