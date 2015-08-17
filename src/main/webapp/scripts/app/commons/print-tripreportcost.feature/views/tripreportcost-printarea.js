(function() {
    define(["underscore"], function(_) {
        return {
            avoidLoadingHandlers: true,
            size: 'large',
            extend: {
                templateHelpers: function() {
                    var tripReports = [],
                        tripCosts = [], costsSize = 0,
                        selectedDataIds = this.feature.selectedDataIds,
                        i, j, k;

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
                        costsSize = tripReports[i].tripCosts.length;

                        for (j = 0; j < tripReports[i].tripCosts.length; j++) {
                            tripReports[i].tripCosts[j].idx = j + 1;
                        }

                        for (k = 4; k > costsSize; k--) {
                            tripReports[i].tripCosts.push({});
                        }
                    }

                    return {tripReports: tripReports};
                }
            }
        };
    });
}).call(this);
