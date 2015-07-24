var {mark}              = require('cdeio/mark');

var {SecurityUtils}     = org.apache.shiro;

var {Date}             = java.util;

exports.entityLabel = '数据字典明细';

exports.enableFrontendExtension = false;

exports.haveFilter = true;

exports.labels = {
    name: '名称',
    value: '值',
    remark: '备注'
};

exports.filters = {
    defaults: {
        '!detailDigitalDictionaryFilter': ['mainDigitalDictionary']
    }
};

exports.grid = {
    columns: ['name', 'value'],
    numberColumn: true,
    defaultOrder: 'createdTime-desc'
};

exports.fieldGroups = {
    defaults: ['name',
        {name: 'value', required: true, validations: {rules: {required: true}, messages: {required: '不能为空'}}},
        {name: 'remark', type: 'textarea', colspan: 2, rows: 1}
    ],
    filter: ['name', 'value']
};

exports.forms = {
    add: {
        groups: ['defaults'],
        size: 'large'
    },
    edit: {
        groups: ['defaults'],
        size: 'large'
    },
    show: {
        groups: ['defaults'],
        size: 'large'
    },
    filter: {
        groups: [{
            name: 'filter',
            columns: 4
        }]
    }
};

exports['inline-grid'] = {
    columns: ['name', 'value', 'remark']
};

//相关数据处理
exports.hooks = {
    //创建数据之前执行函数
    beforeCreate: {
        defaults: function (detailDigitalDictionary){
            var subject = SecurityUtils.getSubject(),
                user = subject.getPrincipal();

            detailDigitalDictionary.creator = user.accountName;
            detailDigitalDictionary.creatorName = user.realName;
            detailDigitalDictionary.createdTime = new Date();
        }
    },
    //编辑数据之前执行函数
    beforeUpdate: {
        defaults: function (detailDigitalDictionary){
            var subject = SecurityUtils.getSubject(),
                user = subject.getPrincipal();

            detailDigitalDictionary.lastModifier = user.accountName;
            detailDigitalDictionary.lastModifierName = user.realName;
            detailDigitalDictionary.lastModifiedTime = new Date();
        }
    }
};
