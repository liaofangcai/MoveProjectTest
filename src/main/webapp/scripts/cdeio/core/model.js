// Generated by CoffeeScript 1.8.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone'], function(Backbone) {
    var Model;
    Model = (function(_super) {
      __extends(Model, _super);

      function Model() {
        return Model.__super__.constructor.apply(this, arguments);
      }

      Model.prototype.url = function() {
        var path, url, _ref, _ref1, _ref2, _ref3;
        path = this.path;
        if (this.feature.baseName === 'inline-grid') {
          url = ((_ref = this.view) != null ? _ref.url() : void 0) || ((_ref1 = this.feature) != null ? _ref1.url() : void 0) || '';
          if (this.feature.startupOptions.gridOptions.form.options.feature.activeTab && this.feature.startupOptions.url) {
            url = this.feature.startupOptions.url + '/history/' + this.feature.startupOptions.gridOptions.form.model.get('id');
          }
        } else {
          url = ((_ref2 = this.view) != null ? _ref2.url() : void 0) || ((_ref3 = this.feature) != null ? _ref3.url() : void 0) || '';
        }
        url = path ? url + '/' + path : url;
        if (this.feature.activeTab) {
          if (_.isUndefined(this.taskOperatorType)) {
            url = url + '/process/' + this.feature.activeTab;
          } else {
            url = url + '/task/' + this.taskOperatorType;
          }
        }
        if (_.isUndefined(this.taskOperatorType)) {
          if (this.isNew()) {
            return url;
          } else {
            return url + '/' + encodeURIComponent(this.id);
          }
        } else {
          if (this.isNew()) {
            return url;
          } else {
            return url + '/' + encodeURIComponent(this.id) + '|' + this._t_taskId;
          }
        }
      };

      return Model;

    })(Backbone.Model);
    return Model;
  });

}).call(this);
