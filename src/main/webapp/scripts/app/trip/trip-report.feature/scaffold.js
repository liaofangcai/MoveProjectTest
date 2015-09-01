define([
    'jquery',
    'app/commons/export-excel.feature/export-excel-function',
    'app/commons/import-excel.feature/import-excel-function',
    'app/process/process-taskinfo.feature/process-taskinfo-function',
    'app/process/approval-history.feature/approval-history-function',
    'app/commons/approval-histories.feature/approval-histories-function'
], function ($, exportUtil, importUtil, processUtil, apprHisFuncUtil, approvalHistoriesUtil) {
    var count = 0;
    return {
        beforeShowDialog: function(dialogType, view){
            var me = this;

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
            //设置申请人、部门不可改
            $('input[name= "tripApply.applier.realName"]', view.$el).attr('disabled',true);
            $('input[name= "tripApply.department"]', view.$el).attr('disabled',true);
            //设置出差天数字段为不可更改
            $('input[name="tripDays"]', view.$el).attr('disabled', true);
            if ("show" == dialogType) {
                me.feature.model.set('tripApply.applier.realName', data.tripApply.applier.realName);
                me.feature.model.set('tripApply.department', data.tripApply.department.name);
                me.feature.model.set('tripApply.tripPlace', data.tripApply.tripPlace);
            }else if ("edit" == dialogType) {
                me.feature.model.set('tripApply.applier.realName', data.tripApply.applier.realName);
                me.feature.model.set('tripApply.department', data.tripApply.department.name);
                me.feature.model.set('tripApply.tripPlace', data.tripApply.tripPlace);
            }

            me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
        },
        renderers: {
            modifyStatus: function(data, param, gridData) {
                var showApproHis, flowStatusMap, html, id, haveCostsHtml;

                showApproHis = function(id){
                    approvalHistoriesUtil.showApprovalHistories(this, id);
                };
                window.showApproHis = showApproHis;

                html = '<a href="javascript:void(0)" onclick="showApproHis(\'' + gridData.id + '\');"> ';

                if (gridData.haveCosts) {
                    haveCostsHtml = '已填报销明细';
                }else{
                    haveCostsHtml = '未填报销明细';
                }

                flowStatusMap = {
                    '-2': html + '审批完成(' + haveCostsHtml + ')</a>',
                    '-1': html + '退回</a>',
                    '': '初始',
                    '0': '初始',
                    '1': html +'审批中</a>',
                    '2': html +'审批中</a>',
                    '3': html +'审批中</a>'
                };

                return flowStatusMap[data] || html + '审批中</a>';
            },
            tripDays: function(data, param, gridData){
                var html = '<div style = "text-align: right;">' + data + '</div>' ;
                return html;
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
                    businessName = '出差任务报告书';

                processUtil.sendProcess(me, businessName);
            },
            afterShowAuditDialog: function(v, data){
                var me = v;
                //审核页面进行赋值
                me.feature.model.set('tripApply.applier.realName', data.tripApply.applier.realName);
                me.feature.model.set('tripApply.department', data.tripApply.department.name);
                me.feature.model.set('tripApply.tripPlace', data.tripApply.tripPlace);
                me.setFormData(me.feature.model.toJSON(), true);
            },
            formStatusChanged: function(data, el) {
                var startTime = data.startTime,
                    endTime = data.endTime,
                    days = 1;

                if (startTime.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/) == null || endTime.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/) == null) {
                    app.error('请输入正确的日期格式！');
                }else {
                    startTime = new Date(startTime);
                    endTime = new Date(endTime);
                    if (endTime < startTime){
                        app.error('结束日期小于开始日期，请重新选择！');
                    }else{
                        days = Math.floor((endTime - startTime)/(24*3600*1000)) + 1;
                        $('input[name= "tripDays"]').val(days);
                    }
                }
            },
            addCost: function(){
                var me = this,
                    view, inputs, formData,
                    grid = me.feature.views['grid:body'].components[0],
                    data = grid.getSelected()[0].toJSON(),
                    tripCostFeature = app.loadFeature('trip/scaffold:trip-cost', {container: '<div></div>'});

                // 流程状态（-2 : 审批完成, -1: 退回, 空或0: 初始, 其它: 审批中）
                if(data.flowStatus !== '-2'){
                    app.error('请选择状态为审核完成的记录！');
                    return false;
                }

                tripCostFeature.done(function (feature) {
                    view = feature.views['form:add'];
                    app.showDialog({
                        view: view,
                        title: '填写报销明细',
                        buttons: [{
                            label: '确定',
                            status: 'btn-primary',
                            fn: function() {
                                formData = view.getFormData();
                                formData.tripReportId = data.id;
                                me.feature.request({
                                    url: 'add-cost',
                                    type: 'post',
                                    data: formData,
                                    success: function(result){
                                        grid.refresh();
                                        app.success('报销明细填写成功！');
                                    }
                                });
                            }
                        }]
                    }).done(function (dialog) {
                        view.setFormData(me.feature.model.toJSON());
                        $('input[name= "tripApply.applier.realName"]', view.$el).val(data.tripApply.applier.realName);
                        $('input[name= "tripApply.applier.realName"]', view.$el).attr('disabled', true);
                        $('input[name= "tripApply.department"]', view.$el).val(data.tripApply.department.name);
                        $('input[name= "tripApply.department"]', view.$el).attr('disabled', true);
                        $('input[name= "tripApply.tripPlace"]', view.$el).val(data.tripApply.tripPlace);
                        $('input[name= "tripApply.tripPlace"]', view.$el).attr('disabled', true);
                        $('input[name= "startTime"]', view.$el).attr('disabled', true);
                        $('input[name= "endTime"]', view.$el).attr('disabled', true);
                        $('input[name= "tripDays"]', view.$el).attr('disabled', true);
                        $('textarea[name= "tripTask"]', view.$el).attr('disabled', true);
                        $('textarea[name= "completion"]', view.$el).attr('disabled', true);
                        $('input[name= "attachment"]', view.$el).attr('disabled', true);

                        $('input[name = "totalCost"]',view.$el).attr('disabled', true);
                        $('input[name = "trafficCost"]',view.$el).change(function(){
                                $('input[name = "totalCost"]', view.$el).val(
                                    Number($('input[name = "trafficCost"]', view.$el).val()) +
                                    Number($('input[name = "stayCost"]', view.$el).val()) +
                                    Number($('input[name = "costMoney"]', view.$el).val())
                                );
                                $('input[name = "totalCost"]', view.$el).val(
                                    Number($('input[name = "totalCost"]', view.$el).val()).toFixed(2));
                                $('input[name = "trafficCost"]', view.$el).val(
                                    Number($('input[name = "trafficCost"]', view.$el).val()).toFixed(2));
                        });
                        $('input[name = "stayCost"]',view.$el).change(function(){
                                $('input[name = "totalCost"]', view.$el).val(
                                    Number($('input[name = "trafficCost"]', view.$el).val()) +
                                    Number($('input[name = "stayCost"]', view.$el).val()) +
                                    Number($('input[name = "costMoney"]', view.$el).val())
                                );
                                $('input[name = "totalCost"]', view.$el).val(
                                    Number($('input[name = "totalCost"]', view.$el).val()).toFixed(2));
                                $('input[name = "stayCost"]', view.$el).val(
                                    Number($('input[name = "stayCost"]', view.$el).val()).toFixed(2));
                        });
                        $('input[name = "costMoney"]',view.$el).change(function(){
                                $('input[name = "totalCost"]', view.$el).val(
                                    Number($('input[name = "trafficCost"]', view.$el).val()) +
                                    Number($('input[name = "stayCost"]', view.$el).val()) +
                                    Number($('input[name = "costMoney"]', view.$el).val())
                                );
                                $('input[name = "totalCost"]', view.$el).val(
                                    Number($('input[name = "totalCost"]', view.$el).val()).toFixed(2));
                                $('input[name = "costMoney"]', view.$el).val(
                                    Number($('input[name = "costMoney"]', view.$el).val()).toFixed(2));
                        });
                    });
                });
            },
            print: function(){
                var me = this,
                    printFeature, printView,
                    grid = me.feature.views['grid:body'].components[0],
                    selected = grid.getSelected(),
                    selectedDataIds = [],
                    Wsh, newWin, content,
                    printData = [];

                printFeature = app.loadFeature('commons/print-tripreport', {container: '<div></div>', ignoreExists: true});

                printFeature.done(function(feature) {
                    printView = feature.views['tripreport-printarea'];

                    if(selected){
                        for(i = 0; i < selected.length; i++){
                            selectedDataIds[i] = selected[i].id;
                        }
                    }else{
                        $.ajax({
                            url: 'invoke/scaffold/trip/trip-report/',
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
