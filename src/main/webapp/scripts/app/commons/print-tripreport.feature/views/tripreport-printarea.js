    (function() {
    define(["jquery", "underscore"], function($, _) {
        return {
            avoidLoadingHandlers: true,
            size: 'large',
            extend: {
                templateHelpers: function() {
                    var tripReports = [],
                        tripCosts = [], costsSize = 0, historysize = 0,
                        selectedDataIds = this.feature.selectedDataIds,
                        i, j, k ,l;

                    //获取出差申请信息
                    $.ajax({
                        url: 'invoke/scaffold/trip/trip-report/get-trip-report-by-id',
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
                        for( i = 0; i < tripReports.length;i++){
                            tripReports[i].createdTime = tripReports[i].createdTime.substr(0, 10);
                            //除去上报步骤
                            tripReports[i].approvalHistories.splice(0,1);
                            for(l = 0; l < tripReports[i].approvalHistories.length; l++){
                                tripReports[i].approvalHistories[l].operateTime = tripReports[i].approvalHistories[l].operateTime.substr(0,10);
                                 if(tripReports[i].approvalHistories[l].comment = 1){
                                   tripReports[i].approvalHistories[l].opinion  = '同意';

                                }else{
                                    tripReports[i].approvalHistories[l].opinion = '不同意';
                                };
                            }
                            //计算总计金额
                            for(k = 0; k<tripReports[i].tripCosts.length; k++){
                                var  trafficCostSum = 0, stayCostSum = 0,
                                     entertainCostSum = 0, otherCostSum = 0, totalCostSum = 0;

                                trafficCostSum = trafficCostSum + tripReports[i].tripCosts[k].trafficCost;
                                stayCostSum = stayCostSum + tripReports[i].tripCosts[k].stayCost;
                                entertainCostSum = entertainCostSum + tripReports[i].tripCosts[k].entertainCost;
                                otherCostSum = otherCostSum + tripReports[i].tripCosts[k].otherCost;
                                totalCostSum = totalCostSum + tripReports[i].tripCosts[k].totalCost;
                                tripReports[i].tripCosts.trafficCostSum = trafficCostSum;
                                tripReports[i].tripCosts.stayCostSum = stayCostSum;
                                tripReports[i].tripCosts.entertainCostSum = entertainCostSum;
                                tripReports[i].tripCosts.otherCostSum = otherCostSum;
                                tripReports[i].tripCosts.totalCostSum = totalCostSum;
                            }

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
