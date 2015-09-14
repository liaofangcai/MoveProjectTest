define([
    'jquery',
    'app/process/process-taskinfo.feature/process-taskinfo-function'
], function ($, processUtil) {
    return {
        afterShowDialog: function(dialogType, view, data){
            var me = this;

            if ("add" == dialogType) {
                //取当前时间
                me.feature.request({
                    url: 'get-current-info',
                    type: 'get'
                }).done(function (result){

                    me.feature.model.set('appliedTime', result.result.createdTime);
                    me.feature.model.set('applier', result.result.applier.realName);
                    me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
                });

            } else if ("show" == dialogType) {
                me.feature.model.set('applier.realName', data.applier.realName);
            }

            me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
        },
        renderers: {
            modifyStatus: function(data, param, gridData) {
              var flowStatusMap;
                flowStatusMap = {
                    true: '紧急',
                    false: '一般'
                };
              return flowStatusMap[data];
            }
        }
    };
});

