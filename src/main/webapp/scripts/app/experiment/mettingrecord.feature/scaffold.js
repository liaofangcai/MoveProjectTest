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
                    me.feature.model.set('makeDate', result.result.createdTime);
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
            },
            print: function(){
                var me = this,
                    printFeature, printView,
                    grid = me.feature.views['grid:body'].components[0],
                    selected = grid.getSelected(),
                    selectedDataIds = [],
                    Wsh, newWin, content,
                    printData = [],
                    i;
                printFeature = app.loadFeature('commons/print-mettingrecord', {container: '<div></div>', ignoreExists: true});

                printFeature.done(function(feature) {
                    printView = feature.views['mettingrecord-printarea'];
                    if(selected){
                        for(i = 0; i < selected.length; i++){
                            selectedDataIds[i] = selected[i].id;
                        }
                    }else{
                        $.ajax({
                            url: 'invoke/scaffold/experiment/mettingrecord',
                            type: 'get',
                            async: false,
                            cache: false
                        }).done(function(data) {
                            printData = data.results;
                        });
                    }

                    feature.printData = printData;
                    feature.selectedDataIds = selectedDataIds;

                    app.showDialog({
                        view: printView,
                        title: '打印信息',
                        onClose: function() {
                            feature.stop();
                        },
                        buttons: [{
                            label: '打印',
                            status: 'btn-primary',
                            fn: function() {
                                try{
                                    Wsh = new ActiveXObject("WScript.Shell");
                                    HKEY_Key = "header";
                                    //设置页眉(为空)
                                    Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "");
                                    HKEY_Key = "footer";
                                    //设置页脚(为空)
                                    Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "");
                                    HKEY_Key = "margin_bottom";
                                    //设置下页边距(0)
                                    Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "0");
                                    HKEY_Key = "margin_left";
                                    //设置左页边距(0)
                                    Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "0");
                                    HKEY_Key = "margin_right";
                                    //设置右页边距(0)
                                    Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "0");
                                    HKEY_Key = "margin_top";
                                    //设置上页边距(0)
                                    Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "0");
                                }catch(e){
                                }

                                newWin = window.open('');
                                content = '<div>';
                                content += printView.$('printArea').html();
                                content += '</div>';

                                newWin.document.write(content);
                                newWin.print();
                                newWin.document.close();
                            }
                        }]
                    });
                });
            }
        }
    };
});




