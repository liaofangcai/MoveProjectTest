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
                    $('input[name= "empName"]', view.$el).attr('disabled', true);
                    $('input[name= "membership"]', view.$el).attr('disabled', true);

                    $('input[name= "empName"]', view.$el).val(data.empName);
                    $('input[name= "membership"]', view.$el).val(data.membership);
                });
            },
            formStatusChanged: function(data, el) {
                var agreementDate = data.agreementDate,
                    agreementLast = data.agreementLast,
                    year, month, day;


                if (agreementDate.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/) == null || agreementDate.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/) == null) {
                    app.error('请输入正确的日期格式！');
                }else {
                    agreementDate = new Date(agreementDate);
                    year  = agreementDate.getFullYear();
                    if(agreementLast.length == 0){
                        agreementLast = 0;
                    }
                    year  = year + parseInt(agreementLast);

                    month = agreementDate.getMonth() + 1;
                    if(month<10){
                        month = "0" + month;
                    }
                    day   = agreementDate.getDate();

                    $('input[name= "agreementEnd"]').val(year + "-" + month + "-" + day);
                }
            }

        }

    }

});
