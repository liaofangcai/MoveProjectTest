(function() {
  define(["jquery", "underscore"], function ($, _) {
    return {
      avoidLoadingHandlers: true,
      size: 'large',
      extend: {
        templateHelpers: function() {
            var results = [], noApprovalHistory,
                commentMap = {
                    '1': '同意',
                    '2': '不同意'
                },
                selectedDataId = app.selectedDataId;

            //根据被选中的数据ID查找审批记录
            $.ajax({
                url: 'invoke/common-routers/get-entry-approval-history',
                type: 'get',
                async: false,
                data: {selectedDataId: selectedDataId}
            }).done(function (data){

                _.each(data.results, function (element, index, list){
                    element.index = index + 1;
                    element.type = false;
                    var length = element.operator.length;
                    element.operator = element.operator.substr(0, length - 1);
                    if (element.operateTime === '在办') {
                        element.type = true;
                    } else {
                        element.type = false;
                    }
                    element.comment = commentMap[element.comment];
                    results.push(element);
                });
            });

            if (_.size(results) === 0) {
                noApprovalHistory = '没有相关历史记录';
            }
            return {approvalHistorys: results, noApprovalHistory: noApprovalHistory};
        }
      }
    };
  });

}).call(this);
