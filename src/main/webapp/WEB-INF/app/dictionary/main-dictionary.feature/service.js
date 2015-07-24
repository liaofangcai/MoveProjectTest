var {mark} 			= require('cdeio/mark');
var {createService} = require('cdeio/service');

var {MainDigitalDictionary} 	= com.zyeeda.business.commons.entity;

exports.createService = function () {
	return {
		getMainDictionary: mark('managers', MainDigitalDictionary).mark('tx').on(function (mainDigitalDictionaryMgr, mark) {
			return mainDigitalDictionaryMgr.getMainDictionary({mark: mark});
		})
	};
};
