define([
  'jquery',
  'app/commons/export-excel.feature/export-excel-function',
  'app/commons/import-excel.feature/import-excel-function'
],function($, exportUtil, importUtil){
  return{
    handlers:{
      exportExcel: function(){
          var me = this;

          exportUtil.exportExcel(me);
      },
      
      downloadImportTemplate: function() {
          importUtil.downloadImportTemplate(this);
      },
      importXls: function(){
          var commonImportFeature, importView, me, message, checkFlag, grid;

          me = this;
          message = '';
          checkFlag = false;
          grid = this.feature.views['grid:body'].components[0];
          commonImportFeature = app.loadFeature('commons/import-excel', {container: '<div></div>', ignoreExists: true});

          commonImportFeature.done(function(feature) {
              importView = feature.views['common-import-view'];
              app.showDialog({
                  view: importView,
                  title: '导入 Excel',
                  onClose: function() {
                      feature.stop();
                  },
                  buttons: [{
                      label: '确定',
                      status: 'btn-primary',
                      fn: function() {
                          data = importView.getFormData();
                          if (undefined === data.attachment.id) {
                              app.error('请选择要导入的 excel 文件, 注意: 支持的文件格式为 xls');
                              return false;
                          }
                          if(!data.attachment){
                              app.error('请选择要导入的 excel 文件, 注意: 支持的文件格式为 xls');
                              return false;
                          }else if(importView.isValid()){
                              me.feature.request({
                                  url: 'import-excel',
                                  type: 'post',
                                  data: {attachment: data.attachment}
                              }).done(function(result){
                                  if(result.repeatRowIdxes.length > 0 || result.failRowIdxes.length > 0){
                                      message += '共有 ' + (Number(result.repeatRowIdxes.length) + Number(result.failRowIdxes.length)) +' 行数据导入失败';

                                      if(result.repeatRowIdxes.length > 0){
                                          message += ',第' + result.repeatRowIdxes.join(',') + '行数据重复';
                                      }
                                      if(result.failRowIdxes.length > 0){
                                          message += ',第' + result.failRowIdxes.join(',') + '行数据验证失败';
                                      }
                                  }else{
                                      message += '共有 ' + result.successNum + ' 行数据导入成功';
                                      checkFlag = true;
                                  }

                                  if(checkFlag === true){
                                      app.success(message);
                                      grid.refresh();
                                  }else{
                                      app.error(message);
                                  }
                              });
                          }
                      }
                  }]
              });
          });
      }
    }
  }
})
