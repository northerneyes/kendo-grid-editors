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
                width: 90
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
                width: "200px"
            }],
            toolbar: ['create'],
            editable: {
                mode: "inline",
                createAt: "bottom"
            }
        }).data('kendoGrid');
});