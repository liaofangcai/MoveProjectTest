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
              lastdate,lasthour,lastminute,msec;

          if( startDate != null && endTime != null){

              if(endTime.getTime()-startDate.getTime()>0){

                msec       = (endTime.getTime()-startDate.getTime());
                lastdate   = Math.floor(msec%(30*24*3600*1000)/(24*3600*1000));
                lasthour   = Math.floor(msec%(24*3600*1000)/(3600*1000));
                lastminute = Math.floor(msec%(3600*1000)/(60*1000));
                $('input[name= "totalTime"]').val(lastdate + "天" + lasthour + "小时" + lastminute + "分钟");
              }else{
                  $('input[name= "totalTime"]').val(0);
              }
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
