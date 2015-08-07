(function() {
    define(["jquery", "underscore"], function($, _) {
        return {
            avoidLoadingHandlers: true,
            size: 'large',
            extend: {
                templateHelpers: function() {
                    var tripReports = [],
                        selectedDataIds = this.feature.selectedDataIds;

                    //获取出差申请信息
                    $.ajax({
                        url: 'invoke/common-routers/get-trip-report-by-id',
                        type: 'get',
                        async: false,
                        data: {
                            selectedDataIds: selectedDataIds
                        }
                    }).done(function(data) {
                        if(!_.isArray(data.tripReports)){
                            tripReports.push(data.tripReports);
                        } else {
                            tripReports = data.tripReports;
                        }
                        for(var i = 0; i < tripReports.length;i++){
                            tripReports[i].createdTime = tripReports[i].createdTime.substr(0, 10);
                        }
                    });

                    return {tripReports: tripReports};
                }
            }
        };
    });
}).call(this);
