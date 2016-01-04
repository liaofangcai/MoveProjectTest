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
                    me.feature.model.set('buildTime', result.result.createdTime);
                    me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
                });

            } else if ("show" == dialogType) {
                me.feature.model.set('applier.realName', data.applier.realName);
            }

            me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
        },
        afterShowInlineGridDialog: function(dialogType, view, data){
            if('add' == dialogType ){
                $('input[name = "whetherSign"]',view.$el).change(
                    function(){
                        if('false' ==  $('input[name = "whetherSign"]',view.$el).val()){
                            view.groups[2].setVisible(true);
                        }else{
                            view.groups[2].setVisible(false);
                        }
                    }
                );
                $('input[name = "reexamine"]',view.$el).change(
                    function(){
                        if('false' ==  $('input[name = "reexamine"]',view.$el).val()){
                            view.groups[4].setVisible(true);
                            view.groups[5].setVisible(false);
                        }else{
                            view.groups[4].setVisible(false);
                            view.groups[5].setVisible(true);
                        }
                    }
                )
            }
            if('edit' == dialogType){
                $('input[name = "whetherSign"]',view.$el).change(
                    function(){
                        if('false' ==  $('input[name = "whetherSign"]',view.$el).val()){
                            view.groups[2].setVisible(true);
                        }else{
                            view.groups[2].setVisible(false);
                        }
                    }
                );
                $('input[name = "reexamine"]',view.$el).change(
                    function(){
                        if('false' ==  $('input[name = "reexamine"]',view.$el).val()){
                            view.groups[4].setVisible(true);
                            view.groups[5].setVisible(false);
                        }else{
                            view.groups[4].setVisible(false);
                            view.groups[5].setVisible(true);
                        }
                    }
                )
            }

        },
        renderers: {
            modifyGender: function(data, param, gridData) {
                var genderMap;

                genderMap = {
                    1: '男',
                    0: '女'
                };
                return genderMap[data];
            },
            modifySignin: function(data, param, gridData) {
                var signinMap;

                signinMap = {
                    true: '是',
                    false: '否'
                };
                return signinMap[data];
            }
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
            }
        }
    };
});

