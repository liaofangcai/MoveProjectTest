define([
    'jquery',
    'scripts/cdeio/vendors/jquery/jquery.magnific-popup.js'
], function($) {
    return {
        showEditInfoDialog: function() {
            var app = this.feature.module.getApplication(), me = this, id = me.model.id;
            if (!me.accountFeature) {
                me.accountFeature = app.loadFeature('system/scaffold:accounts');
            }
            me.accountFeature.done(function(feature) {
                var view = feature.views['form:edit'];
                feature.model.set('id', id);
                feature.model.fetch().done(function() {
                    app.showDialog({
                        view: view,
                        title: '编辑帐户',
                        buttons: [{
                            label: '确定',
                            status: 'btn-primary',
                            fn: function() {
                                view.submit({id: id}).done(function() {
                                    app.success('修改信息成功');
                                });
                            }
                        }]
                    }).done(function() {
                        view.setFormData(feature.model.toJSON());
                    });
                });
            });
        },
        showChangePasswordDialog: function() {
            var app = this.feature.module.getApplication(), me = this, id = me.model.id;
            if (!me.accountFeature) {
                me.accountFeature = app.loadFeature('system/scaffold:accounts');
            }
            me.accountFeature.done(function(feature) {
                var view = feature.views['form:changePassword'];
                app.showDialog({
                    view: view,
                    title: '修改密码',
                    buttons: [{
                        label: '确定',
                        status: 'btn-primary',
                        fn: function() {
                            data = view.getFormData();
                            data.id = id;
                            if(view.isValid()){
                                feature.request({url: 'password', type: 'put', data: data, success: function(d) {
                                    app.success('密码修改成功');
                                }});
                            }else{
                                return false;
                            }
                        }
                    }]
                });
            });
        }
    };
});
