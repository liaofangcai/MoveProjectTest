(function() {
    define(["jquery", "underscore"], function($, _) {
        return {
            avoidLoadingHandlers: true,
            size: 'large',
            extend: {
                templateHelpers: function() {
                    var mettingrecords = [],
                        selectedDataIds = this.feature.selectedDataIds,
                        i, l,
                        approvalList = [];
                    if (this.feature.printData.length > 0) {
                        mettingrecords = this.feature.printData;
                    }else{
                        //获取出差申请信息
                        $.ajax({
                            url: 'invoke/scaffold/experiment/mettingrecord/get_interformation_sys',
                            type: 'get',
                            async: false,
                            data: {
                                selectedDataIds: selectedDataIds
                            }
                        }).done(function(data) {
                            if(!_.isArray(data.mettingrecords)){
                                mettingrecords.push(data.mettingrecords);
                            } else {
                                mettingrecords = data.mettingrecords;
                            }
                        });
                    }
                    return {mettingrecords: mettingrecords};
                }
            }
        };
    });
}).call(this);
