define([
    'jquery',
    'app/commons/export-excel.feature/export-excel-function',
    'app/process/process-taskinfo.feature/process-taskinfo-function',
    'app/process/approval-history.feature/approval-history-function'
], function ($, exportUtil, processUtil, apprHisFuncUtil) {
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
                    url: 'get-current-date',
                    type: 'get'
                }).done(function (result){
                    //默认当前时间和数量
                    me.feature.model.set('appliedTime', result.createdTime);
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
            }
        }
    };
});
    