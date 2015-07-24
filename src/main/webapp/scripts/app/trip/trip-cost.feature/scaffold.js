define([
    'jquery',
    'app/commons/export-excel.feature/export-excel-function',
    'app/process/process-taskinfo.feature/process-taskinfo-function',
    'app/process/approval-history.feature/approval-history-function'
], function ($, exportUtil, processUtil, apprHisFuncUtil) {
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

            console.log('into afterShowDialog function()');
            $('input[name= "trafficCost"]', view.$el).change(function() {
                console.log('into change function()');
            });
        },
        handlers: {
            exportExcel: function(){
                var me = this;

                exportUtil.exportExcel(me);
            },
            beforeDel: function (gridView, grid, selected) {
                //流程状态（-2 : 审批完成, -1: 退回, 空或0: 初始, 其它: 审批中）
                if ('0' !== selected.flowStatus && '-1' !== selected.flowStatus) {
                    app.error('请选择状态为初始或退回的记录');
                    return false;
                }
                return true;
            }
        }
    };
});
