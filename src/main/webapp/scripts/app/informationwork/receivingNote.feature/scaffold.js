define(
  [
    'jquery',
    'app/commons/export-excel.feature/export-excel-function',
    'app/commons/import-excel.feature/import-excel-function',
    'app/process/process-taskinfo.feature/process-taskinfo-function'
  ],
function($, exportUtil, importUtil) {
  return{
    afterShowDialog: function(dialogType, view, data){

            if('add' == dialogType ){
                $('input[name = "testConclusion"]',view.$el).change(
                    function(){
                        if('qualified' ==  $('input[name = "testConclusion"]',view.$el).val()){
                            view.groups[3].setVisible(false);
                        }else{
                            view.groups[3].setVisible(true);
                        }
                    }
                )
            }
            if('edit' == dialogType){
                $('input[name = "testConclusion"]',view.$el).change(
                    function(){
                        if('qualified' ==  $('input[name = "testConclusion"]',view.$el).val()){
                            view.groups[3].setVisible(false);
                        }else{
                            view.groups[3].setVisible(true);
                        }
                    }
                )
            }
            if('show' == dialogType){
                $('input[name = "testConclusion"]',view.$el).change(
                    function(){
                        if('qualified' ==  $('input[name = "testConclusion"]',view.$el).val()){
                            view.groups[3].setVisible(false);
                        }else{
                            view.groups[3].setVisible(true);
                        }
                    }
                )
            }
        },
    renderers: {
      modifyEnabled: function(data,param, gridData) {
        var flowStatusMap;
        flowStatusMap = {
          'qualified': '合格',
          'unqualified': '不合格'
        };
        return flowStatusMap[data];
      }
    },
    handlers:{
      exportExcel: function(){
          var me = this;
          exportUtil.exportExcel(me);
      }
    }
  };
})
