define({
    layout: {
        regions: {
            content: 'content',
            editInfoForm: 'edit-info-form'
        }
    },
    views: [{
        name: 'inline:content',
        region: 'content',
        model: 'about',
        extend: {
            serializeData: function(_super) {
                var deferred = $.Deferred();
                var m = this.model;
                var data = _super.apply(this);
                m.fetch().done(function() {
                    data.info = m.toJSON();
                    deferred.resolve(data);
                });
                return deferred.promise();
            }
        },
        events: {
            'click edit-info-btn': 'showEditInfoDialog',
            'click change-password-btn': 'showChangePasswordDialog'
        }
    }, {
        name: 'inline:edit-info-form',
        region: 'editInfoForm',
        avoidLoadingHandlers: true,
        type: 'form-view',
        labelOnTop: true,
        fieldGroups: {
            group1: [
                {name: 'realName', label: '姓名 *'},
                {name: 'email', type: 'email', label: '电子邮件 *'},
                {name: 'mobile', type: 'mask', pattern: '199-9999-9999', label: '手机 *'},
                {name: 'telephone', label: '座机'}
            ]
        },
        form: {
            groups: {name: 'group1', columns: 2}
        },
        validation: {
            rules: {
                realName: 'required',
                email: 'required',
                mobile: 'required'
            },
            messages: {
                realName: { required: '必填字段' },
                email: { required: '必填字段' },
                mobile: { required: '必填字段' }
            }
        }
    }],
    extend: {
        onStart: function(_super) {
            app.viewport = this;

            app.config.featureContainer = this.layout.$('content');

            app.startFeature('commons/header', { container: this.layout.$('header'), ignoreExists: true }).done(function(headerFeature) {
                app.startFeature('profile/account-menu', { container: headerFeature.views['inline:inner-header'].$('notification'), ignoreExists: true });
            });
        },

        onStop: function(_super) {
            app.findModule('commons').findFeature('header').stop();
            app.findModule('profile').findFeature('account-menu').stop();
        }
    }
});
