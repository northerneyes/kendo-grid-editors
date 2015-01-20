kendo-grid-editors
===============
Additional grid editors for kendo-ui library.
## Basic Usage

## [Demo](http://northerneyes.github.io/kendo-grid-editors/)
A demo is available on the Github Pages webpage for kendo-grid-editors [here](http://northerneyes.github.io/kendo-grid-editors/).

```javascript
// create grid
var grid = $grid.kendoGrid({
            dataSource: dataSource,
            columns: [{               //column settings
                field: "type",
                title: "Type",
                editor: function(container, options) {      // create custom editors
                    // setup required options
                    options.text = 'text';
                    options.value = 'value';
                    //  some data
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
                    KendoGridEditors.dropDownEditor(container, options, list);   // use specific editor
                },
                template: function(dataItem) {    // how to dispay in grid cell
                  options = {};
                  options.field = field;
                  return KendoGridEditors.dropdownTemplate(dataItem, options); // use specific value template
                },
                width: 90
            },
            ... // setup other columns
```

## Editors

### stringEditor
#### `template is not required`
```javascript
columns:[{
...
 editor: KendoGridEditors.stringEditor
...
}]
```

### numericEditor
#### `template is not required`
```javascript
columns:[{
...
 editor: function(container, options) {
                options.format = "n";
                options.decimals = 20;
                KendoGridEditors.numericEditor(container, options);
            }
...
}]
```

### dateEditor
```javascript
columns:[{
...
  template: function(dataItem, field) {
                options = {};
                options.field = field;
                options.format = "dd.MM.yyyy";
                return KendoGridEditors.dateTemplate(dataItem, options);
            },
  editor: function(container, options) {
                options.format = "dd.MM.yyyy";
                KendoGridEditors.dateEditor(container, options);
            }
...
}]
```

### timeEditor
```javascript
columns:[{
...
 template: function(dataItem, field) {
                options = {};
                options.field = field;
                options.format = "HH:mm";
                return KendoGridEditors.timeTemplate(dataItem, options);
            },
  editor: function(container, options) {
                options.format = "{0:HH:mm}";
                KendoGridEditors.timeEditor(container, options);
            }
...
}]
```

### memoEditor
#### `template is not required`
```javascript
columns:[{
...
  editor: function(container, options) {
                KendoGridEditors.textAreaEditor(container, options);
            }
...
}]
```

### boolEditor
```javascript
columns:[{
...
  template: function(dataItem, field) {
                options = {};
                options.field = field;
                return KendoGridEditors.boolTemplate(dataItem, options);
            },
  editor: function(container, options) {
                KendoGridEditors.boolEditor(container, options);
            }
...
}]
```

### colorEditor
```javascript
columns:[{
...
  template: function(dataItem, field) {
                options = {};
                options.field = field;
                return KendoGridEditors.colorTemplate(dataItem, options);
            },
  editor: function(container, options) {
                KendoGridEditors.colorEditor(container, options, 'basic', 7);
            }
...
}]
```

### dropdownEditor
```javascript
columns:[{
...
  template: function(dataItem, field) {
                options = {};
                options.field = field;
                return KendoGridEditors.dropdownTemplate(dataItem, options);
            },
  editor: function(container, options) {
                options.text = 'text';
                options.value = 'value';
                var list = ... //some dataSource
                KendoGridEditors.dropDownEditor(container, options, list);
...
}]
```
### dropDownImageEditor
```javascript
columns:[{
...
  template: function(dataItem, field) {
                var options = {};
                options.field = field;
                options.value = 'value';
                options.image = 'image';
                options.text = 'text';
                return KendoGridEditors.dropdownImageTemplate(dataItem, options);
            },
  editor: function(container, options) {
                options.text = 'text';
                options.value = 'value';
                options.image = 'image';
                var list = ... //some images dataSource
                KendoGridEditors.dropDownImageEditor(container, options, list);
            }
...
}]
```
### multiSelectEditor
```javascript
columns:[{
...
  template: function(dataItem, field) {
                options = {};
                options.field = field;
                options.text = 'text';
                return KendoGridEditors.multiSelectTemplate(dataItem, options);
            },
  editor: function(container, options) {
                options.text = 'text';
                options.value = 'value';
                var list = ...// some dataSource
                KendoGridEditors.multiSelectEditor(container, options, list);

            }
...
}]
```

## License
This code is provided under the MIT license.
