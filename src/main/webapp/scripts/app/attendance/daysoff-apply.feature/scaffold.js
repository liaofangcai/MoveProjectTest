define([
    'jquery',
    'app/commons/export-excel.feature/export-excel-function',
    'app/commons/import-excel.feature/import-excel-function',
    'app/process/process-taskinfo.feature/process-taskinfo-function',
    'app/process/approval-history.feature/approval-history-function',
    'app/commons/approval-histories.feature/approval-histories-function'
], function ($, exportUtil, importUtil, processUtil, apprHisFuncUtil, approvalHistoriesUtil) {
    return {
      beforeShowDialog: function(dialogType, view){
          var me = this;
          //打开编辑页面前验证状态是否为初始或退回
          if ('edit' === dialogType) {
              var  grid = me.feature.views['grid:body'].components[0],
                   data = grid.getSelected()[0].toJSON();
              //流程状态（-2 : 审批完成, -1: 退回, 空或0: 初始, 其它: 审批中）
              if (null !== data.flowStatus && '' !== data.flowStatus && '0' !== data.flowStatus && '-1' !== data.flowStatus) {
                  app.error('请选择状态为初始或退回的记录');
                  return false;
              }
          }
          return true;
      },
      afterShowDialog: function(dialogType, view, data){
        var me = this;
        if ("add" == dialogType) {
              //取当前时间
              me.feature.request({
                  url: 'get-current-info',
                  type: 'get'
              }).done(function (result){
                  //默认当前时间和数量
                  me.feature.model.set('appliedDate', result.result.createdTime);
                  me.feature.model.set('applier', result.result.applier);
                  me.feature.model.set('department',result.result.department);
                  me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
              });

          } else if ("show" == dialogType) {
              me.feature.model.set('applier.realName', data.applier.realName);
          }
          me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
      },
      renderers: {
         modifyStatus: function(data, param, gridData) {
            var showApproHis, flowStatusMap, html, id;

            showApproHis = function(id){
                approvalHistoriesUtil.showApprovalHistories(this, id);
            };
            window.showApproHis = showApproHis;
            html = '<a href="javascript:void(0)" onclick="showApproHis(\'' + gridData.id + '\');"> ';

            flowStatusMap = {
                '-2': html + '审批完成</a>',
                '-1': html + '退回</a>',
                '0': '初始',
                '1': html + '审批中</a>',
                '2': html + '审批中</a>',
                '3': html + '审批中</a>'
            };

            return flowStatusMap[data] || html + '审批中</a>';
        }
    },
    handlers: {
        formStatusChanged: function(data, el) {
          var startDate = Date.parse(data.daysoffBeginDate),
              endTime = Date.parse(data.daysoffEndDate),
              beginHour, beginMinute,
              lastminute, lasthour, lastdate,
              startDay, endDay, startDateLasthour, startDateLastminute,
              endDateLasthour, endDateLastminute, lastTotalHour, lastTotalminute,
              workDayVal, remainder, divisor, weekendDay, nextDay,
              totalTime, msec, date = new Date(), date1 = new Date(), date2 = new Date();

              if(startDate != null && endTime != null){ //判断开始时间和结束时间都不为空
                 msec  = endTime.getTime() - startDate.getTime();
                 endDay = endTime.getDay();
                 startDay = startDate.getDay();

                if(msec > 0 && msec < 24*60*60*1000 && (endDay == startDay)){
                //开始时间小于结束时间并且在同一天
                  date.setFullYear(endTime.getFullYear());
                  date.setMonth(endTime.getMonth());
                  date.setDate(endTime.getDate());
                  date.setHours(13);
                  date.setMinutes(30);

                  date1.setFullYear(startDate.getFullYear());
                  date1.setMonth(startDate.getMonth());
                  date1.setDate(startDate.getDate());
                  date1.setHours(09);
                  date1.setMinutes(00);
                  if(endDay  != 0 && endDay !=6 ){//判断是不是周六周日

                      if(startDate.getTime() <= date1.getTime()){ //开始时间在9点之前

                        if(endTime.getHours() < 9){
                          lastdate = 0;
                          lasthour = 0;
                          lastminute = 0;
                        }else if(endTime.getHours() >= 18){ //结束时间在18点之后
                          lastdate = 1;
                          lasthour = 0;
                          lastminute = 0;
                        }else if( endTime.getHours() >= 9 && endTime.getHours() < 12 ){//结束时间在9点到12点之间
                          lastdate = 0;
                          lasthour  = endTime.getHours() - 9;
                          lastminute = endTime.getMinutes();
                        }else if(endTime.getHours() >= 12 && (endTime.getTime() <= date.getTime())){//结束时间在12点到13:30之间
                          lastdate    = 0;
                          lasthour    = 3;
                          lastminute  = 0;
                        }else{//结束时间在13:30到18:00之间
                          lastdate   = 0;
                          lasthour   = Math.floor((endTime.getTime() - date.getTime())%(24*3600*1000)/(3600*1000)) + 3;
                          lastminute = Math.floor((endTime.getTime() - date.getTime())%(3600*1000)/(60*1000)) + 1;
                        }
                       //开始时间在9点到12点之间的
                    }else if(startDate.getTime() > date1.getTime() && startDate.getHours() < 12){

                        if(endTime.getHours() < 12){
                          lastdate = 0;
                          lasthour =  Math.floor(msec%(24*3600*1000)/(3600*1000));
                          lastminute = Math.floor(msec%(3600*1000)/(60*1000));
                        }else if(endTime.getHours() >= 12 && (endTime.getTime() <= date.getTime())){
                          date.setHours(12);
                          date.setMinutes(00);
                          lastdate = 0;
                          lasthour = Math.floor((date.getTime() - startDate.getTime())%(24*3600*1000)/(3600*1000));
                          lastminute = Math.floor((date.getTime() - startDate.getTime())%(3600*1000)/(60*1000));

                        }else if(endTime.getHours() >= 18){

                          date.setHours(18);
                          date.setMinutes(00);
                          lastdate = 0;
                          lasthour =  Math.floor((date.getTime() - startDate.getTime() - 90*60*1000)%(24*3600*1000)/(3600*1000));
                          lastminute = Math.floor((date.getTime() - startDate.getTime() - 90*60*1000)%(3600*1000)/(60*1000));
                        }else{
                          lastdate = 0;
                          lasthour = Math.floor((endTime.getTime() - startDate.getTime() - 90*60*1000)%(24*3600*1000)/(3600*1000));
                          lastminute = Math.floor((endTime.getTime() - startDate.getTime() - 90*60*1000)%(3600*1000)/(60*1000));
                        }

                      //开始时间在12点到13:30之间的
                    }else if(startDate.getHours() >= 12 && (startDate.getTime() <= date.getTime())){

                        if(endTime.getHours() >= 12 && (endTime.getTime() <= date.getTime())){
                          lastdate = 0;
                          lasthour = 0;
                          lastminute = 0;
                        }else if(endTime.getHours()>=18){
                          lastdate = 0;
                          lasthour = 4;
                          lastminute = 30;
                        }else{
                          date.setHours(13);
                          date.setMinutes(29);
                          lastdate = 0;
                          lasthour = Math.floor((endTime.getTime() - date.getTime())%(24*3600*1000)/(3600*1000));
                          lastminute = Math.floor((endTime.getTime() - date.getTime())%(3600*1000)/(60*1000));
                        }

                    }else if(startDate.getHours() > 18){//开始时间在18：00之后的
                      lastdate = 0;
                      lasthour = 0;
                      lastminute = 0;
                    }else{  //开始时间在13：30到18：00之间的

                      if(endTime.getHours() >= 18){//结束时间大于18:00的
                        date.setHours(18);
                        date.setMinutes(00);
                        lastdate = 0;
                        lasthour = Math.floor((date.getTime() - startDate.getTime())%(24*3600*1000)/(3600*1000));
                        lastminute = Math.floor((date.getTime() - startDate.getTime())%(3600*1000)/(60*1000));
                      }else{//结束时间小于18:00的
                        lastdate = 0;
                        lasthour = Math.floor((endTime.getTime() - startDate.getTime())%(24*3600*1000)/(3600*1000));
                        lastminute = Math.floor((endTime.getTime() - startDate.getTime())%(3600*1000)/(60*1000));
                      }
                  }
                  $('input[name= "totalTime"]').val(lastdate + "天" + lasthour + "小时" + lastminute + "分钟");
                }else{
                  $('input[name= "totalTime"]').val(0);
                }

              }else if(msec>0 && (startDate.getDate() != endTime.getDate() || startDay != endDay)){//请假时间不在同一天
                    date1.setFullYear(startDate.getFullYear());
                    date1.setMonth(startDate.getMonth());
                    date1.setDate(startDate.getDate());
                    date1.setHours(00);
                    date1.setMinutes(00);

                    date2.setFullYear(endTime.getFullYear());
                    date2.setMonth(endTime.getMonth());
                    date2.setDate(endTime.getDate());
                    date2.setHours(00);
                    date2.setMinutes(00);
                    msec = date2.getTime() - date1.getTime();

                    workDayVal =  Math.floor(msec / (24 * 60 * 60 * 1000));

                    remainder  =  workDayVal%7;              //除以7取余表示剩下的天数
                    divisor    =  Math.floor(workDayVal/7); //取整，表示中间隔了几周
                    weekendDay =  2 * divisor;             //表示请假期间度过的周末数量

                    for(var i = 0; i < remainder; i ++){//循环处理余下的天数有多少个周六或者周日（最多出现一个周六或者一个周日）
                      if(((startDay + i)==6)||((startDay + i)==0)||((startDay + i)==7)){
                          weekendDay = weekendDay + 1;
                      }
                    }

                    lastdate = workDayVal - weekendDay;
                    //计算开始请假当天 所剩余请假时间；
                    if(startDay == 0 || startDay == 6){//开始时间是周末
                      startDateLasthour = 0;
                      startDateLastminute = 0;
                      //开始请假当天的请假时间为0

                    }else{//开始时间不是周末
                      date.setFullYear(startDate.getFullYear());
                      date.setMonth(startDate.getMonth());
                      date.setDate(startDate.getDate());
                      date.setHours(13);
                      date.setMinutes(30);
                      if(startDate.getHours()<9){//开始时间在9点之前

                        startDateLasthour = 7;
                        startDateLastminute = 30;
                      }else if(startDate.getHours() >= 9 && startDate.getHours() < 12){
                        date.setHours(12);
                        date.setMinutes(00);
                        startDateLasthour = Math.floor((date.getTime() - startDate.getTime())%(24*3600*1000)/(3600*1000)) + 4;
                        startDateLastminute = Math.floor((date.getTime() - startDate.getTime())%(3600*1000)/(60*1000)) + 30;
                      }else if(startDate.getHours() >= 12 && date.getTime() >= startDate.getTime()){
                          startDateLasthour = 4;
                          startDateLastminute = 30;
                      }else if(startDate.getHours() >= 18){
                          startDateLasthour = 0;
                          startDateLastminute = 0;
                      }else{
                          date.setHours(18);
                          date.setMinutes(00);
                          startDateLasthour =  Math.floor((date.getTime() - startDate.getTime())%(24*3600*1000)/(3600*1000));
                          startDateLastminute = Math.floor((date.getTime() - startDate.getTime())%(3600*1000)/(60*1000));
                      }
                    }
                      //计算请假结束当天的请假时间
                    if(endDay == 0 || endDay == 6){//结束时间是周末

                      endTimeLasthour = 0;
                      endTimeLastminute = 0;

                      //结束请假当天的请假时间为0
                    }else{//结束时间不是周末

                      date.setFullYear(endTime.getFullYear());
                      date.setMonth(endTime.getMonth());
                      date.setDate(endTime.getDate());
                      date.setHours(13);
                      date.setMinutes(30);
                      if(endTime.getHours()<9){//结束时间在9点之前
                        endTimeLasthour = 0;
                        endTimeLastminute = 0;
                      }else if(endTime.getHours() >= 9 && endTime.getHours() < 12){
                        endTimeLasthour = endTime.getHours() - 9;
                        endTimeLastminute = endTime.getMinutes();

                      }else if(endTime.getHours() >= 12 && date.getTime() >= endTime.getTime()){
                          endTimeLasthour = 3;
                          endTimeLastminute = 0;

                      }else if(endTime.getHours() >= 18){
                          endTimeLasthour = 7;
                          endTimeLastminute = 30;
                      }else if(endTime.getHours()<18 && date.getTime() < endTime.getTime()){
                          endTimeLasthour =  Math.floor((endTime.getTime()-date.getTime())%(24*3600*1000)/(3600*1000)) + 3;
                          endTimeLastminute =Math.floor((endTime.getTime()-date.getTime())%(3600*1000)/(60*1000))+ 1;
                      }
                  }
                      lastTotalminute = endTimeLastminute +  startDateLastminute;

                      lastTotalHour = endTimeLasthour + startDateLasthour;

                      if((lastTotalminute + lastTotalHour * 60) ==  7.5 * 60 * 2){
                        lastdate = lastdate + 1;
                        lasthour = 0;
                        lastminute = 0;
                      }else if((lastTotalminute + lastTotalHour * 60) < 7.5 * 60 && (lastTotalminute + lastTotalHour * 60) > 0){
                        lastdate = lastdate - 1;
                        lasthour = Math.floor((lastTotalHour * 60 + lastTotalminute) / 60);
                        lastminute = (lastTotalHour * 60 + lastTotalminute) % 60;
                      }else if((lastTotalminute + lastTotalHour * 60) == 7.5 * 60 ){
                        lastminute = 0;
                        lasthour = 0;
                      }else if((lastTotalminute + lastTotalHour * 60) == 0){
                        lastdate = lastdate - 1;
                        lasthour = 0;
                        lastminute = 0;
                      }else{
                        lasthour = Math.floor((lastTotalHour * 60 + lastTotalminute - 7.5 * 60) / 60);
                        lastminute = (lastTotalHour * 60 + lastTotalminute - 7.5 * 60) % 60;
                      }

                    $('input[name= "totalTime"]').val(lastdate + "天" + lasthour + "小时" + lastminute + "分钟");
                }else{
                  $('input[name= "totalTime"]').val(0);
                }
            }else{
               $('input[name= "totalTime"]').val(0);
            }
        },
        retrieve: function(){
            var me = this;

            processUtil.retrieve(me);
        },
        beforeDel: function (gridView, grid, selected) {
            //流程状态（-2 : 审批完成, -1: 退回, 空或0: 初始, 其它: 审批中）
            if ('0' !== selected.flowStatus && '-1' !== selected.flowStatus) {
                app.error('请选择状态为初始或退回的记录');
                return false;
            }
            return true;
        },
        sendProcess: function(){
            var me = this,
                businessName = '调休申请';

            processUtil.sendProcess(me, businessName);
        },
        accountPickerCallback: function(v, entity){
            //进入编辑界面，初始化 picker 数据后赋值
            $('input[name="applier.accountName"]', v.$el).val(entity.accountName);
        },
        afterAccountPickerConfirm: function(v, entity){
            //点击picker，选取数据后赋值
            $('input[name="applier.accountName"]', v.$el).val(entity.accountName);
        },
        exportExcel: function(){
            var me = this;
            exportUtil.exportExcel(me);
        },
        downloadImportTemplate: function() {
            importUtil.downloadImportTemplate(this);
        },
        importXls: function(){
            var commonImportFeature, importView, me, message, checkFlag, grid;

            me = this;
            message = '';
            checkFlag = false;
            grid = this.feature.views['grid:body'].components[0];
            commonImportFeature = app.loadFeature('commons/import-excel', {container: '<div></div>', ignoreExists: true});

            commonImportFeature.done(function(feature) {
                importView = feature.views['common-import-view'];
                app.showDialog({
                    view: importView,
                    title: '导入 Excel',
                    onClose: function() {
                        feature.stop();
                    },
                    buttons: [{
                        label: '确定',
                        status: 'btn-primary',
                        fn: function() {
                            data = importView.getFormData();
                            if (undefined === data.attachment.id) {
                                app.error('请选择要导入的 excel 文件, 注意: 支持的文件格式为 xls');
                                return false;
                            }
                            if(!data.attachment){
                                app.error('请选择要导入的 excel 文件, 注意: 支持的文件格式为 xls');
                                return false;
                            }else if(importView.isValid()){
                                me.feature.request({
                                    url: 'import-excel',
                                    type: 'post',
                                    data: {attachment: data.attachment}
                                }).done(function(result){
                                    if(result.repeatRowIdxes.length > 0 || result.failRowIdxes.length > 0){
                                        message += '共有 ' + (Number(result.repeatRowIdxes.length) + Number(result.failRowIdxes.length)) +' 行数据导入失败';

                                        if(result.repeatRowIdxes.length > 0){
                                            message += ',第' + result.repeatRowIdxes.join(',') + '行数据重复';
                                        }
                                        if(result.failRowIdxes.length > 0){
                                            message += ',第' + result.failRowIdxes.join(',') + '行数据验证失败';
                                        }
                                    }else{
                                        message += '共有 ' + result.successNum + ' 行数据导入成功';
                                        checkFlag = true;
                                    }

                                    if(checkFlag === true){
                                        app.success(message);
                                        grid.refresh();
                                    }else{
                                        app.error(message);
                                    }
                                });
                            }
                        }
                    }]
                });
            });
        },
    }
  }
})
