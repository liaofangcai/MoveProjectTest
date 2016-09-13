 define([
        'jquery',
        'app/commons/export-excel.feature/export-excel-function',
        'app/commons/import-excel.feature/import-excel-function'
  ], function($, exportUtil, importUtil){
  		return {
         //dialogType:add/edit/show, view:the current view, data:this dialog's data

        afterShowDialog: function(dialogType, view, data){
            var me, currentEmployeeInfo,
            // agreementDate = data.agreementDate,
            // agreementLast = data.agreementLast,
            // endYear, endMonth,endDay,
            // workYear, workMonth, workDay, entryTime,
            // msec,
            // date = new Date();

            me = this;
            currentEmployeeInfo = me.feature.employeeInfo
            console.log('dialogType')
            if('add' === dialogType){//在添加页面设置当前feature中存放的部门
                view.setFormData({employeeInfo: currentEmployeeInfo})
                
                // $('input[name = "agreementEnd"]', view.$el).attr('disabled',true);
                // $('input[name = "seniority"]', view.$el).attr('disabled',true);

            }
            // if('show' === dialogType){
            //     entryTime = new Date(data.entryTime);
            //     msec    = (date.getTime()-entryTime.getTime());
            //     workYear  = Math.floor(msec/(365*24*3600*1000));
            //     workMonth = Math.floor(msec%(365*24*3600*1000)/(30*24*3600*1000));
            //     workDay   = Math.floor(msec%(30*24*3600*1000)/(24*3600*1000)) + 1;
            //     me.feature.model.set('seniority', workYear + "年" + workMonth + "月" + workDay + "天");
            //     // $('input[name= "seniority"]').val(workYear + "年" + workMonth + "月" + workDay + "天");
            // }
            // if('edit' === dialogType){
            //     if(!agreementLast.length == 0 && !agreementDate.length == 0){

            //         agreementDate = new Date(agreementDate);
            //         endYear  = agreementDate.getFullYear();
            //         endYear  = endYear + parseInt(agreementLast);
            //         endMonth = agreementDate.getMonth() + 1;
            //         if(endMonth<10){
            //             endMonth = "0" + endMonth;
            //         }
            //         endDay = agreementDate.getDate() - 1;
            //         $('input[name= "agreementEnd"]').val(endYear + "-" + endMonth + "-" + endDay);
            //     }
            //     entryTime = new Date(data.entryTime);
            //     msec    = (date.getTime()-entryTime.getTime());
            //     workYear  = Math.floor(msec/(365*24*3600*1000));
            //     workMonth = Math.floor(msec%(365*24*3600*1000)/(30*24*3600*1000));
            //     workDay   = Math.floor(msec%(30*24*3600*1000)/(24*3600*1000)) + 1;

            //     $('input[name = "agreementEnd"]', view.$el).attr('disabled',true);
            //     $('input[name = "seniority"]', view.$el).attr('disabled',true);
            //     me.feature.model.set('seniority', workYear + "年" + workMonth + "月" + workDay + "天");
            //     // $('input[name= "seniority"]').val(workYear + "年" + workMonth + "月" + workDay + "天");
            // }
            // // 打开form页面时，页面第一个可输入元素获提焦点
            // if('show'!== dialogType){
            //     $('input[name]', view.$el)[0].focus();
            // }
            // me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
        }
    }
  })