var {mark}               = require('cdeio/mark');
var commExpService       = require('commons/export-excel.feature/service');
var {Boolean}            = java.lang;
var {HashMap}            = java.util;
var {ArrayList}          = java.util;
var {Date}               = java.util;
var {SimpleDateFormat}   = java.text;
var {SecurityUtils}      = org.apache.shiro;
var {ReceivingNote}             = com.zyeeda.business.informationwork.entity;
var {EntityMetaResolver} = com.zyeeda.cdeio.web.scaffold;
exports.createService = function() {
  return {
    exportExcel: mark('beans', EntityMetaResolver).on(function (resolver, options, exportModule, exportFileName) {
        var beans = new HashMap(),
            vo, vos = new ArrayList(),
            entity, entities,
            meta = resolver.resolveEntity(ReceivingNote),
            dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
            dateSdf = new SimpleDateFormat("yyyy-MM-dd"),
            statusMap1 = {
                    '1': '合格',
                    '2': '不合格'
                };
                statusMap2 = {
                    '1': '合格',
                    '2': '不合格'
                };
                statusMap3 = {
                    '1': '退货',
                    '2': '捡用',
                    '3': '让步接收',
                    '4': '报废',
                    '5': '返工',
                    '6': '返修'
                }
            entities = commExpService.createService().listEntities(options, meta);

        // 按照自己的要求处理数据
        for (i = 0; i < entities.size(); i++) {
            entity = entities.get(i);
            vo = commExpService.createService().convertEntityToObj(entity);
            if(null !== entity.arrivalTime ){
               vo.arrivalTime  = dateSdf.format(entity.arrivalTime);
            }else if(null !== entity.testConclusion_Date ){
               vo.testConclusion_Date  = dateSdf.format(entity.testConclusion_Date);
            }else if(null !== entity.auditorDate ){
               vo.auditorDate  = dateSdf.format(entity.auditorDate);
            }

            vos.add(vo);
        }
        beans.put('receivingNote', vos);
        beans.put('footer', '操作时间:' + dateTimeStr);

        return commExpService.createService().exportExcel(beans, exportModule, exportFileName);
    })
  };
}
