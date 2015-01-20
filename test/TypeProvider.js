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
        ImageList: 9,
        MultiSelect: 10,
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
                options = {};
                options.field = field;
                options.format = "dd.MM.yyyy";
                return gridEditors.dateTemplate(dataItem, options);
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
                options = {};
                options.field = field;
                options.format = "HH:mm";
                return gridEditors.timeTemplate(dataItem, options);
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
                options = {};
                options.field = field;
                return gridEditors.boolTemplate(dataItem, options);
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
                options = {};
                options.field = field;
                return gridEditors.colorTemplate(dataItem, options);
            },
            editor: function(container, options) {
                gridEditors.colorEditor(container, options, 'basic', 7);
            }
        }, {
            value: ValueType.List,
            text: 'list',
            default: function() {
                return {
                    value: 0,
                    text: "Jarry"
                };
            },
            valueTemplate: function(dataItem, field) {
                options = {};
                options.field = field;
                return gridEditors.dropdownTemplate(dataItem, options);
            },
            editor: function(container, options) {
                options.text = 'text';
                options.value = 'value';
                var list = [{
                    value: 0,
                    text: "Jarry"
                }, {
                    value: 1,
                    text: "Mike"
                }, {
                    value: 2,
                    text: "Jane"
                }];
                gridEditors.dropDownEditor(container, options, list);
            }
        }, {
            value: ValueType.ImageList,
            text: 'imagelist',
            default: function() {
                return {
                    value: 0,
                    text: "Signal",
                    image: "https://cdn2.iconfinder.com/data/icons/woothemes/PNG/signal.png"
                };
            },
            valueTemplate: function(dataItem, field) {
                var options = {};
                options.field = field;
                options.value = 'value';
                options.image = 'image';
                options.text = 'text';
                return gridEditors.dropdownImageTemplate(dataItem, options);
            },
            editor: function(container, options) {
                options.text = 'text';
                options.value = 'value';
                options.image = 'image';
                var list = [{
                    value: 0,
                    text: "Signal",
                    image: "https://cdn2.iconfinder.com/data/icons/woothemes/PNG/signal.png"
                }, {
                    value: 1,
                    text: "Charts",
                    image: "https://cdn2.iconfinder.com/data/icons/woothemes/PNG/document_graph.png"
                }, {
                    value: 2,
                    text: "Pdf",
                    image: "https://cdn2.iconfinder.com/data/icons/woothemes/PNG/document_pdf.png"
                }];
                gridEditors.dropDownImageEditor(container, options, list);
            }
        }, {
            value: ValueType.MultiSelect,
            text: 'multiSelect',
            default: function() {
                return {
                    value: 0,
                    text: "Jarry"
                };
            },
            valueTemplate: function(dataItem, field) {
                options = {};
                options.field = field;
                options.text = 'text';
                return gridEditors.multiSelectTemplate(dataItem, options);
            },
            editor: function(container, options) {
                options.text = 'text';
                options.value = 'value';
                var list = [{
                    value: 0,
                    text: "Jarry"
                }, {
                    value: 1,
                    text: "Mike"
                }, {
                    value: 2,
                    text: "Jane"
                }];
                gridEditors.multiSelectEditor(container, options, list);

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
        },
        ValueType:ValueType

    };
}(KendoGridEditors));