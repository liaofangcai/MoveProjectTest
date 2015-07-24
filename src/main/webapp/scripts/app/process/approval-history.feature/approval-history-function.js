(function() {
    define(['jquery', 'underscore', 'app/commons/approval-histories.feature/approval-histories-function'], function ($, _, approvalHistoriesUtil) {
        return {
            afterShowAuditDialog: function(view) {
                var inputs, textareas;

                inputs = $('input[name]', view.$el);
                $.each(inputs, function(i, v) {
                    if('radio' === $(v).attr('type') || 'checkbox' === $(v).attr('type')){
                        return true;
                    }else{
                        $(v).attr('disabled', true);
                    }
                });

                textareas = $('textarea[name]', view.$el);
                $.each(textareas, function(i, v) {
                    $(v).attr('readOnly', true);
                });

                _.each(view.components, function (v, i) {
                    $('#trigger-' + v.id, view.$el).unbind().attr('disabled', true);
                });
            },
            showApprovalHistories: function (me, data, param, gridData) {
                var showApproHis, flowStatusMap, html, id;

                showApproHis = function(id){
                    approvalHistoriesUtil.showApprovalHistories(me, id);
                };
                window.showApproHis = showApproHis;

                html = '<a href="javascript:void(0)" onclick="showApproHis(\'' + gridData.id + '\');"> ';

                flowStatusMap = {
                    '-2': html + '审批完成</a>',
                    '-1': html + '退回</a>',
                    '0': '初始'
                };

                return flowStatusMap[data] || html + '审批中</a>';
            }
        };
    });
}).call(this);
