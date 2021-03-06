//	KendoGridEditors.js 1.1.1

//	(c) 2014 George Bukhanov
//	Kendo grid editors may be freely distributed under the MIT license. 
//	For all details and documentation:
//	https://github.com/northerneyes/kendo-grid-editors

(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['kendo', 'jquery', 'exports'], function(kendo, $, exports) {
			// Export global even in AMD case in case this script is loaded with
			// others that may still expect a global Backbone.
			root.KendoGridEditors = factory(root, exports, kendo, $);
		});

		// Next for Node.js or CommonJS. 
	} else if (typeof exports !== 'undefined') {
		var kendo = require('kendo');
		var $ = require('jquery');
		factory(root, exports, kendo, $);

		// Finally, as a browser global.
	} else {
		root.KendoGridEditors = factory(root, {}, root.kendo, root.$);
	}
}(this, function(root, KendoGridEditors, kendo, $) {

	KendoGridEditors.version = '1.0.0';

	// editors
	KendoGridEditors.timeEditor = function(container, options) {
		$('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
			.appendTo(container)
			.kendoTimePicker();
	};

	KendoGridEditors.dateEditor = function(container, options) {
		$('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '"/>')
			.appendTo(container)
			.kendoDatePicker({
				format: options.format || "MMMM yyyy"
			});
	};

	KendoGridEditors.dropDownEditor = function(container, options, dataSource, template, change) {
		$('<input required data-text-field="' + options.text + '" data-value-field="' + options.value + '" data-bind="value:' + options.field + '"/>')
			.appendTo(container)
			.kendoDropDownList({
				autoBind: false,
				valueTemplate: template || "<span>#= data.text#</span>",
				template: template || "<span>#= data.text#</span>",
				dataSource: dataSource,
				change: change || function() {}
			});
	};

	KendoGridEditors.dropDownImageEditor = function(container, options, dataSource) {
		var imageTemplate = dropdownImageTemplate({
			field: 'data',
			image: options.image,
			text: options.text,
			width: options.width,
			height: options.height
		});
		$('<input required data-text-field="' + options.text + '" data-value-field="' + options.value + '" data-bind="value:' + options.field + '"/>')
			.appendTo(container)
			.kendoDropDownList({
				autoBind: false,
				valueTemplate: imageTemplate,
				template: kendo.template(imageTemplate),
				dataSource: dataSource
			});

	};

	KendoGridEditors.colorEditor = function(container, options, pallete, colNum) {
		$('<input required data-bind="value:' + options.field + '" style="width:50px"/>')
			.appendTo(container)
			.kendoColorPicker({
				buttons: false,
				columns: colNum,
				palette: pallete
			});
		container.find('.k-selected-color').css({
			'width': '100%'
		});
	};

	KendoGridEditors.stringEditor = function(container, options) {
		$('<input type="text" class="k-input k-textbox" name="name" data-bind="value:' + options.field + '">')
			.appendTo(container);
	};


	KendoGridEditors.numericEditor = function(container, options) {
		$('<input required data-bind="value:' + options.field + '" />')
			.appendTo(container)
			.kendoNumericTextBox({
				format: options.format || "#",
				decimals: options.decimals || 0
			});
	};

	KendoGridEditors.boolEditor = function(container, options) {
		return $(kendo.format('<input type="checkbox" name="{0}"  #={0} ?  "checked" : ""#>', options.field))
			.appendTo(container);
	};

	KendoGridEditors.textAreaEditor = function(container, options) {
		$('<textarea name="' + options.field + '"  data-bind="value:' + options.field + '" style="width: ' + container.width() + 'px;height:' + 2 * container.height() + 'px" />')
			.appendTo(container);
	};



	KendoGridEditors.multiSelectEditor = function(container, options, dataSource, template, placeholder, change) {
		$('<select data-text-field="' + options.text + '" data-value-field="' + options.value + '" data-bind="value:' + options.field + '"/>')
			.appendTo(container)
			.kendoMultiSelect({
				autoBind: false,
				valueTemplate: template || "<span>#= data.text#</span>",
				template: template || "<span>#= data.text#</span>",
				dataSource: dataSource,
				placeholder: placeholder,
				change: change || function() {}
			});
	};

	//templates
	function dropdownImageTemplate (options) {
		var textTemplate = options.text ? kendo.format("#= {0}.{1}#", options.field, options.text) : "";
		options.width = options.width || 16;
		options.height = options.height || 16;
		return  kendo.format("<img src='#= {0}.{2}#' style='vertical-align: middle; width: {3}px; height: {4}px' /> {1}",
			options.field, textTemplate, options.image, options.width, options.height);
	}

	KendoGridEditors.dateTemplate = function(dataItem, options) {
		options.format = options.format || "dd.MM.yyyy";
		var template = kendo.format('#= kendo.toString({0}, "{1}") #', options.field, options.format);
		return kendo.template(template)(dataItem);
	};

	KendoGridEditors.timeTemplate = function(dataItem, options) {
		options.format = options.format || "HH:mm";
		var template = kendo.format('#= kendo.toString({0}, "{1}") #', options.field, options.format);
		return kendo.template(template)(dataItem);
	};

	KendoGridEditors.boolTemplate = function(dataItem, options) {
		var template = kendo.format('<input type="checkbox" name="{0}"  #={0} ?  "checked" : ""# onclick="return false">', options.field);
		return kendo.template(template)(dataItem);
	};

	KendoGridEditors.dropdownTemplate = function(dataItem, options) {
		var template = kendo.format("#= {0}.text#", options.field);
		return kendo.template(template)(dataItem);
	};

	KendoGridEditors.dropdownImageTemplate = function(dataItem, options) {
		return kendo.template(dropdownImageTemplate(options))(dataItem);
	};


	KendoGridEditors.multiSelectTemplate = function(dataItem, options) {
		var template = kendo.format('<div>#= {0}.length > 0 ? _.reduce({0}, function(memo, item){ return memo + (memo ? "," : "") + item.{2}; }, "") : "{1}"#<div>', options.field, options.placeholder, options.text);
		return kendo.template(template)(dataItem);
	};

	KendoGridEditors.colorTemplate = function(dataItem, options) {
		var template = kendo.format("<div style='background-color:#= {0} #; height: 20px;width: 20px;border: 1px solid; float: left'></div><div style='float: right; margin-top: 3px;'>#= {0} #</div>", options.field);
		return kendo.template(template)(dataItem);
	};

	return KendoGridEditors;
}));