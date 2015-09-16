  define([
      'jquery'
  ],function($){
    return{
         //dialogType:add/edit/show, view:the current view, data:this dialog's data
        afterShowDialog: function(dialogType, view, data){
            var me, currentDepartment;

            me = this;
            currentDepartment = me.feature.department;

            if('add' === dialogType){//在添加页面设置当前feature中存放的部门
                view.setFormData({department: currentDepartment});
                $('input[name = "agreementEnd"]',view.$el).attr('disabled',true);
                $('input[name = "seniority"]',view.$el).attr('disabled',true);

            }

            // 打开form页面时，页面第一个可输入元素获提焦点
            if('show' !== dialogType){
                $('input[name]', view.$el)[0].focus();
            }
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
                if(data.whetherLeaved){
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
                    entryTime = data.entryTime,
                    endYear, endMonth,endDay,
                    workYear,workMonth,workDay,
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
            }
        }
    }
});
