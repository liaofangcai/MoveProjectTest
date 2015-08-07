// Generated by CoffeeScript 1.8.0
(function() {
  define(['underscore', 'cdeio/cdeio', 'cdeio/vendors/jquery/ui/accordion'], function(_, cdeio) {
    return cdeio.registerComponentHandler('accordion', (function() {}), function(el, options, view) {
      var accordion;
      accordion = el.accordion(options);
      accordion.dispose = function() {
        return this.accordion('destroy');
      };
      return accordion;
    });
  });

}).call(this);
