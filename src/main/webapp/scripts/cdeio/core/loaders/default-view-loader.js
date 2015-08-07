// Generated by CoffeeScript 1.8.0
(function() {
  define(['cdeio/core/view', 'cdeio/core/config'], function(View, config) {
    var getPath;
    getPath = config.getPath;
    return {
      type: 'view',
      name: 'DEFAULT',
      fn: function(module, feature, viewName, args) {
        var def, deferred, options;
        deferred = $.Deferred();
        options = args[0];
        if ((options != null ? options.avoidLoadingView : void 0) === true) {
          def = {
            baseName: viewName,
            module: module,
            feature: feature,
            avoidLoadingModel: true,
            avoidLoadingHandlers: options.avoidLoadingHandlers === false ? false : true
          };
          deferred.resolve(View.build(def));
          return deferred.promise();
        }
        module.loadResource(getPath(feature, 'view', viewName)).done(function(def) {
          var view;
          if (def == null) {
            def = {};
          }
          def.baseName = viewName;
          def.module = module;
          def.feature = feature;
          view = View.build(def);
          return deferred.resolve(view);
        });
        return deferred.promise();
      }
    };
  });

}).call(this);
