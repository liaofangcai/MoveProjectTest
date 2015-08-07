(function() {
    define(["jquery", "underscore"], function($, _) {
        return {
            avoidLoadingHandlers: true,
            size: 'large',
            extend: {
                templateHelpers: function() {
                    var tripCosts = [],
                        selectedDataIds = this.feature.selectedDataIds;

                    //获取出差申请信息
                    $.ajax({
                        url: 'invoke/common-routers/get-trip-cost-by-id',
                        type: 'get',
                        async: false,
                        data: {
                            selectedDataIds: selectedDataIds
                        }
                    }).done(function(data) {
                        if(!_.isArray(data.tripCosts)){
                            tripCosts.push(data.tripCosts);
                        } else {
                            tripCosts = data.tripCosts;
                        }

                    });

                    return {tripCosts: tripCosts};
                }
            }
        };
    });
}).call(this);
