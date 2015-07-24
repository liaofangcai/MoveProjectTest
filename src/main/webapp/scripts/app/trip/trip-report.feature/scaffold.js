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
            modifyStatus: function (data){
                var statusMap = {
                    '-2': '审批完成',
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
                    data = grid.getSelected()[0].toJSON();

                //流程状态（-2 : 审批完成, -1: 退回, 空或0: 初始, 其它: 审批中）
                if(data.flowStatus !== '-2'){
                    app.error('请选择状态为审核完成的记录！');
                    return false;
                }

                view = me.feature.views['form:cost'];
                me.feature.model.set('id', data.id);
                me.feature.model.fetch().done(function() {
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
                    });
                });
            }
        }
    };
});
