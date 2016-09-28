define({
    ssoProviderUrl: 'provider/signin',

    disableAuthz: false,
    settingsPath: 'invoke/settings',

    whitelist: [
        'admin/viewport',
        'admin/account-menu',
        'commons/header',
        'commons/menu',
        'profile/viewport',
        'profile/account-menu'
    ],
    //用来标识个人所得税的算法
    taxTag: 'include',
    urlPrefix: function(app, path) {
        if ('/about' === path || '/common-routers' === path || '/system/upload' === path) {
            return 'invoke' + path;
        }

        return 'invoke/scaffold/' + path;
    }
});
