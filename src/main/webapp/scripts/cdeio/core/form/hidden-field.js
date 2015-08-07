// Generated by CoffeeScript 1.8.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['cdeio/core/form/form-field'], function(FormField) {
    var HiddenField;
    HiddenField = (function(_super) {
      __extends(HiddenField, _super);

      function HiddenField() {
        HiddenField.__super__.constructor.apply(this, arguments);
        this.type = 'hidden';
      }

      HiddenField.prototype.getTemplateString = function() {
        return '<input id="<%= id %>" type="hidden" name="<%= name %>" value="{{<%= value %>}}"/>';
      };

      return HiddenField;

    })(FormField);
    FormField.add('hidden', HiddenField);
    return HiddenField;
  });

}).call(this);
