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
                        $.ajax({
                            url: 'invoke/scaffold/experiment/Informationsystem/get-researchdemand-by-id',
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
                    return {tripApplys: tripApplys};
                }
            }
        };
    });
}).call(this);
