$(document).ready(function() {
    $grid = $('#grid');

    var dataSource = new kendo.data.DataSource({
        data: [],
        change: function(e) {
            // if(e.action == 'remove'){ removedItems.push(e.items[0]);}
        },
        schema: {
            model: {
                id: "name",
                fields: {
                    name: {
                        nullable: true
                    },
                    type: {
                        defaultValue: TypesProvider.default()
                    },
                    value: {
                        defaultValue: ''
                    }
                }
            }
        }
    });

    grid = $grid.kendoGrid({
        dataSource: dataSource,
        columns: [{
            field: "name",
            title: "Name",
            width: 200
        }, {
            field: "type",
            title: "Type",
            editor: function(container, options) {
                options.text = 'text';
                options.value = 'value';
                KendoGridEditors.dropDownEditor(container, options, TypesProvider.types(), null, function() {
                    var item = this.dataItem();
                    //online change editor for value
                    if (item.editor) {
                        kendo.unbind(valueContainer, valueOptions.model);
                        valueContainer.empty();
                        valueOptions.model.set('value', item.default());
                        item.editor(valueContainer, valueOptions);
                        kendo.bind(valueContainer, valueOptions.model);
                    }
                });
            },
            template: "#=type.text#",
            width: 140
        }, {
            field: "value",
            editor: function(container, options) {
                options.text = 'text';
                options.value = 'value';
                valueContainer = container;
                valueOptions = options;
                var valueEditor = TypesProvider.find(options.model.type.value).editor;
                if (valueEditor)
                    valueEditor(container, options);
            },
            template: function(dataItem) {
                var valueTemplate = TypesProvider.find(dataItem.type.value).valueTemplate;
                if (valueTemplate)
                    return valueTemplate(dataItem, 'value');
                else
                    return dataItem.value;
            },
            title: "Value"
        }, {
            command: ["edit", "destroy"],
            title: "&nbsp;",
            width: "270px"
        }],
        toolbar: ['create'],
        editable: {
            mode: "inline"
        }
    }).data('kendoGrid');

    dataSource.data([{
        name: 'String',
        type: TypesProvider.find(TypesProvider.ValueType.String),
        value: 'Some string'
    }, {
        name: 'Number',
        type: TypesProvider.find(TypesProvider.ValueType.Number),
        value: 42
    }, {
        name: 'Date',
        type: TypesProvider.find(TypesProvider.ValueType.Date),
        value: new Date()
    }, {
        name: 'Time',
        type: TypesProvider.find(TypesProvider.ValueType.Time),
        value: new Date()
    }, {
        name: 'Memo',
        type: TypesProvider.find(TypesProvider.ValueType.Memo),
        value: 'Lorem ipsum non conubia pretium netus placerat faucibus posuere, aenean posuere eget suscipit dictum sed netus, donec congue dolor class morbi nullam tincidunt curae nisi duis sit volutpat purus eget bibendum rutrum nisi felis cursus.'
    }, {
        name: 'Boolean',
        type: TypesProvider.find(TypesProvider.ValueType.Bool),
        value: true
    }, {
        name: 'Color',
        type: TypesProvider.find(TypesProvider.ValueType.Color),
        value: '#00FF00'
    }, {
        name: 'List',
        type: TypesProvider.find(TypesProvider.ValueType.List),
        value: {
            value: 1,
            text: "Mike"
        }
    }, {
        name: 'Image List',
        type: TypesProvider.find(TypesProvider.ValueType.ImageList),
        value: {
            value: 0,
            text: "Signal",
            image: "https://cdn2.iconfinder.com/data/icons/woothemes/PNG/signal.png"
        }
    }, {
        name: 'MultiSelect',
        type: TypesProvider.find(TypesProvider.ValueType.MultiSelect),
        value: [{
            value: 0,
            text: "Jarry"
        }, {
            value: 1,
            text: "Mike"
        }]
    }]);
});