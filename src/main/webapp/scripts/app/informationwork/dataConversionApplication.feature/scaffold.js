define(
  [
    'jquery',
    'app/commons/export-excel.feature/export-excel-function',
    'app/commons/import-excel.feature/import-excel-function'
  ],
function($, exportUtil, importUtil) {
  return{
    handlers:{
      exportExcel: function(){
        var me = this;
        exportUtil.exportExcel(me);
      }
    }
  };
})
