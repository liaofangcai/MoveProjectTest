// Generated by CoffeeScript 1.8.0
(function() {
  define(['cdeio/features/task-grid.feature/views/grid-view', 'cdeio/features/task-grid.feature/handlers/grid-view', 'text!cdeio/features/task-grid.feature/templates.html'], function() {
    return {
      layout: 'cdeio:one-region',
      views: [
        {
          name: 'grid-view',
          region: 'main'
        }
      ],
      avoidLoadingModel: true
    };
  });

}).call(this);
