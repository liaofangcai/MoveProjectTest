define([
    'jquery'
], function ($) {
    return {
        afterShowDialog: function(dialogType, view, data){
            var me = this;
            $('input[name="total"]', view.$el).attr('disabled', true);
            if ("add" == dialogType) {
                //取当前时间
                me.feature.request({
                    url: 'get-current-info',
                    type: 'get'
                }).done(function (result){
                    //默认当前时间和数量
                    me.feature.model.set('writeDate', result.result.createdTime);
                    // console.log(result.result.department.name);
                    if(result.result.department){
                       me.feature.model.set('department',result.result.department);
                    }
                    me.feature.model.set('writer', result.result.applier.realName);
                    me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
                });
            }
            me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
        },
        afterShowInlineGridDialog: function(dialogType, view, data){
            var january, february, march, april, may, june, july, august, september, october, november,december;

            $('input[name = "january"]',view.$el).change(function(){
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name="january"]', view.$el).val())
                    + Number($('input[name="february"]', view.$el).val())
                    + Number($('input[name="march"]', view.$el).val())
                    + Number($('input[name="april"]', view.$el).val())
                    + Number($('input[name="may"]', view.$el).val())
                    + Number($('input[name="june"]', view.$el).val())
                    + Number($('input[name="july"]', view.$el).val())
                    + Number($('input[name="august"]', view.$el).val())
                    + Number($('input[name="september"]', view.$el).val())
                    + Number($('input[name="october"]', view.$el).val())
                    + Number($('input[name="november"]', view.$el).val())
                    + Number($('input[name="december"]', view.$el).val())
                );
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name = "total"]', view.$el).val()).toFixed(2));
                $('input[name = "january"]', view.$el).val(
                        Number($('input[name = "january"]', view.$el).val()).toFixed(2));
            });
            $('input[name = "february"]',view.$el).change(function(){
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name="january"]', view.$el).val())
                    + Number($('input[name="february"]', view.$el).val())
                    + Number($('input[name="march"]', view.$el).val())
                    + Number($('input[name="april"]', view.$el).val())
                    + Number($('input[name="may"]', view.$el).val())
                    + Number($('input[name="june"]', view.$el).val())
                    + Number($('input[name="july"]', view.$el).val())
                    + Number($('input[name="august"]', view.$el).val())
                    + Number($('input[name="september"]', view.$el).val())
                    + Number($('input[name="october"]', view.$el).val())
                    + Number($('input[name="november"]', view.$el).val())
                    + Number($('input[name="december"]', view.$el).val())
                );
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name = "total"]', view.$el).val()).toFixed(2));
                $('input[name = "february"]', view.$el).val(
                        Number($('input[name = "february"]', view.$el).val()).toFixed(2));
            });
            $('input[name = "march"]',view.$el).change(function(){
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name="january"]', view.$el).val())
                    + Number($('input[name="february"]', view.$el).val())
                    + Number($('input[name="march"]', view.$el).val())
                    + Number($('input[name="april"]', view.$el).val())
                    + Number($('input[name="may"]', view.$el).val())
                    + Number($('input[name="june"]', view.$el).val())
                    + Number($('input[name="july"]', view.$el).val())
                    + Number($('input[name="august"]', view.$el).val())
                    + Number($('input[name="september"]', view.$el).val())
                    + Number($('input[name="october"]', view.$el).val())
                    + Number($('input[name="november"]', view.$el).val())
                    + Number($('input[name="december"]', view.$el).val())
                );
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name = "total"]', view.$el).val()).toFixed(2));
                $('input[name = "march"]', view.$el).val(
                        Number($('input[name = "march"]', view.$el).val()).toFixed(2));
            });
            $('input[name = "april"]',view.$el).change(function(){
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name="january"]', view.$el).val())
                    + Number($('input[name="february"]', view.$el).val())
                    + Number($('input[name="march"]', view.$el).val())
                    + Number($('input[name="april"]', view.$el).val())
                    + Number($('input[name="may"]', view.$el).val())
                    + Number($('input[name="june"]', view.$el).val())
                    + Number($('input[name="july"]', view.$el).val())
                    + Number($('input[name="august"]', view.$el).val())
                    + Number($('input[name="september"]', view.$el).val())
                    + Number($('input[name="october"]', view.$el).val())
                    + Number($('input[name="november"]', view.$el).val())
                    + Number($('input[name="december"]', view.$el).val())
                );
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name = "total"]', view.$el).val()).toFixed(2));
                $('input[name = "april"]', view.$el).val(
                        Number($('input[name = "april"]', view.$el).val()).toFixed(2));
            });
            $('input[name = "may"]',view.$el).change(function(){
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name="january"]', view.$el).val())
                    + Number($('input[name="february"]', view.$el).val())
                    + Number($('input[name="march"]', view.$el).val())
                    + Number($('input[name="april"]', view.$el).val())
                    + Number($('input[name="may"]', view.$el).val())
                    + Number($('input[name="june"]', view.$el).val())
                    + Number($('input[name="july"]', view.$el).val())
                    + Number($('input[name="august"]', view.$el).val())
                    + Number($('input[name="september"]', view.$el).val())
                    + Number($('input[name="october"]', view.$el).val())
                    + Number($('input[name="november"]', view.$el).val())
                    + Number($('input[name="december"]', view.$el).val())
                );
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name = "total"]', view.$el).val()).toFixed(2));
                $('input[name = "may"]', view.$el).val(
                        Number($('input[name = "may"]', view.$el).val()).toFixed(2));
            });
            $('input[name = "june"]',view.$el).change(function(){
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name="january"]', view.$el).val())
                    + Number($('input[name="february"]', view.$el).val())
                    + Number($('input[name="march"]', view.$el).val())
                    + Number($('input[name="april"]', view.$el).val())
                    + Number($('input[name="may"]', view.$el).val())
                    + Number($('input[name="june"]', view.$el).val())
                    + Number($('input[name="july"]', view.$el).val())
                    + Number($('input[name="august"]', view.$el).val())
                    + Number($('input[name="september"]', view.$el).val())
                    + Number($('input[name="october"]', view.$el).val())
                    + Number($('input[name="november"]', view.$el).val())
                    + Number($('input[name="december"]', view.$el).val())
                );
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name = "total"]', view.$el).val()).toFixed(2));
                $('input[name = "june"]', view.$el).val(
                        Number($('input[name = "june"]', view.$el).val()).toFixed(2));
            });
            $('input[name = "july"]',view.$el).change(function(){
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name="january"]', view.$el).val())
                    + Number($('input[name="february"]', view.$el).val())
                    + Number($('input[name="march"]', view.$el).val())
                    + Number($('input[name="april"]', view.$el).val())
                    + Number($('input[name="may"]', view.$el).val())
                    + Number($('input[name="june"]', view.$el).val())
                    + Number($('input[name="july"]', view.$el).val())
                    + Number($('input[name="august"]', view.$el).val())
                    + Number($('input[name="september"]', view.$el).val())
                    + Number($('input[name="october"]', view.$el).val())
                    + Number($('input[name="november"]', view.$el).val())
                    + Number($('input[name="december"]', view.$el).val())
                );
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name = "total"]', view.$el).val()).toFixed(2));
                $('input[name = "july"]', view.$el).val(
                        Number($('input[name = "july"]', view.$el).val()).toFixed(2));
            });
            $('input[name = "august"]',view.$el).change(function(){
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name="january"]', view.$el).val())
                    + Number($('input[name="february"]', view.$el).val())
                    + Number($('input[name="march"]', view.$el).val())
                    + Number($('input[name="april"]', view.$el).val())
                    + Number($('input[name="may"]', view.$el).val())
                    + Number($('input[name="june"]', view.$el).val())
                    + Number($('input[name="july"]', view.$el).val())
                    + Number($('input[name="august"]', view.$el).val())
                    + Number($('input[name="september"]', view.$el).val())
                    + Number($('input[name="october"]', view.$el).val())
                    + Number($('input[name="november"]', view.$el).val())
                    + Number($('input[name="december"]', view.$el).val())
                );
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name = "total"]', view.$el).val()).toFixed(2));
                $('input[name = "august"]', view.$el).val(
                        Number($('input[name = "august"]', view.$el).val()).toFixed(2));
            });
            $('input[name = "september"]',view.$el).change(function(){
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name="january"]', view.$el).val())
                    + Number($('input[name="february"]', view.$el).val())
                    + Number($('input[name="march"]', view.$el).val())
                    + Number($('input[name="april"]', view.$el).val())
                    + Number($('input[name="may"]', view.$el).val())
                    + Number($('input[name="june"]', view.$el).val())
                    + Number($('input[name="july"]', view.$el).val())
                    + Number($('input[name="august"]', view.$el).val())
                    + Number($('input[name="september"]', view.$el).val())
                    + Number($('input[name="october"]', view.$el).val())
                    + Number($('input[name="november"]', view.$el).val())
                    + Number($('input[name="december"]', view.$el).val())
                );
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name = "total"]', view.$el).val()).toFixed(2));
                $('input[name = "september"]', view.$el).val(
                        Number($('input[name = "september"]', view.$el).val()).toFixed(2));
            });
            $('input[name = "october"]',view.$el).change(function(){
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name="january"]', view.$el).val())
                    + Number($('input[name="february"]', view.$el).val())
                    + Number($('input[name="march"]', view.$el).val())
                    + Number($('input[name="april"]', view.$el).val())
                    + Number($('input[name="may"]', view.$el).val())
                    + Number($('input[name="june"]', view.$el).val())
                    + Number($('input[name="july"]', view.$el).val())
                    + Number($('input[name="august"]', view.$el).val())
                    + Number($('input[name="september"]', view.$el).val())
                    + Number($('input[name="october"]', view.$el).val())
                    + Number($('input[name="november"]', view.$el).val())
                    + Number($('input[name="december"]', view.$el).val())
                );
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name = "total"]', view.$el).val()).toFixed(2));
                $('input[name = "october"]', view.$el).val(
                        Number($('input[name = "october"]', view.$el).val()).toFixed(2));
            });
            $('input[name = "november"]',view.$el).change(function(){
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name="january"]', view.$el).val())
                    + Number($('input[name="february"]', view.$el).val())
                    + Number($('input[name="march"]', view.$el).val())
                    + Number($('input[name="april"]', view.$el).val())
                    + Number($('input[name="may"]', view.$el).val())
                    + Number($('input[name="june"]', view.$el).val())
                    + Number($('input[name="july"]', view.$el).val())
                    + Number($('input[name="august"]', view.$el).val())
                    + Number($('input[name="september"]', view.$el).val())
                    + Number($('input[name="october"]', view.$el).val())
                    + Number($('input[name="november"]', view.$el).val())
                    + Number($('input[name="december"]', view.$el).val())
                );
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name = "total"]', view.$el).val()).toFixed(2));
                $('input[name = "november"]', view.$el).val(
                        Number($('input[name = "november"]', view.$el).val()).toFixed(2));
            });
            $('input[name = "december"]',view.$el).change(function(){
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name="january"]', view.$el).val())
                    + Number($('input[name="february"]', view.$el).val())
                    + Number($('input[name="march"]', view.$el).val())
                    + Number($('input[name="april"]', view.$el).val())
                    + Number($('input[name="may"]', view.$el).val())
                    + Number($('input[name="june"]', view.$el).val())
                    + Number($('input[name="july"]', view.$el).val())
                    + Number($('input[name="august"]', view.$el).val())
                    + Number($('input[name="september"]', view.$el).val())
                    + Number($('input[name="october"]', view.$el).val())
                    + Number($('input[name="november"]', view.$el).val())
                    + Number($('input[name="december"]', view.$el).val())
                );
                $('input[name = "total"]', view.$el).val(
                    Number($('input[name = "total"]', view.$el).val()).toFixed(2));
                $('input[name = "december"]', view.$el).val(
                        Number($('input[name = "december"]', view.$el).val()).toFixed(2));
            });
            $('input[name="total"]', view.$el).attr('disabled', true);
        },
        afterInlineGridDialogConfirm: function(dialogType, view, beforeEditData, afterEditData){
            var me = view.feature.formView;
            if('add' == dialogType){
                $('input[name = "total"]', me.$el).val( Number($('input[name = "total"]', me.$el).val()) + Number(beforeEditData.total));
            }
            if('edit' == dialogType){
                $('input[name = "total"]', me.$el).val(Number($('input[name = "total"]', me.$el).val()) + (Number(afterEditData.total) - Number(beforeEditData.total)));
            }
        },

        handlers: {
            afterInlineGridRemove: function(grid, view, data){
                var i , total, totalSum;

                totalSum = 0;

                for(i = 0; i < data.length; i++) {
                    totalSum += data[i].total;
                }

                $('input[name = "total"]', view.$el).val(Number($('input[name = "total"]', view.$el).val()) - Number(totalSum));
            },
        }
    }
})
