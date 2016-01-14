define([
  'jquery',
], function ($) {
  return {
    afterShowDialog: function(dialogType, view, data){
      var me = this;
      if ("add" == dialogType) {
        //取当前时间
        me.feature.request({
            url: 'get-current-info',
            type: 'get'
        }).done(function (result){
            //默认当前时间和数量
            me.feature.model.set('writeDate', result.result.createdTime);
            if(result.result.department){
                me.feature.model.set('department', result.result.department.name);
            }
            me.feature.model.set('writer', result.result.applier.realName);
            me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
        });
      }
      me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
    }
  }
})
