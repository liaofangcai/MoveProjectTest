var {mark} = require('cdeio/mark');
var {createService} = require('cdeio/service');

var {AssetStatus}  = com.zyeeda.business.asset.entity;

exports.createService = function() {
  return {
    removeAssetStatusByAssetManageId: mark('managers', AssetStatus).mark('tx').on(function (assetStatusMgr,assetManageId) {
      var assetStatus,
        assetStatusList,i;

      assetStatusList = assetStatusMgr.removeAssetStatusByAssetManageId({assetManageId: assetManageId});

      for(i = 0; i < assetStatusList.size(); i++){
        assetStatus = assetStatusList.get(i);
        assetStatusMgr.remove(assetStatus);
      }
    })
  };
};
