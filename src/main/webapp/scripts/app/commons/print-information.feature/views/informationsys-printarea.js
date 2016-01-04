(function() {
    define(["jquery", "underscore"], function($, _) {
        return {
            avoidLoadingHandlers: true,
            size: 'large',
            extend: {
                templateHelpers: function() {
                    var informations = [],
                        selectedDataIds = this.feature.selectedDataIds,
                        i, l,
                        approvalList = [];

                    if (this.feature.printData.length > 0) {
                        informations = this.feature.printData;
                    }else{
                        //获取出差申请信息
                        $.ajax({
                            url: 'invoke/scaffold/experiment/interformation/get_interformation_sys',
                            type: 'get',
                            async: false,
                            data: {
                                selectedDataIds: selectedDataIds
                            }
                        }).done(function(data) {
                            if(!_.isArray(data.informations)){
                                informations.push(data.informations);
                            } else {
                                informations = data.informations;
                            }
                        });
                    }
                    return {informations: informations};
                }
            }
        };
    });
}).call(this);
