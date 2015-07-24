var {mark}                    = require('cdeio/mark');
var {createValidationContext} = require('cdeio/validation/validation-context');
var logger                    = require('ringo/logging').getLogger(module.id);
var {createManager}     = require('cdeio/manager');

var {BCrypt}           = com.zyeeda.cdeio.commons.crypto;
var {Account}          = com.zyeeda.cdeio.commons.organization.entity;
var {Role}             = com.zyeeda.cdeio.commons.authc.entity;

var {AccountExtension} = com.zyeeda.business.system.entity;

var {SecurityUtils}    = org.apache.shiro;

var {EntityMetaResolver} = com.zyeeda.cdeio.web.scaffold;

exports.createService = function() {

    var service = {
        list: mark('beans', EntityMetaResolver).mark('managers').mark('tx').on(function (resolver, entity, options) {
            var meta = resolver.resolveEntity(Account),
                todoInfoMgr = createManager(meta.entityClass),
                currentUser = SecurityUtils.getSubject().getPrincipal();

            options.filters = options.filters || [];

            if ('picker' === options.listType){
                if ('work-evaluate' === options.pickerFeatureName){
                    options.filters.push(['eq', 'roles.name', '工作包负责人']);
                }else if ('work-task' === options.pickerFeatureName){
                    options.filters.push(['eq', 'roles.name', '项目负责人']);
                }
            }

            if (options.filters) {
                fetchResult = todoInfoMgr.findByEntity(options);
            } else {
                fetchResult = todoInfoMgr.findByExample(entity, options);
            }

            return fetchResult;
        }),

    	hashPassword: mark('tx').on(function (account) {
    		var hashed = BCrypt.hashpw(account.password, BCrypt.gensalt());
    		account.setPassword(hashed);
    		return account;
    	}),

    	enableAccount: mark('tx').on(function (account) {
    		account.setDisabled(false);
    	}),

    	disableAccount: mark('tx').on(function (account) {
    		account.setDisabled(true);
    	}),

		getAccounts: mark('managers', Account).mark('tx').on(function (accountMgr, path, isSyncTree) {
			if(isSyncTree) {
				return accountMgr.getChildrenAccounts({likePath: path + '%'});
			}else {
				return accountMgr.getSubAccounts({parentId: path});
			}
		}),

        getRoles: mark('managers', Account).mark('tx').on(function (accountMgr) {
            var subject = SecurityUtils.getSubject(),
                userId = subject.getPrincipal().id,
                user = accountMgr.find(userId);
                primaryRoles = user.roles;

            logger.debug('current user roles = {}', primaryRoles);

            return primaryRoles;
        }),

        getUserPermissions: mark('managers', Account).mark('tx').on(function (accountMgr) {
            var subject = SecurityUtils.getSubject(),
                userId = subject.getPrincipal().id;

            return accountMgr.getUserPermissions({userId: userId});
        }),

		changePassword: mark('managers', Account).mark('tx').on(function (accountMgr, data) {
			var account = accountMgr.find(data.id),
                context = createValidationContext();

			try {
                if (!BCrypt.checkpw(data.oldPassword, account.getPassword())) {
                    context.addViolation({ message: '原密码不正确', properties: 'oldPassword' });
                }
            } catch (e) {
                context.addViolation({ message: '原密码哈希有误' });
            }

            if (context.hasViolations()) {
                return { violations: context.collectViolations() };
            }

            account.setPassword(BCrypt.hashpw(data.newPassword, BCrypt.gensalt()));
            return accountMgr.merge(account);
		}),

        removeAcountRole: mark('managers', Account).mark('tx').on(function (accountMgr, account) {
            var role,
                roles = account.getRoles(),
                iterator = roles.iterator();

            while (iterator.hasNext()) {
              role = iterator.next();
              role.getAccounts().remove(account);
              iterator.remove();
            }
            return account;
        }),

        getById: mark('managers', Account).mark('tx').on(function (accountMgr, id) {
            return accountMgr.find(id);
        })
    };

    return service;
};
