define([
    'jquery',
    'app/process/process-taskinfo.feature/process-taskinfo-function'
], function ($, processUtil) {
    return {
        afterShowDialog: function(dialogType, view, data){
            var me = this;

            $('input[name= "appliedTime"]', view.$el).attr('disabled', true);
            $('input[name = "applier"]',view.$el).attr('disabled', true);
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
            },
            modifyEnabled: function(data,param, gridData) {
                var flowStatusMap;
                flowStatusMap = {
                    true: '启用',
                    false: '关闭'
                };
                return flowStatusMap[data];
            }
        },
        handlers:{
            close: function(){
                var me = this,
                    grid = me.feature.views['grid:body'].components[0],
                    data = grid.getSelected()[0].toJSON();

                if(!data.enabled){
                   app.error('该招聘需求已经关闭');
                   return false;
                }

                me.feature.request({
                    url: 'demand-close',
                    type: 'post',
                    data: data,
                    success: function(result){
                        grid.refresh();
                        app.success('员工离职办理成功！');
                    }
                });
            }
        }
    };
});

