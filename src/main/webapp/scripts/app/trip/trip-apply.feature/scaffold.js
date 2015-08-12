define([
    'jquery',
    'app/commons/export-excel.feature/export-excel-function',
    'app/commons/import-excel.feature/import-excel-function',
    'app/process/process-taskinfo.feature/process-taskinfo-function',
    'app/process/approval-history.feature/approval-history-function'
], function ($, exportUtil, importUtil, processUtil, apprHisFuncUtil) {
    var count = 0;
    return {
        beforeShowDialog: function(dialogType, view){
            var me = this;
            console.log('view',view);
            //打开编辑页面前验证状态是否为初始或退回
            if ('edit' === dialogType) {
                var  grid = me.feature.views['grid:body'].components[0],
                     data = grid.getSelected()[0].toJSON();
                //流程状态（-2 : 审批完成, -1: 退回, 空或0: 初始, 其它: 审批中）
                if (null !== data.flowStatus && '' !== data.flowStatus && '0' !== data.flowStatus && '-1' !== data.flowStatus) {
                    app.error('请选择状态为初始或退回的记录');
                    return false;
                }
            }

            return true;
        },
        afterShowDialog: function(dialogType, view, data){
            var me = this;

            //申请单号和数据设为只读
            $('input[name= "applyNo"]', view.$el).attr('disabled', true);

            //增加和查看页面的处理
            if ("add" == dialogType) {
                //取当前时间
                me.feature.request({
                    url: 'get-current-info',
                    type: 'get'
                }).done(function (result){
                    //默认当前时间和数量
                    me.feature.model.set('appliedTime', result.result.createdTime);
                    me.feature.model.set('applier', result.result.applier);
                    me.feature.model.set('department',result.result.department);
                    me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
                });

            } else if ("show" == dialogType) {
                me.feature.model.set('applier.realName', data.applier.realName);
            }

            me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
        },
        renderers: {
            modifyStatus: function (data){
                var statusMap = {
                    '-3': '审批完成（已填报告）',
                    '-2': '审批完成（未填报告）',
                    '-1': '退回',
                    '': '初始',
                    '0': '初始',
                    '1': '审核中',
                    '2': '审核中',
                    '3': '审核中'
                };

                return statusMap[data];
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
            },
            retrieve: function(){
                var me = this;

                processUtil.retrieve(me);
            },
            beforeDel: function (gridView, grid, selected) {
                //流程状态（-2 : 审批完成, -1: 退回, 空或0: 初始, 其它: 审批中）
                if ('0' !== selected.flowStatus && '-1' !== selected.flowStatus) {
                    app.error('请选择状态为初始或退回的记录');
                    return false;
                }
                return true;
            },
            sendProcess: function(){
                var me = this,
                    businessName = '出差申请';

                processUtil.sendProcess(me, businessName);
            },
            accountPickerCallback: function(v, entity){
                //进入编辑界面，初始化 picker 数据后赋值
                $('input[name="applier.accountName"]', v.$el).val(entity.accountName);
            },
            afterAccountPickerConfirm: function(v, entity){
                //点击picker，选取数据后赋值
                $('input[name="applier.accountName"]', v.$el).val(entity.accountName);
            },
            addReport: function(){
                var me = this,
                    id,
                    tripReportFeature = app.loadFeature('trip/scaffold:trip-report', {container: '<div></div>'}),
                    view, inputs, formData,
                    grid = me.feature.views['grid:body'].components[0],
                    data = grid.getSelected()[0].toJSON();

                //流程状态（-2 : 审批完成, -1: 退回, 空或0: 初始, 其它: 审批中）
                if(data.flowStatus !== '-2'){
                    app.error('请选择状态为审核完成的记录！');
                    return false;
                }

                tripReportFeature.done(function (feature) {
                    view = feature.views['form:add'];

                    app.showDialog({
                        view: view,
                        title: '填写任务报告书',
                        buttons: [{
                            label: '确定',
                            status: 'btn-primary',
                            fn: function() {
                                formData = view.getFormData();
                                formData.tripApplyId = data.id;
                                feature.request({
                                    url: 'add-report',
                                    type: 'post',
                                    data: formData,
                                    success: function(result){
                                        grid.refresh();
                                        app.success('填写任务报告书成功！');
                                    }
                                });
                            }
                        }]
                    }).done(function (dialog) {

                        $('input[name= "tripApply.applyNo"]', view.$el).val(data.applyNo);
                        $('input[name= "tripApply.applyNo"]', view.$el).attr('disabled', true);
                        $('input[name= "tripApply.applier.realName"]', view.$el).val(data.applier.realName);
                        $('input[name= "tripApply.applier.realName"]', view.$el).attr('disabled', true);
                        $('input[name= "tripApply.department"]', view.$el).val(data.department.name);
                        $('input[name= "tripApply.department"]', view.$el).attr('disabled', true);
                        $('input[name= "tripApply.leavedTime"]', view.$el).val(data.leavedTime);
                        $('input[name= "tripApply.leavedTime"]', view.$el).attr('disabled', true);
                        $('input[name= "tripApply.tripType"]', view.$el).val(data.tripType);
                        $('input[name= "tripApply.tripType"]', view.$el).attr('disabled', true);
                        $('input[name= "tripApply.tripReason"]', view.$el).val(data.tripReason);
                        $('input[name= "tripApply.tripReason"]', view.$el).attr('disabled', true);
                        $('input[name= "tripApply.tripPlace"]', view.$el).val(data.tripPlace);
                        $('input[name= "tripApply.tripPlace"]', view.$el).attr('disabled', true);
                        $('textarea[name= "tripTask"]', view.$el).val(data.tripReason);
                        $('input[name= "startTime"]', view.$el).val(data.leavedTime);
                        $('input[name="tripDays"]', view.$el).attr('disabled', true);
                    });
                });
            },
            print: function(){
                var me = this,
                    printFeature, printView,
                    grid = me.feature.views['grid:body'].components[0],
                    selected = grid.getSelected(),
                    selectedDataIds = [],
                    Wsh, newWin, content;

                printFeature = app.loadFeature('commons/print-tripapply', {container: '<div></div>', ignoreExists: true});

                printFeature.done(function(feature) {
                    printView = feature.views['tripapply-printarea'];
                    for(var i = 0;i < selected.length;i++){
                        selectedDataIds[i] = selected[i].id;
                    }

                    feature.selectedDataIds = selectedDataIds;

                    app.showDialog({
                        view: printView,
                        title: '打印申请报告',
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

