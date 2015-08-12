(function() {
    define(["underscore"], function(_) {
        return {
            avoidLoadingHandlers: true,
            size: 'large',
            extend: {
                templateHelpers: function() {
                    var tripReports = [],
                        tripCosts = [],
                        selectedDataIds = this.feature.selectedDataIds,
                        i, j;

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
                    });

                    for (i = 0; i < tripReports.length; i++) {
                        for (j = 0; j < tripReports[i].tripCosts.length; j++) {
                            tripReports[i].tripCosts[j].idx = j + 1;
                        }
                    }

                    return {tripReports: tripReports};
                }
            }
        };
    });
}).call(this);
