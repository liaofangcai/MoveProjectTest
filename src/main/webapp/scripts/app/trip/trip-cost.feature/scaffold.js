define([
    'jquery',
    'app/commons/export-excel.feature/export-excel-function',
    'app/commons/import-excel.feature/import-excel-function',
    'app/process/process-taskinfo.feature/process-taskinfo-function',
    'app/process/approval-history.feature/approval-history-function'
], function ($, exportUtil, importUtil, processUtil, apprHisFuncUtil) {
    var count = 0;
    return {
        afterShowDialog: function(dialogType, view, data){
            var me = this;

            if ("show" == dialogType) {
                me.feature.model.set('tripReport.tripApply.applier.realName', data.tripReport.tripApply.applier.realName);
                me.feature.model.set('tripReport.tripApply.department', data.tripReport.tripApply.department.name);
                me.feature.model.set('tripReport.tripApply.tripPlace', data.tripReport.tripApply.tripPlace);
                me.feature.model.set('tripReport.tripDays', data.tripReport.tripDays);
                me.feature.model.set('tripReport.tripTask', data.tripReport.tripTask);
            }else if ("edit" == dialogType) {
                me.feature.model.set('tripReport.tripApply.applier.realName', data.tripReport.tripApply.applier.realName);
                me.feature.model.set('tripReport.tripApply.tripPlace', data.tripReport.tripApply.tripPlace);
            }

            me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
        },
        handlers: {
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
            },
        }
    };
});
