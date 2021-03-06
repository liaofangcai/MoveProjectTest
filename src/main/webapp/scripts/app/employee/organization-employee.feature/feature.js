define({
    layout: {
        components: [{
            type: 'layout',
            onresize: function(paneName) {
                if (paneName === 'center') {
                    app.findModule('employee').findFeature('employee-info').views['grid:body'].components[0].fnAdjustColumnSizing();
                }
            },
            defaults: {
                spacing_open: 0,
                hideTogglerOnSlide: true
            },
            west: {
                size: 260,
                minSize: 260,
                spacing_open: 5
            },
            center: {
                findNestedContent: true
            }
        }],

        regions: {
            deptTree: 'dept-tree',
            employeeList: 'employee-list'
        }
    },

    views: [{
        name: 'inline:dept-tree',
        region: 'deptTree',
        avoidLoadingHandlers: true,
    }, {
        name: 'inline:employee-list',
        region: 'employeeList',
        avoidLoadingHandlers: true
    }],

    extend: {
        onStart: function(_super) {
            this.departmentDeferred = app.startFeature('system/scaffold:departments', { container: this.views['inline:dept-tree'].$el, ignoreExists: true });
            this.accountDeferred = app.startFeature('employee/scaffold:employee-info', { container: this.views['inline:employee-list'].$el, ignoreExists: true });

            // 屏蔽部门树的新增编辑与删除功能
            this.departmentDeferred.done(function(departmentFeature) {
                departmentFeature.views['tree:toolbar'].$('add').remove();
                departmentFeature.views['tree:toolbar'].$('edit').remove();
                departmentFeature.views['tree:toolbar'].$('del').remove();
            });
        },

        onStop: function() {
            this.departmentDeferred.done(function(feature) {
                feature.stop();
            });
            this.accountDeferred.done(function(feature) {
                feature.stop();
            });
        }
    }
});
