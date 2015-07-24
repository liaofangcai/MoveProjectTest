// Generated by CoffeeScript 1.8.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['cdeio/core/form/text-field', 'cdeio/core/form/form-field'], function(TextField, FormField) {
    var NumberRangeField;
    NumberRangeField = (function(_super) {
      __extends(NumberRangeField, _super);

      function NumberRangeField() {
        NumberRangeField.__super__.constructor.apply(this, arguments);
        this.type = 'number-range';
      }

      NumberRangeField.prototype.getTemplateString = function() {
        return '<div class="control-group c-<%= type %>">\n  <% if (!hideLabel) { %>\n  <label class="control-label" for="<%= id %>"><%= label %></label>\n  <% } %>\n  <div class="controls">\n    <input type="text" class="input span5" style="width: 48%;float: left;" id="<%= id %>-1"/><div style="float: left;text-align: center;width: 4%;margin-top: 6px;"> - </div><input type="text" class="input span5" style="width: 48%;float: left;" id="<%= id %>-2"/><div style="clear:both;"></div>\n  </div>\n</div>';
      };

      NumberRangeField.prototype.loadFormData = function(value, data) {
        if (value === null || value === void 0) {
          this.form.$(this.id + '-1').val('');
          return this.form.$(this.id + '-2').val('');
        } else {
          this.form.$(this.id + '-1').val(value.min);
          return this.form.$(this.id + '-2').val(value.max);
        }
      };

      NumberRangeField.prototype.getFormData = function() {
        var max, min, result;
        min = parseInt(this.form.$(this.id + '-1').val());
        max = parseInt(this.form.$(this.id + '-2').val());
        if (!(min === 0 || min || max === 0 || max)) {
          return null;
        }
        result = {};
        if (max === 0 || max) {
          result.max = max + '';
        }
        if (min === 0 || min) {
          result.min = min + '';
        }
        return result;
      };

      NumberRangeField.prototype.getFilter = function() {
        var value;
        value = this.getFormData();
        if (!value) {
          return null;
        }
        if (value.min && value.max) {
          return ['between', this.name, value.min, value.max];
        } else if (value.min && !value.max) {
          return ['ge', this.name, value.min];
        } else if (value.max && !value.min) {
          return ['le', this.name, value.max];
        }
      };

      return NumberRangeField;

    })(TextField);
    FormField.add('number-range', NumberRangeField);
    return NumberRangeField;
  });

}).call(this);
