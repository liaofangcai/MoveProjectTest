(function() {
    define(["jquery", "underscore"], function($, _) {
        return {
            avoidLoadingHandlers: true,
            size: 'large',
            extend: {
                templateHelpers: function() {
                    var tripApplys = [],
                        selectedDataIds = this.feature.selectedDataIds;

                    //获取出差申请信息
                    $.ajax({
                        url: 'invoke/common-routers/get-trip-apply-by-id',
                        type: 'get',
                        async: false,
                        data: {
                            selectedDataIds: selectedDataIds
                        }
                    }).done(function(data) {
                        if(!_.isArray(data.tripApplys)){
                            tripApplys.push(data.tripApplys);
                        } else {
                            tripApplys = data.tripApplys;
                        }

                        for(var i = 0; i < tripApplys.length; i++){
                            tripApplys[i].costSum = tripApplys[i].stayCost + tripApplys[i].trafficCost + tripApplys[i].entertainCost + tripApplys[i].otherForecastCost;
                        }
                    });

                    return {tripApplys: tripApplys};
                }
            }
        };
    });
}).call(this);
