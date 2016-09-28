define([
        'jquery',
        'app/commons/export-excel.feature/export-excel-function',
        'app/commons/import-excel.feature/import-excel-function'
], function($, exportUtil, importUtil){
  	return {
        afterShowDialog: function(dialogType, view, data){
            
        },
       
        handlers:{
            updateInfo: function(){
                var me = this;
                  me.feature.request({
                    url: 'updateDepartmentCountInfo',
                    type: 'post'
                }).done(function(result){
                    app.success("更新成功,刷新以后显示数据!")
                })
            }
            
        }
    }
})