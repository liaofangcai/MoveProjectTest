(function() {
    define(["jquery", "underscore"], function($, _) {
        return {
            avoidLoadingHandlers: true,
            size: 'large',
            extend: {
                templateHelpers: function() {
                    var tripApplys = [],
                        selectedDataIds = this.feature.selectedDataIds,
                        i,l;

                    //获取出差申请信息
                    $.ajax({
                        url: 'invoke/scaffold/trip/trip-apply/get-trip-apply-by-id',
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
                        for(i = 0; i < tripApplys.length; i++){
                            tripApplys[i].approvalHistories.splice(0,1);
                            for(l = 0; l < tripApplys[i].approvalHistories.length; l++){
                                tripApplys[i].approvalHistories[l].operateTime = tripApplys[i].approvalHistories[l].operateTime.substr(0,10);
                                 if(tripApplys[i].approvalHistories[l].comment = 1){
                                   tripApplys[i].approvalHistories[l].opinion  = '同意';

                                }else{
                                    tripReports[i].approvalHistories[l].opinion = '不同意';
                                };
                            }
                            tripApplys[i].costSum = tripApplys[i].stayCost + tripApplys[i].trafficCost + tripApplys[i].entertainCost + tripApplys[i].otherForecastCost;

                        }

                    });
                    return {tripApplys: tripApplys};
                }
            }
        };
    });
}).call(this);
