var {mark}              = require('cdeio/mark');
var {json, error, html} = require('cdeio/response');

var {SecurityUtils}     = org.apache.shiro;

var {Date}             = java.util;

exports.entityLabel = '数据字典';

exports.enableFrontendExtension = false;

exports.haveFilter = true;

exports.labels = {
    name: '名称',
    mark: '标识'
};

exports.filters = {
    defaults: {
        '!mainDigitalDictionaryFilter': [''],
        '!detailDigitalDictionaryFilter': ['mainDigitalDictionary']
    }
};

exports.grid = {
    columns: ['name', 'mark'],
    numberColumn: true,
    defaultOrder: 'createdTime-desc'
};

exports.fieldGroups = {
    defaults: ['name', 'mark'],
    inlineDetailDigitalDictionarysGrid: [{
        label: '数据字典明细',
        type: 'inline-grid',
        name: 'detailDigitalDictionarys',
        allowAdd: true,
        allowEdit: true,
        multiple: false,
        allowPick: false
    }],
    filter: ['name', 'mark']
};

exports.forms = {
    add: {
        groups: ['defaults', {label: '数据字典明细', name: 'inlineDetailDigitalDictionarysGrid'}],
        size: 'large'
    },
    edit: {
        groups: ['defaults', {label: '数据字典明细', name: 'inlineDetailDigitalDictionarysGrid'}],
        size: 'large'
    },
    show: {
        groups: ['defaults', {label: '数据字典明细', name: 'inlineDetailDigitalDictionarysGrid'}],
        size: 'large'
    },
    filter: {
        groups: [{
            name: 'filter',
            columns: 4
        }]
    }
};


//相关数据处理
exports.hooks = {
    //创建数据之前执行函数
    beforeCreate: {
        defaults: function (mainDigitalDictionary){
            var subject = SecurityUtils.getSubject(),
                user = subject.getPrincipal();

            mainDigitalDictionary.creator = user.accountName;
            mainDigitalDictionary.creatorName = user.realName;
            mainDigitalDictionary.createdTime = new Date();
        }
    },
    //编辑数据之前执行函数
    beforeUpdate: {
        defaults: function (mainDigitalDictionary){
            var subject = SecurityUtils.getSubject(),
                user = subject.getPrincipal();

            mainDigitalDictionary.lastModifier = user.accountName;
            mainDigitalDictionary.lastModifierName = user.realName;
            mainDigitalDictionary.lastModifiedTime = new Date();
        }
    }
};

//请求处理
exports.doWithRouter = function(router) {
    router.get('/get-dictionary', mark('services', 'dictionary/main-dictionary').on(function (mainDictionarySvc, request) {
        var options = request.params,
            result = {};

        result.mainDictionarys = mainDictionarySvc.getMainDictionary(options.mark);

        return json(result, exports.filters.defaults);
    }));
};
