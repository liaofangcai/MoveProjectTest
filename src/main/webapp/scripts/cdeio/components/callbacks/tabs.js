// Generated by CoffeeScript 1.8.0
(function() {
  define({
    resizeFitTabPanel: function(x, ui) {
      var $ui;
      $ui = ui.jquery ? ui : $(ui.panel);
      return $ui.filter(':visible').find('.ui-tabs-panel-fit:visible').each(function() {
        var $parent, $this;
        $this = $(this);
        $parent = $this.parent();
        return $this.innerHeight($parent.height());
      });
    }
  });

}).call(this);
