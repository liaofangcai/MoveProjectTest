  define([
        'jquery',
        'app/commons/export-excel.feature/export-excel-function',
        'app/commons/import-excel.feature/import-excel-function'
  ], function($, exportUtil, importUtil){
    return {
         //dialogType:add/edit/show, view:the current view, data:this dialog's data

        afterShowDialog: function(dialogType, view, data){
            var me, currentDepartment,
            agreementDate = data.agreementDate,
            agreementLast = data.agreementLast,
            endYear, endMonth,endDay,
            workYear, workMonth, workDay, entryTime,
            msec,
            date = new Date();

            me = this;
            currentDepartment = me.feature.department;

            if('add' === dialogType){//在添加页面设置当前feature中存放的部门
                view.setFormData({department: currentDepartment});
                $('input[name = "agreementEnd"]', view.$el).attr('disabled',true);
                $('input[name = "seniority"]', view.$el).attr('disabled',true);

            }
            if('show' === dialogType){
                entryTime = new Date(data.entryTime);
                msec    = (date.getTime()-entryTime.getTime());
                workYear  = Math.floor(msec/(365*24*3600*1000));
                workMonth = Math.floor(msec%(365*24*3600*1000)/(30*24*3600*1000));
                workDay   = Math.floor(msec%(30*24*3600*1000)/(24*3600*1000)) + 1;
                me.feature.model.set('seniority', workYear + "年" + workMonth + "月" + workDay + "天");
                // $('input[name= "seniority"]').val(workYear + "年" + workMonth + "月" + workDay + "天");
            }
            if('edit' === dialogType){
                if(!agreementLast.length == 0 && !agreementDate.length == 0){

                    agreementDate = new Date(agreementDate);
                    endYear  = agreementDate.getFullYear();
                    endYear  = endYear + parseInt(agreementLast);
                    endMonth = agreementDate.getMonth() + 1;
                    if(endMonth<10){
                        endMonth = "0" + endMonth;
                    }
                    endDay = agreementDate.getDate() - 1;
                    $('input[name= "agreementEnd"]').val(endYear + "-" + endMonth + "-" + endDay);
                }
                entryTime = new Date(data.entryTime);
                msec    = (date.getTime()-entryTime.getTime());
                workYear  = Math.floor(msec/(365*24*3600*1000));
                workMonth = Math.floor(msec%(365*24*3600*1000)/(30*24*3600*1000));
                workDay   = Math.floor(msec%(30*24*3600*1000)/(24*3600*1000)) + 1;

                $('input[name = "agreementEnd"]', view.$el).attr('disabled',true);
                $('input[name = "seniority"]', view.$el).attr('disabled',true);
                me.feature.model.set('seniority', workYear + "年" + workMonth + "月" + workDay + "天");
                // $('input[name= "seniority"]').val(workYear + "年" + workMonth + "月" + workDay + "天");
            }
            // 打开form页面时，页面第一个可输入元素获提焦点
            if('show'!== dialogType){
                $('input[name]', view.$el)[0].focus();
            }
            me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
        },
        renderers:{
            modifyLeaved: function(data, param, gridData) {
                var flowStatusMap;
                flowStatusMap = {
                    'true': '在职',
                    'false': '离职'
                };
                return flowStatusMap[data];
            },
        },
        handlers:{
            departmentChanged: function(feature, view, tree, e, treeId, treeNode) {
                var me = this,
                    grid,
                    defaultFilters;

                grid = this.feature.views['grid:body'].components[0];
                defaultFilters = ['like', 'department.path', treeNode.path || '', { mode: 'start' }];
                if (treeNode.isRoot) {
                    //当前节点是根节点时清除存放在feature中的部门
                    me.feature.department = null;
                    grid.removeFilter(defaultFilters);

                } else {
                    //当前节点不是根节点时所选择的部门存放到feature中以便在添加页面可以重复使用
                    me.feature.department = treeNode;
                    grid.addFilter(defaultFilters);
                }

                grid.refresh();
            },
            leave: function(){
                var me = this,
                    formData,
                    grid = me.feature.views['grid:body'].components[0],
                    data = grid.getSelected()[0].toJSON(),
                    view = me.feature.views['form:leave'];
                if(!data.whetherLeaved){
                   app.error('该员工已经离职');
                   return false;
                };
                app.showDialog({
                    view: view,
                    title: '员工离职办理',
                    buttons: [{
                        label: '确定',
                        status: 'btn-primary',
                        fn: function() {
                            if(!view.isValid()){
                                return false;
                            }
                            formData = view.getFormData();
                            formData.employeeInfoId = data.id;

                            me.feature.request({
                                url: 'emp-leave',
                                type: 'post',
                                data: formData,
                                success: function(result){
                                    grid.refresh();
                                    app.success('员工离职办理成功！');
                                }
                            });
                        }
                    }]
                }).done(function (dialog) {
                    $('input[name = "empName"]', view.$el).attr('disabled', true);
                    $('input[name = "membership"]', view.$el).attr('disabled', true);

                    $('input[name = "empName"]', view.$el).val(data.empName);
                    $('input[name = "membership"]', view.$el).val(data.membership);
                    // $('input[name = "leaveDate"]'), view.$el).val(new Date())
                });
            },
            formStatusChanged: function(data, el) {
                var agreementDate = data.agreementDate,
                    agreementLast = data.agreementLast,
                    idNum = data.idNum,
                    entryTime = data.entryTime,
                    endYear, endMonth,endDay,
                    workYear,workMonth,workDay,
                    birthYear,birthMonth,birthDay,
                    msec,
                    date = new Date();


                if(!agreementLast.length == 0 && !agreementDate.length == 0){

                    agreementDate = new Date(agreementDate);
                    endYear  = agreementDate.getFullYear();
                    endYear  = endYear + parseInt(agreementLast);
                    endMonth = agreementDate.getMonth() + 1;
                    if(endMonth<10){
                        endMonth = "0" + endMonth;
                    }
                    endDay = agreementDate.getDate() - 1;
                    $('input[name= "agreementEnd"]').val(endYear + "-" + endMonth + "-" + endDay);
                }
                if(!entryTime.length == 0){
                    entryTime = new Date(entryTime);
                    if(date.getTime()-entryTime.getTime()>0){
                        msec    = (date.getTime()-entryTime.getTime());
                        workYear  = Math.floor(msec/(365*24*3600*1000));
                        workMonth = Math.floor(msec%(365*24*3600*1000)/(30*24*3600*1000));
                        workDay   = Math.floor(msec%(30*24*3600*1000)/(24*3600*1000)) + 1;
                        $('input[name= "seniority"]').val(workYear + "年" + workMonth + "月" + workDay + "天");
                    }else{
                        $('input[name= "seniority"]').val(0);
                    }
                }
                if(idNum.length == 18){
                    birthYear  = idNum.substr(6,4);
                    birthMonth = idNum.substr(10,2);
                    birthDay   = idNum.substr(12,2);
                    $('input[name= "birthday"]').val(birthYear + "-" + birthMonth + "-" + birthDay);
                }
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
            }
        }
    };
});
