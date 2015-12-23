var {mark}                             = require('cdeio/mark');
var commExpService           = require('commons/export-excel.feature/service');
var {Boolean}                        = java.lang;
var {HashMap}                      = java.util;
var {ArrayList}                       = java.util;
var {Date}                              = java.util;
var {SimpleDateFormat}        = java.text;
var {SecurityUtils}                  = org.apache.shiro;
var {ReceivingNote}               = com.zyeeda.business.informationwork.entity;
var {EntityMetaResolver}       = com.zyeeda.cdeio.web.scaffold;

exports.createService = function() {
  return {
    exportExcel: mark('beans', EntityMetaResolver).on(function (resolver, options, exportModule, exportFileName) {
        var beans = new HashMap(), vo, vos = new ArrayList(), entity, entities,
            meta = resolver.resolveEntity(ReceivingNote),
            dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
            dateSdf = new SimpleDateFormat("yyyy-MM-dd"),
            statusMap = {
                'qualified': '合格',
                'unqualified': '不合格'
                };
            statusMaps= {
                'eturnGoods': '退货',
                'pickingUp': '捡用',
                'concessionReception': '让步接收',
                'scrap': '报废',
                'overAgain': '返工',
                'repair': '返修'
            };
            entities = commExpService.createService().listEntities(options, meta);
            for (i = 0; i < entities.size(); i++) {
                entity = entities.get(i);

                vo = commExpService.createService().convertEntityToObj(entity);
                vo.result  = statusMap[entity.result];
                vo.testConclusion  = statusMap[entity.testConclusion];
                vo.unqualifiedDeal  = statusMaps[entity.unqualifiedDeal];
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
