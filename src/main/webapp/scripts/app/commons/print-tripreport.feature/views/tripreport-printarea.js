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
                        trafficCostSum, stayCostSum, costMoneySum, totalCostSum,
                        i, j, k ,l;

                    if (this.feature.printData.length > 0) {
                        tripReports = this.feature.printData;
                    }else{
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
                        });
                    }
                    //判断costs是否为5条,如果超过5条则只取前五条进行打印,如果不足5条则在costs中添加null添够5条。
                    for (i = 0; i < tripReports.length; i++) {
                        costsSize = tripReports[i].tripCosts.length;

                        for (j = 0; j < tripReports[i].tripCosts.length; j++) {
                            tripReports[i].tripCosts[j].idx = j + 1;
                        }

                        if(costsSize>6){
                            tripReports[i].tripCosts = tripReports[i].tripCosts.slice(0,5);
                        }else{
                            for (k = 6; k > costsSize; k--) {
                                tripReports[i].tripCosts.push({});
                            }
                        }
                    }

                    for( i = 0; i < tripReports.length;i++){
                        trafficCostSum = 0, stayCostSum = 0, costMoneySum = 0, totalCostSum = 0;

                        tripReports[i].createdTime = tripReports[i].createdTime.substr(0, 10);

                        if (tripReports[i].approvalHistories) {
                            for(l = 0; l < tripReports[i].approvalHistories.length; l++){
                                tripReports[i].approvalHistories[l].operateTime = tripReports[i].approvalHistories[l].operateTime.substr(0,10);

                                if(tripReports[i].approvalHistories[l].taskDesc == "总监审批"&&
                                    tripReports[i].approvalHistories[l].comment ==  "1"){
                                    tripReports[i].inspectorName = tripReports[i].approvalHistories[l].operator.realName;
                                    tripReports[i].inspectorTime = tripReports[i].approvalHistories[l].operateTime;
                                    tripReports[i].inspectorComment = "同意"
                                }

                                if(tripReports[i].approvalHistories[l].taskDesc ==  "总经理审批"&&
                                    tripReports[i].approvalHistories[l].comment ==  "1"){
                                    tripReports[i].generalManager = tripReports[i].approvalHistories[l].operator.realName;
                                    tripReports[i].generalManagerTime = tripReports[i].approvalHistories[l].operateTime;
                                    tripReports[i].generalManagerComment = "同意"
                                }
                            }
                        }

                        //计算总计金额
                        for(k = 0; k<tripReports[i].tripCosts.length; k++){
                            if(tripReports[i].tripCosts[k].id){
                                trafficCostSum = trafficCostSum + tripReports[i].tripCosts[k].trafficCost;
                                stayCostSum = stayCostSum + tripReports[i].tripCosts[k].stayCost;
                                costMoneySum = costMoneySum + tripReports[i].tripCosts[k].costMoney;
                                totalCostSum = totalCostSum + tripReports[i].tripCosts[k].totalCost;

                                tripReports[i].tripCosts.trafficCostSum = trafficCostSum;
                                tripReports[i].tripCosts.stayCostSum = stayCostSum;
                                tripReports[i].tripCosts.costMoneySum = costMoneySum;
                                tripReports[i].tripCosts.totalCostSum = totalCostSum;
                            }
                        }

                    }



                    return {tripReports: tripReports};
                }
            }
        };
    });
}).call(this);
