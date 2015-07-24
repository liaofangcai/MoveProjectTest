// Generated by CoffeeScript 1.8.0
(function() {
  define(['underscore', 'cdeio/cdeio', 'cdeio/components/callbacks/grid', 'cdeio/vendors/jquery/jqgrid/i18n/grid.locale-cn', 'cdeio/vendors/jquery/jqgrid/jquery.jqGrid.src'], function(_, cdeio, cbGrid) {
    var buildGrid, delegateGridEvents;
    delegateGridEvents = function(view, obj, options, prefix) {
      var event, events, _i, _len, _results;
      events = ['onSelectRow', 'gridComplete', 'beforeRequest', 'onCellSelect', 'loadBeforeSend', 'loadComplete', 'ondblClickRow', 'onHeaderClick', 'onPaging', 'onRightClickRow', 'onSelectAll', 'onSortCol', 'serializeGridData'];
      _results = [];
      for (_i = 0, _len = events.length; _i < _len; _i++) {
        event = events[_i];
        _results.push((function(event) {
          return options[event] = view.feature.delegateComponentEvent(view, obj, prefix + ':' + event, options[event]);
        })(event));
      }
      return _results;
    };

    /*
    cdeio.registerComponentHandler 'grid', (->), (el, options, view) ->
    
        defaultOptions =
            autowidth: options.fit
            forceFit: options.fit
            cellLayout: 17 # padding: 0 8px; border-left: 1px;
            viewrecords: true
            rownumbers: true
    
            datatype: 'collection'
            collection: view.collection
    
        options = _.extend defaultOptions, options
    
        reader = _.extend {repeatitems: false}, options.jsonReader or {}
        options.jsonReader = reader
        if options.pager and _.isString options.pager
            options.pager = view.$ options.pager
    
        obj = {}
        delegateGridEvents view, obj, options, 'grid'
    
        buildGrid el, options, view
        obj.component = el
    
        if options.fit
            el.addClass 'c-jqgrid-fit'
            cbGrid.resizeToFit el
    
        el
     */
    cdeio.registerComponentHandler('tree-table', (function() {}), function(el, options, view) {
      var collection, grid, obj, reader;
      collection = view.collection;
      options = _.extend({
        ExpandColumn: 'name'
      }, options, {
        treeGrid: true,
        treeGridModel: 'adjacency',
        datatype: 'tree-table-collection',
        collection: collection
      });
      reader = _.extend({
        repeatitems: false
      }, options.jsonReader || {});
      options.jsonReader = reader;
      reader = _.extend({
        parent_id_field: 'parentId'
      }, options.treeReader || {});
      options.treeReader = reader;
      if (options.pager && _.isString(options.pager)) {
        options.pager = view.$(options.pager);
      }
      obj = {};
      delegateGridEvents(view, obj, options, 'treeTable');
      if (options.fit) {
        el.addClass('ui-jqgrid-fit');
        cbGrid.resizeToFit(el);
      }
      grid = buildGrid(el, options, view);
      obj.component = grid;
      return grid;
    });
    return buildGrid = function(el, options, view) {
      var colModel, data, f, fields, grid, _i, _len;
      fields = options.colModel;
      colModel = [];
      for (_i = 0, _len = fields.length; _i < _len; _i++) {
        f = fields[_i];
        if (f.type === 'enum') {
          data = f.editoptions.value.split(';');
          f.searchoptions = {
            sopt: ['in'],
            dataInit: function(el) {
              var d, _j, _len1, _select;
              _select = $('<select>');
              for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
                d = data[_j];
                _select.append("<option value=" + (d.split(':')[0]) + ">" + (d.split(':')[1]) + "</option>");
              }
              $(el).after(_select);
              $(el).hide();
              _select.css('width', '100%');
              _select.attr('multiple', 'multiple');
              _select.select2();
              return _select.on('change', function() {
                $(el).val(_select.val());
                return $(el).trigger('keydown');
              });
            }
          };
        } else if (f.type === 'date') {
          f.searchoptions = {
            sopt: ['between'],
            dataInit: function(el) {
              return $(el).daterangepicker();
            }
          };
        } else if (f.type === 'number') {
          f.searchoptions = {
            sopt: ['between']
          };
        } else if (f.type === 'boolean') {
          f.stype = 'select';
          f.editoptions = {
            value: ':全部;1:是;0:否'
          };
        } else {
          if (f.stype !== 'select') {
            f.searchoptions = {
              sopt: ['like']
            };
          }
        }
        if (f.name.indexOf('.') !== -1) {
          f.sortable = false;
          f.search = false;
        }
        if (_.isString(f.renderer)) {
          f.formatter = view.bindEventHandler(f.renderer, 'renderers');
        }
        if (_.isString(f.peeler)) {
          f.unformat = view.bindEventHandler(f.peeler, 'renderers');
        }
        colModel.push(f);
      }
      options.colModel = colModel;
      grid = el.jqGrid(options);
      if (options.filterToolbar === true) {
        el.jqGrid('filterToolbar', {
          stringResult: true,
          searchOnEnter: false
        });
      }
      return grid;
    };
  });

}).call(this);
