define([
        'jquery',
        'app/commons/export-excel.feature/export-excel-function',
        'app/commons/import-excel.feature/import-excel-function',
        'config'
], function($, exportUtil, importUtil, config){
  	return {
         //dialogType:add/edit/show, view:the current view, data:this dialog's data

        afterShowDialog: function(dialogType, view, data){
            var me = this
            //$('input[name= "salaryTotal"]', view.$el).attr('disabled', true)
             //获取jquery识别的控件名
            function getName(name){
                var inputName = 'input[name = ' + '"' + name + '"' +']'
                return inputName
            }
          
            //$(getName('attendeSalary'), view.$el).attr('disabled', true)

            //处理动态保留两位小数
            function saveFixedEvent(name){
                var inputName = getName(name)
                $(inputName, view.$el).change(function(){
                    $(inputName, view.$el).val(
                    Number($(inputName, view.$el).val()).toFixed(2));
                 })
            }
            //需要隐藏的控件
            function hideMenu(){
                var hideMenus = 'inpunt[name = "salaryTotal"],[name = "salaryTotal"],[name = "attendeSalary"],[name = "gradeReward"],[name = "gradeSalary"],[name = "shouldSalary"],[name = "tax"],[name = "realitySalary"]'
                $(hideMenus, view.$el).attr('disabled', true)
            }

            //要保留两位小数的控件
            function saveFixedByMenu(){
                saveFixedEvent("basicSalary")
                saveFixedEvent("levelSalary")
                saveFixedEvent("postSalary")
                saveFixedEvent("managerSalary")
                saveFixedEvent("gradeLines")
                saveFixedEvent("gradeLevel")
                saveFixedEvent("allowance")
                saveFixedEvent("other")
                saveFixedEvent("insuranceCom")
                saveFixedEvent("insuranceEmp")
                saveFixedEvent("accumulationFundCom")
                saveFixedEvent("accumulationFundEmp")
                saveFixedEvent("tax")
            }
            
            //用来处理个人所得税自动计算
            function taxHandler(salary, taxTag) {
                var taxSalary = salary - 3500
                if(taxSalary <= 0){
                    return 0.00
                }
                //不含税级距的计算方式（计算个人所得税）
                if (taxTag == 'uninclude') {
                     if(taxSalary <= 1455) {
                    return taxSalary * 0.03 
                    }
                    if(taxSalary>1455 && taxSalary<=4155) {
                        return taxSalary * 0.1 - 105
                    }
                    if(taxSalary>4155 && taxSalary<=7755) {
                        return taxSalary * 0.2 - 555
                    }
                    if(taxSalary>7755 && taxSalary<=27255) {
                        return taxSalary * 0.25 - 1005
                    }
                    if(taxSalary>27255 && taxSalary<=41255) {
                        return taxSalary * 0.30 - 2755
                    }
                    if(taxSalary>41255 && taxSalary<=57505) {
                        return taxSalary * 0.35 - 5505
                    }
                    if(taxSalary>57505) {
                        return taxSalary * 0.45 - 13505
                    }
                }
                //含税级距的计算方式（计算个人所得税）
                if (taxTag == 'include') {
                     if(taxSalary <= 1500) {
                    return taxSalary * 0.03 
                    }
                    if(taxSalary>1500 && taxSalary<=4500) {
                        return taxSalary * 0.1 - 105
                    }
                    if(taxSalary>4500 && taxSalary<=9000) {
                        return taxSalary * 0.2 - 555
                    }
                    if(taxSalary>9000 && taxSalary<=35000) {
                        return taxSalary * 0.25 - 1005
                    }
                    if(taxSalary>35000 && taxSalary<=55000) {
                        return taxSalary * 0.30 - 2755
                    }
                    if(taxSalary>55000 && taxSalary<=80000) {
                        return taxSalary * 0.35 - 5505
                    }
                    if(taxSalary>80000) {
                        return taxSalary * 0.45 - 13505
                    }
                }
            }

            //获取控件动态改变的值
            function getValueByInputName(name) {
                var inputName = getName(name)
                   return $(inputName, view.$el).val()
            }

            //要自动计算的控件
            function autoCountMenu() {
                //相关空间选择器的名字,使用的方案是监听所有与其计算结果相关的控件的值得变化
                var salaryTotalRelMenu  = 'input[name="basicSalary"],' + 
                                        '[name="levelSalary"],' + 
                                        '[name="postSalary"],' + 
                                        '[name="managerSalary"],' + 
                                        '[name="shouldWorks"],' + 
                                        '[name="realityWorks"],' +
                                        '[name="shouldWorks"],' + 
                                        '[name="realityWorks"],' +
                                        '[name="other"],' + 
                                        '[name="allowance"],' +
                                        '[name="gradeLevel"],' + 
                                        '[name="gradeLines"],' +
                                        '[name="accumulationFundEmp"],' + 
                                        '[name="insuranceEmp"]'

                $(salaryTotalRelMenu, view.$el).change(function() {
                    //工资总额计算 
                    $(getName('salaryTotal'), view.$el).val(
                        (Number(getValueByInputName('basicSalary')) + 
                        Number(getValueByInputName('levelSalary')) + 
                        Number(getValueByInputName('postSalary')) + 
                        Number(getValueByInputName('managerSalary'))).toFixed(2)
                    )
                    //考勤工资自动计算相关控件
                    $(getName('attendeSalary'), view.$el).val(
                        (Number(getValueByInputName('salaryTotal'))/
                        Number(getValueByInputName('shouldWorks')) * 
                        Number(getValueByInputName('realityWorks'))).toFixed(2)
                    )
                    //绩效奖自动计算
                    $(getName('gradeReward'), view.$el).val(
                        (Number(getValueByInputName('gradeLevel') - 1) * 
                        Number(getValueByInputName('gradeLines'))).toFixed(2)
                    )
                    //绩效工资自动计算
                    $(getName('gradeSalary'), view.$el).val(
                        (Number(getValueByInputName('attendeSalary')) + 
                        Number(getValueByInputName('gradeReward'))).toFixed(2)
                    )
                    //应付工资相关
                    $(getName('shouldSalary'), view.$el).val(
                        (Number(getValueByInputName('gradeSalary')) + 
                        Number(getValueByInputName('other')) +
                        Number(getValueByInputName('allowance'))).toFixed(2)
                    )
                    //个人所得税计算
                    $(getName('tax'), view.$el).val(
                        (taxHandler(
                            (Number(getValueByInputName('shouldSalary')) - 
                            Number(getValueByInputName('accumulationFundEmp')) -
                            Number(getValueByInputName('insuranceEmp'))),
                            config.taxTag
                        )).toFixed(2)
                    )
                    //实发工资自动计算
                    $(getName('realitySalary'), view.$el).val(
                        (Number(getValueByInputName('shouldSalary')) - 
                        Number(getValueByInputName('tax')) -
                        Number(getValueByInputName('accumulationFundEmp')) -
                        Number(getValueByInputName('insuranceEmp'))).toFixed(2)
                    )
                })
            }

            if('add' === dialogType){//在添加页面设置当前feature中存放的雇员信息

                //保留两位有效数值
                saveFixedByMenu()
                //隐藏控件
                hideMenu()
                //自动计算
                autoCountMenu()
                
            }
            if('show' === dialogType){//在添加页面设置当前feature中存放的雇员姓名
                me.feature.model.set('employeeInfo.empName', data.employeeInfo.empName);
            }
            if('edit' === dialogType){
                //保留两位有效数值
                saveFixedByMenu()
                //隐藏控件
                hideMenu()
                //自动计算
                autoCountMenu()
            }
            me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
        },

        handlers:{
            exportExcel: function(){
                var me = this;
                exportUtil.exportExcel(me)
            },
            downloadImportTemplate: function() {
                importUtil.downloadImportTemplate(this)
            },
            importXls: function(){
                    var commonImportFeature, importView, me, message, checkFlag, grid

                    me = this;
                    message = ''
                    checkFlag = false
                    grid = this.feature.views['grid:body'].components[0]
                    commonImportFeature = app.loadFeature('commons/import-excel', {container: '<div></div>', ignoreExists: true})

                    commonImportFeature.done(function(feature) {
                        importView = feature.views['common-import-view']
                        app.showDialog({
                            view: importView,
                            title: '导入 Excel',
                            onClose: function() {
                                feature.stop()
                            },
                            buttons: [{
                                label: '确定',
                                status: 'btn-primary',
                                fn: function() {
                                    data = importView.getFormData()
                                    if (undefined === data.attachment.id) {
                                        app.error('请选择要导入的 excel 文件, 注意: 支持的文件格式为 xls')
                                        return false
                                    }
                                    if(!data.attachment){
                                        app.error('请选择要导入的 excel 文件, 注意: 支持的文件格式为 xls')
                                        return false
                                    }else if(importView.isValid()){
                                        me.feature.request({
                                            url: 'import-excel',
                                            type: 'post',
                                            data: {attachment: data.attachment}
                                        }).done(function(result){
                                            if(result.repeatRowIdxes.length > 0 || result.failRowIdxes.length > 0){
                                                message += '共有 ' + (Number(result.repeatRowIdxes.length) + Number(result.failRowIdxes.length)) +' 行数据导入失败'

                                                if(result.repeatRowIdxes.length > 0){
                                                    message += ',第' + result.repeatRowIdxes.join(',') + '行数据重复'
                                                }
                                                if(result.failRowIdxes.length > 0){
                                                    message += ',第' + result.failRowIdxes.join(',') + '行数据验证失败'
                                                }
                                            }else{
                                                message += '共有 ' + result.successNum + ' 行数据导入成功'
                                                checkFlag = true
                                            }

                                            if(checkFlag === true){
                                                app.success(message)
                                                grid.refresh()
                                            }else{
                                                app.error(message)
                                            }
                                        })
                                    }
                                }
                            }]
                        })
                    })
                }
            }
        }
    }
)