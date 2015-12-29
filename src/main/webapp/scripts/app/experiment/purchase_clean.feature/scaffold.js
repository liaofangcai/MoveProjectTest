define([
    'jquery',
    'app/commons/export-excel.feature/export-excel-function',
    'app/commons/import-excel.feature/import-excel-function',
    'app/process/process-taskinfo.feature/process-taskinfo-function'
], function ($, exportUtil, importUtil,processUtil) {
    return {
        afterShowDialog: function(dialogType, view, data){
            var me = this;

            if ("add" == dialogType) {
                   //取当前时间
                me.feature.request({
                    url: 'get-current-info',
                    type: 'get'
                }).done(function (result){
                    me.feature.model.set('purchaseDate', result.result.createdTime);
                    me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
                });
            } 
        },
        afterShowInlineGridDialog: function(dialogType, view, data){
            $('input[name= "money"]', view.$el).attr('disabled', true);
            $('input[name = "number"]',view.$el).change(function(){
                    $('input[name = "money"]', view.$el).val(
                        Number($('input[name = "number"]', view.$el).val()) *
                        Number($('input[name = "univalent"]', view.$el).val()) 
                    );
            });
            $('input[name = "univalent"]',view.$el).change(function(){
                    $('input[name = "money"]', view.$el).val(
                        Number($('input[name = "number"]', view.$el).val()) *
                        Number($('input[name = "univalent"]', view.$el).val()) 
                    );
            });
        },
        handlers:{
            exportExcel: function(){
                var me = this;
                exportUtil.exportExcel(me);
            }
        }
    };
});




