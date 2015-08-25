(function() {
    define(["jquery", "underscore"], function($, _) {
        return {
            avoidLoadingHandlers: true,
            size: 'large',
            extend: {
                templateHelpers: function() {
                    var tripApplys = [],
                        selectedDataIds = this.feature.selectedDataIds,
                        i, l,
                        approvalList = [];

                    if (this.feature.printData.length > 0) {
                        tripApplys = this.feature.printData;
                    }else{
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
                        });
                    }

                    for(i = 0; i < tripApplys.length; i++){
                        if (tripApplys[i].approvalHistories) {
                            for(l = 0; l < tripApplys[i].approvalHistories.length; l++){
                                tripApplys[i].approvalHistories[l].operateTime = tripApplys[i].approvalHistories[l].operateTime.substr(0,10);

                                if(tripApplys[i].approvalHistories[l].taskDesc == "主管/经理审批"&&tripApplys[i].approvalHistories[l].comment == "1"){
                                    tripApplys[i].departmentManager = tripApplys[i].approvalHistories[l].operator.realName;
                                    tripApplys[i].departmentManagerTime = tripApplys[i].approvalHistories[l].operateTime;
                                    tripApplys[i].departmentManagerComment = "同意"
                                }

                                if(tripApplys[i].approvalHistories[l].taskDesc == "总监审批"&&
                                    tripApplys[i].approvalHistories[l].comment ==  "1"){
                                    tripApplys[i].inspectorName = tripApplys[i].approvalHistories[l].operator.realName;
                                    tripApplys[i].inspectorTime = tripApplys[i].approvalHistories[l].operateTime;
                                    tripApplys[i].inspectorComment = "同意"
                                }

                                if(tripApplys[i].approvalHistories[l].taskDesc ==  "总经理审批"&&
                                    tripApplys[i].approvalHistories[l].comment ==  "1"){
                                    tripApplys[i].generalManager = tripApplys[i].approvalHistories[l].operator.realName;
                                    tripApplys[i].generalManagerTime = tripApplys[i].approvalHistories[l].operateTime;
                                    tripApplys[i].generalManagerComment = "同意"
                                }
                            }
                        }

                        tripApplys[i].costSum = tripApplys[i].stayCost + tripApplys[i].trafficCost + tripApplys[i].entertainCost + tripApplys[i].otherForecastCost;
                        tripApplys[i].costSum = tripApplys[i].costSum.toFixed(2);
                    }

                    return {tripApplys: tripApplys};
                }
            }
        };
    });
}).call(this);
