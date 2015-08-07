// Generated by CoffeeScript 1.8.0
(function() {
  define(['jquery', 'cdeio/core/feature'], function($, Feature) {
    return {
      type: 'feature',
      name: 'scaffold',
      fn: function(module, feature, featureName, args) {
        var deferred, options;
        options = args[0];
        deferred = $.Deferred();
        $.get(module.url(featureName) + '/configuration/feature').done(function(data) {
          var opts, views;
          opts = {
            baseName: featureName,
            module: module,
            avoidLoadingModel: true,
            avoidLoadingTemplate: true
          };
          views = [];
          if (data.style === 'grid') {
            opts.layout = 'cdeio:grid';
            views.push({
              name: 'grid:toolbar',
              region: 'toolbar'
            });
            views.push({
              name: 'grid:body',
              region: 'body'
            });
          } else if (data.style === 'tree') {
            opts.layout = 'cdeio:tree';
            views.push({
              name: 'tree:toolbar',
              region: 'toolbar'
            });
            views.push({
              name: 'tree:body',
              region: 'body'
            });
          } else if (data.style === 'treeTable') {
            opts.layout = 'cdeio:grid';
            views.push({
              name: 'treetable:toolbar',
              region: 'toolbar'
            });
            views.push({
              name: 'treetable:body',
              region: 'body'
            });
          } else if (data.style === 'process') {
            opts.layout = 'cdeio:process';
            views.push({
              name: 'process:tabs',
              region: 'tabs'
            });
            views.push({
              name: 'process:toolbar-waiting',
              region: 'toolbar_waiting'
            });
            views.push({
              name: 'process:body-waiting',
              region: 'body_waiting'
            });
            views.push('process-form:show');
            views.push('process-form:complete');
            views.push('process-form:reject');
            views.push('process-form:recall');
            opts.activeTab = 'waiting';
          }
          if (data.style !== 'process') {
            views.push('form:add');
            views.push('form:edit');
            views.push('form:show');
            if (data.haveFilter) {
              views.push({
                name: 'form:filter'
              });
            }
          }
          if (_.isArray(data.views)) {
            views = views.concat(data.views);
          }
          opts.views = views;
          opts.haveFilter = data.haveFilter;
          if (data.enableFrontendExtension === true) {
            return module.loadResource(featureName + '.feature/scaffold').done(function(scaffold) {
              opts.scaffold = scaffold;
              return deferred.resolve(new Feature(opts, options));
            });
          } else {
            return deferred.resolve(new Feature(opts, options));
          }
        });
        return deferred.promise();
      }
    };
  });

}).call(this);
