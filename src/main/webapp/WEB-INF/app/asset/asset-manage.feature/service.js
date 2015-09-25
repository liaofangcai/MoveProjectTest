var {mark}               = require('cdeio/mark');
var commExpService       = require('commons/export-excel.feature/service');

var {Boolean}            = java.lang;
var {HashMap}            = java.util;
var {ArrayList}          = java.util;
var {Date}               = java.util;
var {SimpleDateFormat}   = java.text;
var {SecurityUtils}      = org.apache.shiro;

var {AssetManage}       = com.zyeeda.business.asset.entity;
var {EntityMetaResolver} = com.zyeeda.cdeio.web.scaffold;
exports.createService = function() {
  return {
    saveEntities: mark('managers', AssetManage).mark('tx').on(function (assetManageMgr, params, entityArray, result) {
          var entity,
              subject = SecurityUtils.getSubject(),
              user = subject.getPrincipal(), i;

          for (i = 0; i < entityArray.length; i++) {
              entity = entityArray[i];
              entity.creator = user.accountName;
              entity.creatorName = user.realName;
              entity.createdTime = new Date();
              entity.lastModifiedTime = new Date();
          }
          if (result.failRowIdxes.length === 0 && result.repeatRowIdxes.length === 0) {
              assetManageMgr.save.apply(assetManageMgr.save, entityArray);
          }
          return {failRowIdxes: result.failRowIdxes, repeatRowIdxes: result.repeatRowIdxes};
    }),
    exportExcel: mark('beans', EntityMetaResolver).on(function (resolver, options, exportModule, exportFileName) {
        var beans = new HashMap(),
            vo, vos = new ArrayList(),
            entity, entities,
            meta = resolver.resolveEntity(AssetManage),
            dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
            dateSdf = new SimpleDateFormat("yyyy-MM-dd"),
            statusMap = {
                '0': '闲置',
                '1': '使用中',
                '2': '待维修',
                '3': '转移',
                '4': '报废'
            };

        entities = commExpService.createService().listEntities(options, meta);

        // 按照自己的要求处理数据
        for (i = 0; i < entities.size(); i++) {
            entity = entities.get(i);

            vo = commExpService.createService().convertEntityToObj(entity);

            vo.status  = statusMap[entity.status];
            if(null !== entity.purchaseDate ){
              vo.purchaseDate  = dateSdf.format(entity.purchaseDate);
            }
            vos.add(vo);
        }

        beans.put('assetManages', vos);
        beans.put('footer', '操作时间:' + dateTimeStr);

        return commExpService.createService().exportExcel(beans, exportModule, exportFileName);
    })
  };
}
