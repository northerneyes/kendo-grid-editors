var TypesProvider = (function(gridEditors) {
    var ValueType = {
        String: 0,
        Number: 1,
        Date: 2,
        Time: 4,
        Memo: 5,
        Color: 6,
        Bool: 7,
        List: 8,
        None: -1
    };

    function noneType(type) {
        return {
            value: type,
            text: 'none type',
            editor: null,
            output: function(value) {
                return value;
            }
        };
    }

    function types() {
        return [{
            value: ValueType.String,
            text: 'string',
            editor: gridEditors.stringEditor,
            default: function() {
                return "";
            }
        }, {
            value: ValueType.Number,
            text: 'number',
            default: function() {
                return 0;
            },
            editor: function(container, options) {
                options.format = "n";
                options.decimals = 20;
                gridEditors.numericEditor(container, options);
            }
        }, {
            value: ValueType.Date,
            text: 'date',
            default: function() {
                return new Date();
            },
            valueTemplate: function(dataItem, field) {
                return kendo.template('#= kendo.toString(data, "dd.MM.yyyy")# ')(dataItem[field]);
            },

            editor: function(container, options) {
                options.format = "dd.MM.yyyy";
                gridEditors.dateEditor(container, options);
            }
        }, {
            value: ValueType.Time,
            text: 'time',
            default: function() {
                return new Date();
            },
            valueTemplate: function(dataItem, field) {
                return kendo.template('#= kendo.toString(data, "HH:mm")# ')(dataItem[field]);
            },
            editor: function(container, options) {
                options.format = "{0:HH:mm}";
                gridEditors.timeEditor(container, options);
            }
        }, {
            value: ValueType.Memo,
            text: 'memo',
            default: function() {
                return '';
            },
            editor: function(container, options) {
                gridEditors.textAreaEditor(container, options);
            }
        }, {
            value: ValueType.Bool,
            text: 'bool',
            default: function() {
                return false;
            },
            valueTemplate: function(dataItem, field) {
                return kendo.template(gridEditors.boolTemplate({
                    field: field
                }))(dataItem);
            },
            editor: function(container, options) {
                gridEditors.boolEditor(container, options);
            }
        }, {
            value: ValueType.Color,
            text: 'color',
            default: function() {
                return '#FF0000';
            },
            valueTemplate: function(dataItem, field) {
                return kendo.template(gridEditors.colorTemplate('data'))(dataItem[field]);
            },
            editor: function(container, options) {
                gridEditors.colorEditor(container, options, 'basic', 7);
            }
        }, {
            value: ValueType.List,
            text: 'list',
            default: function() {
                return '#FF0000';
            },
            valueTemplate: function(dataItem, field) {
                return kendo.template(gridEditors.colorTemplate('data'))(dataItem[field]);
            },
            editor: function(container, options) {
                gridEditors.colorEditor(container, options, 'basic', 7);
            }
        }];
    }

    return {
        types: types,
        find: function(type) {
            return _.find(this.types(), function(p) {
                return p.value == type;
            }) || noneType(type);
        },
        default: function() {
            return this.types()[0];
        }

    };
}(KendoGridEditors));