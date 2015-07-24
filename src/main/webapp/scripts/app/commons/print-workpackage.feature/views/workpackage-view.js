(function() {
    define(["jquery", "underscore"], function($, _) {
        return {
            avoidLoadingHandlers: true,
            size: 'large',
            extend: {
                templateHelpers: function() {
                    var workPackage,
                        selectedDataId = app.selectedDataId;

                    //获取工作包信息
                    $.ajax({
                        url: 'invoke/common-routers/get-work-package-by-id',
                        type: 'get',
                        async: false,
                        data: {
                            selectedDataId: selectedDataId
                        }
                    }).done(function(data) {
                        var taskPersons = '', taskInfos;

                        if (data.workPackage.taskInfos){
                            taskInfos = data.workPackage.taskInfos;
                            for(var key in taskInfos){
                                taskPersons += taskInfos[key].account.accountName + '、';
                            }
                        }
                        workPackage = data.workPackage;
                        workPackage.taskPersons = taskPersons.substring(0, taskPersons.length - 1);
                    });

                    return {workPackage: workPackage};
                }
            }
        };
    });
}).call(this);
