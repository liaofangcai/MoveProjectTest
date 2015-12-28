define([
    'jquery',
    'app/commons/export-excel.feature/export-excel-function',
    'app/commons/import-excel.feature/import-excel-function',
    'app/process/process-taskinfo.feature/process-taskinfo-function'
], function ($, exportUtil, importUtil) {
    return {
        afterShowDialog: function(dialogType, view, data){
            var me = this;
            if ("add" == dialogType) {
                   //取当前时间
                me.feature.request({
                    url: 'get-current-info',
                    type: 'get'
                }).done(function (result){
                    me.feature.model.set('apDate', result.result.createdTime);
                    me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
                });
            } 
        },
        handlers:{
            exportExcel: function(){
                var me = this;

                exportUtil.exportExcel(me);
            },
            downloadImportTemplate: function() {
                importUtil.downloadImportTemplate(this);
            }
        }
    };
});




