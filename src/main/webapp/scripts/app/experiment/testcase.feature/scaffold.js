define([
    'jquery',
    'app/commons/export-excel.feature/export-excel-function',
    'app/commons/import-excel.feature/import-excel-function',
    'app/process/process-taskinfo.feature/process-taskinfo-function'
], function ($, exportUtil, importUtil) {
    return {
        afterShowDialog: function(dialogType, view, data){
            if('add' == dialogType ){
                $('input[name = "ch_re_type"]',view.$el).change(
                    function(){
                        if('其它' ==  $('input[name = "ch_re_type"]',view.$el).val()){
                            view.groups[2].setVisible(true);
                        }else{
                            view.groups[2].setVisible(false);
                        }
                    }
                )
            }
            if('edit' == dialogType){
                if('其它' ==  $('input[name = "ch_re_type"]',view.$el).val()){
                            console.log("1234")
                            view.groups[2].setVisible(true);
                        }else{
                            view.groups[2].setVisible(false);
                        }
                $('input[name = "ch_re_type"]',view.$el).change(
                    function(){
                        if('其它' ==  $('input[name = "ch_re_type"]',view.$el).val()){
                            console.log("1234")
                            view.groups[2].setVisible(true);
                        }else{
                            view.groups[2].setVisible(false);
                        }
                    }
                )
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




