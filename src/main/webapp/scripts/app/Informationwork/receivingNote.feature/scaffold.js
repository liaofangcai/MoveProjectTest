define(
  [
    'jquery',
    'app/commons/export-excel.feature/export-excel-function',
    'app/commons/import-excel.feature/import-excel-function'
  ],
function($, exportUtil, importUtil) {
  return{
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
