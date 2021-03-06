/*
 * Backbone UI: Alert
 * Source: https://github.com/backbone-ui/alert
 * Copyright © Makesites.org
 *
 * Initiated by Lyndel Thomas (@ryndel)
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */
(function (lib) {

	//"use strict";

	// Support module loaders
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define('backbone.ui.alert', ['jquery', 'underscore', 'backbone'], lib);
	} else if ( typeof module === "object" && module && typeof module.exports === "object" ){
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = lib;
	} else {
		// Browser globals
		// - getting the available query lib
		var $ = window.jQuery || window.Zepto || window.vQuery;
		lib($, window._, window.Backbone);
	}

}(function ($, _, Backbone) {

	// support for Backbone APP() view if available...
	var APP = APP || window.APP || null;
	var isAPP = ( APP !== null );
	var View = ( isAPP && typeof APP.View !== "undefined" ) ? APP.View : Backbone.View;

	var Alert = View.extend({

		el: function(){ return $('<div class="ui-alert"><span></span></div>'); },

		options: {
			parentEl: "body",
			message: "",
			className: "info",
			position: "top-center",
			fade: 0,
		},

		events: {
			"click": "close",
		},

		initialize: function( options ) {
			var $el = $(this.el);
			// FIX: support option type
			if( options.type ){
				options.className = options.type;
				delete options.type;
			}
			// extend default options
			this.options = _.extend({}, this.options, options);
			//var alertBox = $('<div class="ui-alert top-center error"><span>' + this.options.message + '</span></div>');
			$el.addClass( this.options.className ).addClass( this.options.position );
			$el.find("span").html( this.options.message );
			// check if the element already exists in the DOM (move this to postRender?)
			if( !document.body.contains(this.el) )
				$(this.options.parentEl).append( $el );
			// add fading effect
			if( this.options.fade ){
				setTimeout(function(){
					//$el.fadeOut("fast", function(){ $el.remove(); });
					$el.addClass("fade-out");
					$el.on('webkitTransitionEnd transitionend oTransitionEnd', function(e){ $el.remove(); });
				}, this.options.fade);
			}

		},

		close: function() {
			$(this.el).remove();
		}

	});


	// update Backbone namespace regardless
	Backbone.UI = Backbone.UI ||{};
	Backbone.UI.Alert = Alert;
	// update APP namespace
	if( isAPP ){
		APP.UI = APP.UI || {};
		APP.UI.Alert = Alert;
	}

	// If there is a window object, that at least has a document property
	if( typeof window === "object" && typeof window.document === "object" ){
		window.Backbone = Backbone;
		// update APP namespace
		if( isAPP ){
			window.APP = APP;
		}
	}

	// for module loaders:
	return Alert;

}));
