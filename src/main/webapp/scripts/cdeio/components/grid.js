// Generated by CoffeeScript 1.8.0
(function() {
  define(['jquery', 'underscore', 'cdeio/cdeio', 'cdeio/vendors/jquery/dataTables/jquery.dataTables', 'cdeio/vendors/jquery/dataTables/jquery.dataTables.bootstrap', 'cdeio/vendors/jquery/dataTables/jquery.dataTables.columnFilter', 'cdeio/vendors/jquery/dataTables/FixedHeader'], function($, _, cdeio) {
    var adaptColumn, changeNodes, extendApi, extractFilters, searchExp, typeMap;
    searchExp = /^sSearch_(\d+)$/;
    typeMap = {
      select: 'eq',
      text: 'like',
      number: 'eq',
      'number-range': 'between',
      'date-range': 'between'
    };
    extractFilters = function(data, settings) {
      var columns, filters, key, m, op, separator, type, value, _ref, _ref1;
      filters = [];
      columns = data['sColumns'].split(',');
      separator = data['sRangeSeparator'];
      for (key in data) {
        value = data[key];
        m = key.match(searchExp);
        if (!m || !value) {
          continue;
        }
        type = (_ref = settings.oInit.filters) != null ? (_ref1 = _ref[m[1]]) != null ? _ref1.type : void 0 : void 0;
        if (!type) {
          continue;
        }
        op = typeMap[type];
        if (op === 'between') {
          value = value.split(separator);
          if (!value[0] && !value[1]) {
            continue;
          }
          filters.push([op, columns[m[1]], value[0], value[1]]);
        } else {
          filters.push([op, columns[m[1]], value]);
        }
      }
      if (filters.length === 0) {
        return null;
      } else {
        return filters;
      }
    };
    $.fn.dataTable.defaults.fnServerData = function(url, data, fn, settings) {
      var cname, d, filters, item, k, order, params, sortable, v, view, _i, _len;
      view = settings.oInit.view;
      d = {};
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        item = data[_i];
        d[item.name] = item.value;
      }
      cname = d['sColumns'].split(',')[d['iSortCol_0']];
      order = d['sSortDir_0'];
      sortable = d['bSortable_' + d['iSortCol_0']];
      params = {
        _first: d['iDisplayStart'],
        _pageSize: d['iDisplayLength'],
        _order: cname + '-' + order
      };
      if (!sortable) {
        delete params['_order'];
      }
      if (!params['_order'] && settings.oInit.defaultOrder) {
        params['_order'] = settings.oInit.defaultOrder;
      }
      _.extend(params, view.collection.extra);
      if (params['_pageSize'] === -1) {
        delete params['_first'];
        delete params['_pageSize'];
      }
      filters = extractFilters(d, settings);
      if (filters && params['_filters']) {
        params._filters = ((function() {
          var _ref, _results;
          _ref = params._filters;
          _results = [];
          for (k in _ref) {
            v = _ref[k];
            _results.push(v);
          }
          return _results;
        })()).concat(filters);
      } else if (filters) {
        params['_filters'] = filters;
      } else if (params._filters) {
        params._filters = (function() {
          var _ref, _results;
          _ref = params._filters;
          _results = [];
          for (k in _ref) {
            v = _ref[k];
            _results.push(v);
          }
          return _results;
        })();
      }
      return settings.jqXHR = view.collection.fetch({
        data: params
      }).done(function() {
        var i, json, _j, _len1;
        data = view.collection.toJSON();
        if (settings.oInit.afterRequest) {
          data = settings.oInit.afterRequest.call(view, data);
        }
        for (i = _j = 0, _len1 = data.length; _j < _len1; i = ++_j) {
          d = data[i];
          d['_i'] = i + 1;
        }
        json = {
          aaData: data,
          iTotalRecords: view.collection.recordCount,
          iTotalDisplayRecords: view.collection.recordCount
        };
        $(settings.oInstance).trigger('xhr', [settings, json]);
        return fn(json);
      });
    };
    adaptColumn = function(col, view) {
      var o, renderers, scaffold;
      if (_.isString(col)) {
        col = {
          name: col,
          header: col
        };
      }
      o = {
        bSearchable: !!col.searchable && col.name.lastIndexOf('.') === -1,
        bSortable: col.sortable !== false && col.name.lastIndexOf('.') === -1,
        bVisible: col.visible !== false,
        aDataSort: col.dataSort ? col.dataSort : void 0,
        asSorting: col.sorting ? col.sorting : void 0,
        fnCreatedCell: col.cellCreated ? col.cellCreated : void 0,
        mRender: col.pattern ? col.pattern : void 0,
        iDataSort: col.dataSort ? col.dataSort : void 0,
        mData: col.name ? col.name : void 0,
        sCellType: col.cellType ? col.cellType : void 0,
        sClass: col.style ? col.style : void 0,
        sDefaultContent: col.defaultContent || '',
        sName: col.name ? col.name : void 0,
        sTitle: col.header ? col.header : void 0,
        sType: col.type ? col.type : void 0,
        sWidth: col.width ? col.width : void 0
      };
      if (col.renderer) {
        if (_.isFunction(col.renderer)) {
          o.mRender = col.renderer;
        } else {
          if (view.feature.baseName === 'inline-grid') {
            scaffold = view.feature.startupOptions.gridOptions.form.feature.options.scaffold || {};
            renderers = scaffold.inlineGridPickerRenderers || {};
          } else {
            scaffold = view.feature.options.scaffold || {};
            renderers = scaffold.renderers || {};
          }
          if (!renderers[col.renderer]) {
            throw new Error("no renderer can be found in name: " + col.renderer);
          }
          o.mRender = _.bind(renderers[col.renderer], view);
        }
      }
      return o;
    };
    extendApi = function(table, view, options) {
      var collection;
      collection = view.collection;
      return _.extend(table, {
        clear: function() {
          return table.fnClearTable();
        },
        addRow: function(data) {
          return table.fnAddData(data);
        },
        getSelected: function() {
          var selected;
          if (options.multiple && options.crossPage) {
            return table.selectNodes;
          }
          selected = [];
          table.find('input[id*="chk-"]:checked').each(function(i, item) {
            var val;
            val = $(item).val();
            return selected.push(collection.get(val) || val);
          });
          if (selected.length === 0) {
            return null;
          }
          if (options.multiple) {
            return selected;
          } else {
            return selected[0];
          }
        },
        getSelectedIndex: function() {
          var selected;
          selected = [];
          table.find('input[id*="chk-"]:checked').each(function(i, item) {
            return selected.push(table.fnGetPosition(item.parentNode.parentNode));
          });
          if (selected.length === 0) {
            return null;
          }
          if (options.multiple) {
            return selected;
          } else {
            return selected[0];
          }
        },
        getSelectedTrs: function() {
          var selected;
          selected = [];
          table.find('input[id*="chk-"]:checked').each(function(i, item) {
            return selected.push($(item).parent().parent());
          });
          return selected;
        },
        removeSelectedRow: function() {
          var idx, selectedTrs, tr, _i, _len, _results;
          selectedTrs = [];
          idx = table.getSelectedIndex();
          if (idx == null) {
            return;
          }
          if (options.multiple) {
            selectedTrs = table.getSelectedTrs();
            _results = [];
            for (_i = 0, _len = selectedTrs.length; _i < _len; _i++) {
              tr = selectedTrs[_i];
              _results.push(table.fnDeleteRow($(tr)[0]));
            }
            return _results;
          } else {
            return table.fnDeleteRow(idx);
          }
        },
        removeSelectedNodes: function() {
          if (options.crossPage && options.multiple) {
            return table.selectNodes = void 0;
          }
        },
        addParam: function(key, value) {
          return view.collection.extra[key] = value;
        },
        addFilter: function(filter) {
          var _base;
          (_base = view.collection.extra)._filters || (_base._filters = {});
          return view.collection.extra._filters[filter[1]] = filter;
        },
        addFilters: function(filters) {
          var filter, _i, _len, _results;
          if (filters == null) {
            filters = [];
          }
          _results = [];
          for (_i = 0, _len = filters.length; _i < _len; _i++) {
            filter = filters[_i];
            _results.push(this.addFilter(filter));
          }
          return _results;
        },
        removeFilter: function(filter) {
          var _base;
          (_base = view.collection.extra)._filters || (_base._filters = {});
          return delete view.collection.extra._filters[filter[1]];
        },
        removeFilters: function(filters) {
          var filter, _i, _len, _results;
          if (filters == null) {
            filters = [];
          }
          _results = [];
          for (_i = 0, _len = filters.length; _i < _len; _i++) {
            filter = filters[_i];
            _results.push(this.removeFilter(filter));
          }
          return _results;
        },
        removeParam: function(key) {
          var _ref;
          return (_ref = view.collection.extra) != null ? delete _ref[key] : void 0;
        },
        refresh: function(includeParams) {
          if (includeParams == null) {
            includeParams = true;
          }
          return table.fnDraw();
        }
      });
    };
    changeNodes = function(view, table, nodes, status, op) {
      var collections;
      collections = [];
      _.each(_.toArray(nodes), function(n) {
        return collections.push(view.collection.get(n.value));
      });
      if (status) {
        table.selectNodes = table.selectNodes && table.selectNodes.length > 0 ? _.union(table.selectNodes, collections) : collections;
        if (op = 'all') {
          return table.selectNodes = _.uniq(table.selectNodes, false, function(obj) {
            return obj.id;
          });
        }
      } else {
        return _.each(collections, function(k) {
          return _.each(table.selectNodes, function(n, i) {
            if (n && n.id === k.id) {
              return table.selectNodes.splice(i, 1);
            }
          });
        });
      }
    };
    return cdeio.registerComponentHandler('grid', (function() {}), function(el, options, view) {
      var checkAll, checkAllSelector, col, columns, filterEnabled, filters, footers, opt, settings, table;
      opt = _.extend({
        sDom: options.paginate === false ? "<'c-grid-body't>" : "Rs<'row-fluid c-grid-top'<'span6'i><'span6'p>><'c-grid-body't>",
        bServerSide: !options.data,
        bPaginate: options.paginate !== false,
        view: view,
        defaultOrder: options.defaultOrder,
        oLanguage: {
          sInfo: '显示 _START_ - _END_ 条&nbsp;&nbsp;&nbsp;&nbsp;共 _TOTAL_ 条',
          sEmptyTable: '没有相关数据',
          sInfoEmpty: '显示 0 - 0 条&nbsp;&nbsp;&nbsp;&nbsp;共 0 条',
          sZeroRecords: '没有相关数据'
        },
        bSortCellsTop: true
      }, options.options);
      el.addClass('table');
      el.addClass(options.style || 'table-striped table-bordered table-hover');
      if (!opt.aoColumnDefs && !opt.aoColumns && options.columns) {
        columns = [].concat(options.columns);
        if (options.form) {
          if (options.form.baseName === 'show') {
            columns.unshift({
              sortable: false,
              searchable: false,
              name: 'id',
              header: '',
              width: '25px',
              renderer: function(data, type, row, a) {
                return "<a href=\"javascript:void 0;\" id=\"inline-" + data + "\" value=\"" + data + "\" class=\"select-row\">\n    <i class=\"icon-eye-open\"></i>\n</a>";
              }
            });
          }
        }
        if (options.checkBoxColumn !== false) {
          if (!options.form || (options.form && options.form.baseName !== 'show')) {
            columns.unshift({
              sortable: false,
              searchable: false,
              name: 'id',
              header: options.multiple ? '<input type="checkbox" class="select-all" id="check-all-' + view.cid + '"> <label class="lbl"/>' : '',
              width: '25px',
              renderer: function(data, type, row, a) {
                if (row['__FORM_TYPE__'] === 'delete') {
                  return "<input type=\"hidden\" id=\"chk-" + data + "\" value=\"" + data + "\" class=\"select-row\" name=\"chk-" + view.cid + "\" />\n<span class=\"red-fork\">×</lable>";
                }
                return "<input type=\"" + (options.multiple ? 'checkbox' : 'radio') + "\"\nid=\"chk-" + data + "\" value=\"" + data + "\" class=\"select-row\" name=\"chk-" + view.cid + "\"/>\n<label class=\"lbl\"></lable>";
              }
            });
          }
        }
        if (options.numberColumn === true) {
          columns.unshift({
            sortable: false,
            searchable: false,
            name: '_i',
            header: '#',
            width: '25px'
          });
        }
        filterEnabled = false;
        filters = [];
        footers = [];
        opt.aoColumns = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = columns.length; _i < _len; _i++) {
            col = columns[_i];
            if (col.filter) {
              filterEnabled = true;
              filters.push({
                type: col.filter,
                values: col.source
              });
            } else {
              filters.push(null);
            }
            footers.push("<th></th>");
            _results.push(adaptColumn(col, view));
          }
          return _results;
        })();
      }
      if (options.data) {
        opt.aaData = options.data;
      }
      if (_.has(options, 'deferLoading')) {
        opt.iDeferLoading = options.deferLoading;
      }
      opt.oColReorder = {
        allowReorder: false,
        allowResize: true
      };
      if (filterEnabled) {
        el.prepend("<thead><tr>" + (footers.join('')) + "</tr><tr>" + (footers.join('')) + "</tr></thead>");
        opt.filters = filters;
      }
      if (options.fixedHeader !== false) {
        opt.sScrollY = options.scrollY || '350';
      }
      table = el.dataTable(opt);
      checkAllSelector = 'input#check-all-' + view.cid;
      table.delegator = table.parents('div.c-grid-body');
      checkAll = table.delegator.find(checkAllSelector);
      table.delegator.delegate(checkAllSelector, 'change.deletage', function(e) {
        var checked;
        checked = checkAll.is(':checked');
        table.find('input[id*="chk-"]').prop('checked', checked);
        table.trigger('selectionChanged', [table.getSelected()]);
        if (options.crossPage && options.multiple) {
          return changeNodes(view, table, table.find('input[id*="chk-"]'), checked, 'all');
        }
      });
      table.delegator.delegate('tr', 'click.deletage', function(e) {
        var checked, chk, t;
        if ($(e.target).is('input')) {
          return;
        }
        t = $(e.currentTarget);
        chk = t.find('input[id*="chk-"]:eq(0)');
        if (chk.is(':disabled')) {
          return;
        }
        checked = chk.is(':checked');
        return chk.prop('checked', !checked).trigger('change');
      });
      table.delegator.delegate('input[id*="chk-"]', 'change.delegate', function(e) {
        var allSelected, checked, input, tr;
        input = $(e.currentTarget);
        checked = input.is(':checked');
        tr = input.closest('tr');
        if (checked && options.multiple !== true) {
          table.find('input[id*="chk-"]:checked').prop('checked', false);
          table.find('tr.selected').removeClass('selected');
          input.prop('checked', true);
        }
        if (options.multiple) {
          allSelected = true;
          table.find('input[id*="chk-"]').each(function(i, item) {
            if (!$(item).is(':checked')) {
              return allSelected = false;
            }
          });
          checkAll.prop('checked', allSelected);
        }
        tr[checked ? 'addClass' : 'removeClass']('selected');
        table.trigger('selectionChanged', [table.getSelected()]);
        if (options.crossPage && options.multiple) {
          return changeNodes(view, table, [input[0]], checked, 'one');
        }
      });
      table.delegator.delegate('a[id*="inline-"]', 'click.delegate', function(e) {
        var data, feature, grid, gridView, operatorsView, titleView;
        feature = view.feature;
        gridView = feature.views['inline:grid'];
        operatorsView = feature.views['inline:operators'];
        titleView = feature.views['inline:title'];
        grid = gridView.components[0];
        data = grid.fnGetData(this.parentNode.parentNode);
        return operatorsView.loadViewFormDeferred.done((function(_this) {
          return function(form, title) {
            if (title == null) {
              title = '';
            }
            return app.showDialog({
              title: '查看' + title,
              view: form,
              buttons: []
            }).done(function() {
              form.setFormData(data, true);
              if (_.isFunction(gridView.afterShowInlineGridDialog)) {
                return gridView.afterShowInlineGridDialog.call(this, 'show', form, data);
              }
            });
          };
        })(this));
      });
      settings = table.fnSettings();
      view.collection.extra = _.extend({}, options.params || {});
      extendApi(table, view, options);
      if (filterEnabled) {
        table.columnFilter({
          sPlaceHolder: 'head:after',
          aoColumns: filters,
          sRangeFormat: '{from} - {to}'
        });
      }
      if (options.crossPage && options.multiple) {
        table.on('processing.dt', function(e) {
          if (table.selectNodes) {
            return _.each(table.selectNodes, function(n, i) {
              return table.find('#chk-' + n.id).attr('checked', true);
            });
          }
        });
      }
      table.dispose = function() {
        var _ref;
        if ((_ref = table._oPluginFixedHeader) != null) {
          _ref.fnDestroy();
        }
        table.fnDestroy(true);
        return table.delegator.unbind('.delegate');
      };
      return table;
    });
  });

}).call(this);
