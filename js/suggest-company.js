/*!
 * merkSuggestify jQuery Plugin
 * https://github.com/impercz/merk-suggest-company-js
 *
 * Uses Merk API Suggest
 * https://api.merk.cz/docs/#!/suggest
 *
 * Requires typeahead.js
 * https://twitter.github.io/typeahead.js/
 *
 * Copyright Imper CZ s.r.o.
 * Released under the MIT license
 * https://opensource.org/licenses/MIT
 *
 * Date: 2016-06-30
 *
 *
 * Usage:
 *  $('input').merkSuggestify(options);
 *
 * options: @object
 *  {
 *     suggestBy:    @string
 *                   choose one of following: 'name', 'regno', 'email'
 *                   default: 'name'
 *
 *     proxyUrl:     @string - REQUIRED
 *                   URL of server-side script which provides Merk API Suggest results
 *
 *     mapping:      @object - REQUIRED
 *                   {key1: value1, key2: value2, ...}
 *                   where key is an API attribute, value is `name` attribute of target <input>
 *
 *     requestDelay: @integer
 *                   suggestion refresh rate in miliseconds
 *                   default: 300 ms
 *
 *     template:     @function(obj)
 *                   param `obj` contains result object of suggested item
 *                   returns snippet that represents one item in suggest results
 *                   example: function(obj) { return obj.name + ' - ' + obj.regno }
 *                   default template is provided
 *  }
 */

;(function ( $, window, document, undefined ) {
	"use strict";

	var pluginName = "merkSuggestify",

	defaults = {
		suggestBy: 'name', // name | regno | email
		proxyUrl: '',
		mapping: {},
		requestDelay: 300,
		template: undefined
	};

	function Plugin( element, options ) {
		this.element = element;
		this.$element = $(element);
		this.options = $.extend( {}, defaults, options) ;
		this.$form = this.$element.closest('form');

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype = {

		init: function() {
			var _this = this;

			this.$element.typeahead(null, {

				name: 'companies_result',

				display: function(obj){
					if (_this.options.suggestBy === 'email') {
						return obj['emails'][0];
					}

					return obj[_this.options.suggestBy];
				},

				source: new Bloodhound({
					datumTokenizer: Bloodhound.tokenizers.obj.whitespace(_this.options.suggestBy),
					queryTokenizer: Bloodhound.tokenizers.whitespace,
					remote: {
						rateLimitWait: _this.options.requestDelay,
						url: _this.options.proxyUrl,

						prepare: function(query, settings){
							var data = {};
							data[_this.options.suggestBy] = query;
							settings["data"] = data;
							return settings;
						}
					}
				}),

				remote: {
					filter: function(parsedResponse) {
						return parsedResponse.data;
					}
				},

				templates: {
					suggestion: function(obj){
						var ret;
						if (typeof _this.options.template !== 'undefined')
							ret = _this.options.template(obj);
						else
							ret = _this.template(obj);

						return '<div>' + ret + '</div>';
					}
				}
			});

			this.$element.bind('typeahead:open', function(event, object) {
				// console.log('Opened', event, object, this)
			});

			this.$element.bind('typeahead:select', function(event, object) {
				_this.update_fields(object);
			});
		},

		template: function(obj){
			var hasStreet, hasMunicipality, ret;

			ret = '<strong>' + obj.name + "</strong> - " + obj.regno;

			if (obj.hasOwnProperty('address')) {    
				hasStreet = obj.address.hasOwnProperty('street');
				hasMunicipality = obj.address.hasOwnProperty('municipality');

				if (hasStreet || hasMunicipality) {
					ret += '<address>';

					if (hasStreet) {
						ret += obj.address.street;

						if (obj.address.hasOwnProperty('number')) ret += ' ' + obj.address.number;
						if (hasMunicipality) ret += ', ';
					}

					if (hasMunicipality) {
						ret += obj.address.municipality;
					}
					ret += '</address>'
				}
			}

			return ret;
		},

		update_fields: function(object, mapping) {
			var api_field, value;
			if (typeof mapping === 'undefined') mapping = this.options.mapping;

			for (api_field in mapping) {
				if (!mapping.hasOwnProperty(api_field)) continue;

				if (typeof mapping[api_field] === 'object') {
					this.update_fields(object[api_field], mapping[api_field]);
					continue;
				}

				value = object.hasOwnProperty(api_field) ? object[api_field] : '';
				$('[name=' + mapping[api_field] + ']', this.$form).val(value);
			}
		}
	};

	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
					new Plugin( this, options ));
			}
		});
	};

})( jQuery, window, document );
